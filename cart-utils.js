const CART_STORAGE_KEY =
  "marinkCart";


function getCart() {

  try {

    const data =
      localStorage.getItem(
        CART_STORAGE_KEY
      );

    return data
      ? JSON.parse(data)
      : [];

  }

  catch (error) {

    return [];

  }

}



function saveCart(cart) {

  localStorage.setItem(
    CART_STORAGE_KEY,
    JSON.stringify(cart)
  );

}



function addCartItem(item) {

  const cart =
    getCart();


  const optionSignature =
    JSON.stringify(
      item.options || []
    );


  const existing =
    cart.find(cartItem =>

      cartItem.productId ===
        item.productId &&

      JSON.stringify(
        cartItem.options || []
      ) === optionSignature

    );


  if (existing) {

    existing.quantity +=
      item.quantity;

  }

  else {

    cart.push(item);

  }


  saveCart(cart);

  return cart;

}



function removeCartItem(index) {

  const cart =
    getCart();

  cart.splice(index, 1);

  saveCart(cart);

}



function updateCartQuantity(
  index,
  quantity
) {

  const cart =
    getCart();


  if (!cart[index]) return;


  cart[index].quantity =
    Math.max(
      1,
      quantity
    );


  saveCart(cart);

}



function getCartCount() {

  return getCart().reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

}



function getCartTotal() {

  return getCart().reduce(
    (total, item) =>

      total +
      (
        item.unitPrice *
        item.quantity
      ),

    0
  );

}



function formatYen(value) {

  return `¥${Number(value)
    .toLocaleString()}`;

}


function updateCartBadge() {

  const badges =
    document.querySelectorAll(
      ".cart-count-badge"
    );


  const count =
    getCartCount();


  badges.forEach(badge => {

    if (count > 0) {

      badge.textContent =
        count > 99
          ? "99+"
          : String(count);


      badge.classList.add(
        "show"
      );

    }

    else {

      badge.textContent =
        "";


      badge.classList.remove(
        "show"
      );

    }

  });

}



document.addEventListener(
  "DOMContentLoaded",
  () => {

    updateCartBadge();

  }
);
/* =========================================
   MARINK BACK OPTIONS
========================================= */

// 文字を安全に表示する
function escapeKeyholderHTML(value) {

  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

}


// 裏面オプションを表示
function renderKeyholderOptions(product, container) {

  if (!container) return;

  const options = product.options || [];

  container.innerHTML = `
    <p class="option-heading">
      裏面オプション（いずれか1つ）
    </p>
  `;

  options.forEach(option => {

    const box = document.createElement("div");

    box.className = "option-box";
    box.style.marginBottom = "8px";

    const isText = option.type === "text";

    box.innerHTML = `

      <label class="option-check-row">

        <input
          type="checkbox"
          data-option-enable="${escapeKeyholderHTML(option.id)}"
        >

        <span>
          ${escapeKeyholderHTML(option.name)}

          <strong>
            +${formatYen(option.price)}
          </strong>
        </span>

      </label>

      ${
        isText

          ? `
            <input
              type="text"
              class="option-text-input"
              data-option-value="${escapeKeyholderHTML(option.id)}"
              placeholder="${escapeKeyholderHTML(option.placeholder)}"
              maxlength="${Number(option.maxLength || 12)}"
              disabled
            >
          `

          : `
            <p style="
              margin-top:8px;
              font-size:11px;
              color:#718391;
              overflow-wrap:anywhere;
            ">
              印刷する学名：
              <i>${escapeKeyholderHTML(option.value)}</i>
            </p>
          `
      }

    `;

    const checkbox =
      box.querySelector("[data-option-enable]");

    const input =
      box.querySelector(".option-text-input");

    checkbox.addEventListener("change", () => {

      // 片方を選んだらもう片方を解除
      if (checkbox.checked) {

        container
          .querySelectorAll("[data-option-enable]")
          .forEach(other => {

            if (other === checkbox) return;

            other.checked = false;

            const otherInput = other
              .closest(".option-box")
              .querySelector(".option-text-input");

            if (otherInput) {
              otherInput.value = "";
              otherInput.disabled = true;
            }

          });

      }

      // 名前入力欄を有効・無効にする
      if (input) {

        input.disabled = !checkbox.checked;

        if (checkbox.checked) {
          input.focus();
        } else {
          input.value = "";
        }

      }

    });

    container.appendChild(box);

  });

}


