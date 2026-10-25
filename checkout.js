
/* =========================================
   MARINK 注文確認ページ
========================================= */

document.addEventListener(
  "DOMContentLoaded",
  renderCheckout
);


// 金額表示用の行
function checkoutPriceRow(label, amount) {

  return `
    <div class="cart-summary-row">
      <span>${escapeKeyholderHTML(label)}</span>
      <strong>${formatYen(amount)}</strong>
    </div>
  `;

}


// 注文内容を表示
function renderCheckout() {

  const itemsBox =
    document.getElementById("checkoutItems");

  const summaryBox =
    document.getElementById("checkoutSummary");

  if (!itemsBox || !summaryBox) return;

  const cart = getCart();


  // カートが空の場合
  if (cart.length === 0) {

    itemsBox.innerHTML = `
      <p class="cart-shipping-note">
        カートに商品がありません。
      </p>

      <a
        href="acrylic-keyholders.html"
        class="shop-back-button"
        style="margin-top:15px;"
      >
        商品を見る
      </a>
    `;

    summaryBox.style.display = "none";

    return;
  }


  // 商品を一覧表示
  itemsBox.innerHTML = cart.map(item => {

    const quantity = Math.max(
      1,
      Math.trunc(Number(item.quantity) || 1)
    );

    const options = Array.isArray(item.options)
      ? item.options
      : [];

    const optionsHTML = options.map(option => {

      return `
        <p class="cart-option">

          ${escapeKeyholderHTML(option.name)}

          ：${escapeKeyholderHTML(option.value || "")}

          （+${formatYen(option.price)}／個）

        </p>
      `;

    }).join("");


   
const imageHTML = item.image
  ? `
    <img
      src="${escapeKeyholderHTML(item.image)}"
      alt="${escapeKeyholderHTML(item.name)}"
    >
  `
  : `
    <div class="keyholder-image-placeholder">
      画像準備中
    </div>
  `;



    return `

      <div class="cart-item">

        <div class="cart-item-image">
          ${imageHTML}
        </div>

        <div class="cart-item-info">

          <h3>
            ${escapeKeyholderHTML(item.name)}
          </h3>

          <p class="cart-option">
            数量：${quantity}個
          </p>

          ${optionsHTML}

        </div>

      </div>

    `;

  
  }).join("");

  // 画像が存在しない場合は「画像準備中」と表示
  itemsBox.querySelectorAll(".cart-item-image img")
    .forEach(img => {

      img.addEventListener("error", () => {

        const placeholder = document.createElement("div");

        placeholder.className =
          "keyholder-image-placeholder";

        placeholder.textContent = "画像準備中";

        img.replaceWith(placeholder);
      });
    });

  // セット割引と送料を計算
  const price = getMarinkCartPricing();


  const setRows = [];


  // 5個セット
  if (price.set5 > 0) {

    setRows.push(
      checkoutPriceRow(
        `5個セット割引（¥1,599 × ${price.set5}）`,
        1599 * price.set5
      )
    );

  }


  // 3個セット
  if (price.set3 > 0) {

    setRows.push(
      checkoutPriceRow(
        `3個セット割引（¥999 × ${price.set3}）`,
        999 * price.set3
      )
    );

  }


  // 単品
  if (price.single > 0) {

    setRows.push(
      checkoutPriceRow(
        `単品（¥349 × ${price.single}）`,
        349 * price.single
      )
    );

  }


  // 注文金額を表示
  summaryBox.innerHTML = `

    <div class="cart-summary-row">
      <span>商品点数</span>
      <strong>${price.count}点</strong>
    </div>

    ${setRows.join("")}

    ${checkoutPriceRow(
      "裏面オプション",
      price.optionTotal
    )}

    ${checkoutPriceRow(
      "送料（全国一律）",
      price.shipping
    )}

    <div class="cart-summary-row total">

      <span>
        お支払い合計（税込）
      </span>

      <strong>
        ${formatYen(price.total)}
      </strong>

    </div>

    <p class="cart-shipping-note">
      ご注文内容に間違いがないかご確認ください。
      変更する場合はカートへお戻りください。
    </p>

    <button
      type="button"
      class="buy-button disabled"
      disabled
    >
      クレジットカード・PayPay決済（準備中）
    </button>

    <p class="cart-shipping-note">
      ※現在は確認用の画面です。
      注文の確定や決済は行われません。
    </p>

  `;

}
