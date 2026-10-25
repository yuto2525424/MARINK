document.addEventListener(
  "DOMContentLoaded",
  () => {

    renderProductDetail();

  }
);



function renderProductDetail() {

  const container =
    document.getElementById(
      "productDetail"
    );


  if (!container) return;


  const params =
    new URLSearchParams(
      window.location.search
    );


  const id =
    params.get("id");


  const product =
    acrylicKeyholdersData
      .find(
        item =>
          item.id === id
      );


  if (!product) {

    container.innerHTML = `

      <div
        class="product-not-found"
      >

        <h1>
          商品が見つかりません
        </h1>

        <a
          href="acrylic-keyholders.html"
          class="shop-back-button"
        >
          ← 商品一覧へ戻る
        </a>

      </div>

    `;

    return;

  }


  container.innerHTML = `

    <a
      href="acrylic-keyholders.html"
      class="detail-back-link"
    >
      ← 一覧へ戻る
    </a>


  
    <div class="detail-image">

      ${
        product.image

          ? `
            <img
              src="${escapeHTML(product.image)}"
              alt="${escapeHTML(product.name)}"
            >
          `

          : `
            <div class="keyholder-image-placeholder">
              画像準備中
            </div>
          `
      }

    </div>



    <div
      class="detail-info"
    >

      <span
        class="section-label"
      >
    ${escapeHTML(
  product.seriesCode || product.category
)}
      </span>


      <h1>
        ${escapeHTML(
          product.name
        )}
      </h1>


      <p
        class="detail-price"
      >
        ${formatYen(
          product.price
        )}
      </p>


      <span
        class="detail-status"
      >
        ${escapeHTML(
          product.status
        )}
      </span>


          <p
        class="detail-description"
      >
        ${escapeHTML(
          product.description
        )}
      </p>



<!-- 商品仕様 -->
<section class="marink-product-spec">

  <div class="marink-spec-heading">
    <span>PRODUCT INFORMATION</span>
    <h2>商品仕様・お届けについて</h2>
  </div>

  <dl class="marink-spec-list">

    <div>
      <dt>サイズ</dt>
      <dd>外寸約40 × 40mm</dd>
    </div>

    <div>
      <dt>印刷仕様</dt>
      <dd>両面カラー印刷</dd>
    </div>

    <div>
      <dt>裏面</dt>
      <dd>白地にMARINKロゴ</dd>
    </div>

    <div>
      <dt>追加オプション</dt>
      <dd>
        学名入れ１個につき＋５０円。名前入れ（12文字以内）1個につき＋100円。      </dd>
    </div>

    <div>
      <dt>セット価格</dt>
      <dd>
        3個999円・5個1,599円。
        種類の組み合わせ自由。
      </dd>
    </div>

    <div>
      <dt>送料</dt>
      <dd>全国一律300円／注文</dd>
    </div>

    <div>
      <dt>発送目安</dt>
      <dd>
        通常、決済確認後3〜5日以内に発送。
        遅延が見込まれる場合はご連絡します。
      </dd>
    </div>

  </dl>

</section>




      <div
        class="product-options"
        id="detailOptions"
      ></div>


      <div
        class="quantity-area"
      >

        <span>
          数量
        </span>


        <div
          class="quantity-control"
        >

          <button
            type="button"
            id="detailQuantityMinus"
          >
            −
          </button>

          <span
            id="detailQuantity"
          >
            1
          </span>

          <button
            type="button"
            id="detailQuantityPlus"
          >
            ＋
          </button>

        </div>

      </div>


      <div
        class="modal-total-row"
      >

       <span>
  商品小計（割引前・送料別）
</span>

        <strong
          id="detailTotal"
        >
          ${formatYen(
            product.price
          )}
        </strong>

      </div>


      <button
        type="button"
        class="buy-button"
        id="detailAddCart"
      >
        カートに入れる
      </button>


      <a
        href="cart.html"
        class="detail-cart-link"
      >
        カートを見る
      </a>

    </div>

  `;


  const optionsContainer =
    document.getElementById(
      "detailOptions"
    );


  renderKeyholderOptions(
  product,
  optionsContainer
);

  let quantity = 1;


  const quantityText =
    document.getElementById(
      "detailQuantity"
    );


  const totalText =
    document.getElementById(
      "detailTotal"
    );


  function updateTotal() {

    const optionTotal =
      getSelectedOptionTotal(
        product,
        container
      );


    totalText.textContent =
      formatYen(
        (
          product.price +
          optionTotal
        ) *
        quantity
      );

  }


  document
    .getElementById(
      "detailQuantityMinus"
    )
    .addEventListener(
      "click",
      () => {

        quantity =
          Math.max(
            1,
            quantity - 1
          );


        quantityText.textContent =
          quantity;


        updateTotal();

      }
    );


  document
    .getElementById(
      "detailQuantityPlus"
    )
    .addEventListener(
      "click",
      () => {

        quantity += 1;


        quantityText.textContent =
          quantity;


        updateTotal();

      }
    );


  container.addEventListener(
    "input",
    updateTotal
  );


  container.addEventListener(
    "change",
    updateTotal
  );


  document
    .getElementById(
      "detailAddCart"
    )
    .addEventListener(
      "click",
      () => {

       const cartItem =
  buildKeyholderCartItem(
    product,
    quantity,
    container
  );


        if (!cartItem) return;


       addCartItem(
  cartItem
);

updateCartBadge();

showMarinkCartToast(
  cartItem.name,
  cartItem.quantity
);

      }
    );

}