// 選択したオプションをカートに保存
function buildKeyholderCartItem(product, quantity, scope) {

  const selected = (product.options || [])
    .filter(option => {

      const checkbox = scope.querySelector(
        `[data-option-enable="${option.id}"]`
      );

      return checkbox && checkbox.checked;

    });

  if (selected.length > 1) {

    alert("裏面オプションは1つだけ選択してください");
    return null;

  }

  const selectedOptions = [];

  for (const option of selected) {

    let value = "";

    if (option.type === "fixed") {

      value = String(option.value || "");

    } else {

      const input = scope.querySelector(
        `[data-option-value="${option.id}"]`
      );

      value = input ? input.value.trim() : "";

    }

    if (!value) {

      alert("裏面に入れる内容を確認してください");
      return null;

    }

    if (
      option.type === "text" &&
      value.length > (option.maxLength || 12)
    ) {

      alert("文字数が上限を超えています");
      return null;

    }

    selectedOptions.push({
      id: option.id,
      name: option.name,
      price: option.price,
      value: value
    });

  }

  const optionTotal = selectedOptions.reduce(
    (total, option) => total + option.price,
    0
  );

  return {
    productId: product.id,
    name: product.name,
    image: product.image,
    basePrice: product.price,
    options: selectedOptions,
    unitPrice: product.price + optionTotal,
    quantity: quantity
  };

}


/* =========================================
   MARINK セット割引・送料計算
========================================= */

function getMarinkCartPricing() {

  const cart = getCart();

  // カート内の合計個数
  const count = cart.reduce((total, item) => {
    return total + Math.max(
      0,
      Math.trunc(Number(item.quantity) || 0)
    );
  }, 0);

  // 裏面オプションの合計
  const optionTotal = cart.reduce((total, item) => {

    const quantity = Math.max(
      0,
      Math.trunc(Number(item.quantity) || 0)
    );

    const options = Array.isArray(item.options)
      ? item.options
      : [];

    const optionPrice = options.reduce(
      (sum, option) => sum + Number(option.price || 0),
      0
    );

    return total + optionPrice * quantity;

  }, 0);

  // 販売価格
  const sets = [
    { count: 1, price: 349, key: "single" },
    { count: 3, price: 999, key: "set3" },
    { count: 5, price: 1599, key: "set5" }
  ];

  // 最も安い組み合わせを計算
  const dp = Array(count + 1).fill(null);

  dp[0] = {
    subtotal: 0,
    single: 0,
    set3: 0,
    set5: 0
  };

  for (let n = 1; n <= count; n++) {

    for (const set of sets) {

      if (n < set.count) continue;

      const previous = dp[n - set.count];

      if (!previous) continue;

      const candidate = previous.subtotal + set.price;

      if (!dp[n] || candidate < dp[n].subtotal) {

        dp[n] = {
          ...previous,
          subtotal: candidate,
          [set.key]: previous[set.key] + 1
        };

      }

    }

  }

  const best = dp[count];

  const regularSubtotal = count * 349;
  const bundleSubtotal = best.subtotal;

  const discount = regularSubtotal - bundleSubtotal;

  const shipping = count > 0 ? 300 : 0;

  return {
    count: count,
    regularSubtotal: regularSubtotal,
    bundleSubtotal: bundleSubtotal,
    discount: discount,
    optionTotal: optionTotal,
    shipping: shipping,
    total: bundleSubtotal + optionTotal + shipping,
    single: best.single,
    set3: best.set3,
    set5: best.set5
  };

}