function renderOptions(
  product,
  container
) {

  const options =
    product.options || [];


  if (
    !container ||
    !options.length
  ) {
    return;
  }


  container.innerHTML = `

    <p
      class="option-heading"
    >
      オプション
    </p>

  `;


  options.forEach(option => {

    const box =
      document.createElement(
        "div"
      );


    box.className =
      "option-box";


    box.innerHTML = `

      <label
        class="option-check-row"
      >

        <input
          type="checkbox"
          data-option-enable="${escapeHTML(
            option.id
          )}"
        >

        <span>

          ${escapeHTML(
            option.name
          )}

          <strong>
            +${formatYen(
              option.price
            )}
          </strong>

        </span>

      </label>


      <input
        type="text"
        class="option-text-input"
        data-option-value="${escapeHTML(
          option.id
        )}"
        placeholder="${escapeHTML(
          option.placeholder
        )}"
        maxlength="${
          option.maxLength || 30
        }"
        disabled
      >

    `;


    const checkbox =
      box.querySelector(
        "[data-option-enable]"
      );


    const input =
      box.querySelector(
        "[data-option-value]"
      );


    checkbox.addEventListener(
      "change",
      () => {

        input.disabled =
          !checkbox.checked;


        if (!checkbox.checked) {

          input.value = "";

        }


        if (checkbox.checked) {

          input.focus();

        }

      }
    );


    container.appendChild(
      box
    );

  });

}



function getSelectedOptionTotal(
  product,
  scope
) {

  let total = 0;


  (product.options || [])
    .forEach(option => {

      const checkbox =
        scope.querySelector(
          `[data-option-enable="${option.id}"]`
        );


      if (
        checkbox &&
        checkbox.checked
      ) {

        total +=
          option.price;

      }

    });


  return total;

}



function buildCartItem(
  product,
  quantity,
  scope
) {

  const selectedOptions =
    [];


  for (
    const option
    of product.options || []
  ) {

    const checkbox =
      scope.querySelector(
        `[data-option-enable="${option.id}"]`
      );


    if (
      !checkbox ||
      !checkbox.checked
    ) {

      continue;

    }


    const input =
      scope.querySelector(
        `[data-option-value="${option.id}"]`
      );


    const value =
      input
        ? input.value.trim()
        : "";


    if (
      option.type === "text" &&
      !value
    ) {

      alert(
        "彫刻する名前を入力してください"
      );

      return null;

    }


    selectedOptions.push({

      id:
        option.id,

      name:
        option.name,

      price:
        option.price,

      value:
        value

    });

  }


  const optionTotal =
    selectedOptions.reduce(
      (total, option) =>
        total + option.price,
      0
    );


  return {

    productId:
      product.id,

    name:
      product.name,

    image:
      product.image,

    basePrice:
      product.price,

    options:
      selectedOptions,

    unitPrice:
      product.price +
      optionTotal,

    quantity:
      quantity

  };

}



function escapeHTML(value) {

  if (
    value === null ||
    value === undefined
  ) {

    return "";

  }


  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

}