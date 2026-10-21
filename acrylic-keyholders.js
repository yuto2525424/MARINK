document.addEventListener(
  "DOMContentLoaded",
  () => {

    renderCategories();

    renderKeyholders(
      "ALL"
    );

    setupCartModal();

  }
);



function renderCategories() {

  const container =
    document.getElementById(
      "keyholderCategories"
    );


  if (!container) return;


  const categories = [

    "ALL",

    ...new Set(
      acrylicKeyholdersData.map(
        item =>
          item.category
      )
    )

  ];


  container.innerHTML =
    "";


  categories.forEach(
    (category, index) => {

      const button =
        document.createElement(
          "button"
        );


      button.className =
        "category-button";


      if (index === 0) {

        button.classList.add(
          "active"
        );

      }


      button.textContent =
        category;


      button.addEventListener(
        "click",
        () => {

          document
            .querySelectorAll(
              ".category-button"
            )
            .forEach(item => {

              item.classList.remove(
                "active"
              );

            });


          button.classList.add(
            "active"
          );


          renderKeyholders(
            category
          );

        }
      );


      container.appendChild(
        button
      );

    }
  );

}



function renderKeyholders(
  category
) {

  const grid =
    document.getElementById(
      "keyholderGrid"
    );


  const count =
    document.getElementById(
      "keyholderCount"
    );


  if (!grid) return;


  const items =

    category === "ALL"

      ? acrylicKeyholdersData

      : acrylicKeyholdersData
          .filter(
            item =>
              item.category ===
              category
          );


  grid.innerHTML =
    "";


  if (count) {

    count.textContent =
      `${items.length}種類`;

  }


  items.forEach(item => {

    const card =
      document.createElement(
        "div"
      );


    card.className =
      "product-card shop-product-card";


    /*
      詳細ページへ行く部分
    */

    const detailLink =
      document.createElement(
        "a"
      );


    detailLink.className =
      "product-detail-link";


    detailLink.href =
      `product.html?id=${
        encodeURIComponent(
          item.id
        )
      }`;


    /*
      画像
    */

    const imageBox =
      document.createElement(
        "div"
      );


    imageBox.className =
      "product-image";


    if (item.image) {

      const image =
        document.createElement(
          "img"
        );


      image.src =
        item.image;

      image.alt =
        item.name;

      image.loading =
        "lazy";


      image.addEventListener(
        "error",
        () => {

          image.remove();

          imageBox.innerHTML = `

            <div
              class="product-placeholder"
            >
              MARINK
            </div>

          `;

        }
      );


      imageBox.appendChild(
        image
      );

    }


    /*
      商品情報
    */

    const content =
      document.createElement(
        "div"
      );


    content.className =
      "product-content";


    content.innerHTML = `

      <p
        class="product-category"
      >
        ${escapeHTML(
          item.category
        )}
      </p>

      <h3
        class="product-title"
      >
        ${escapeHTML(
          item.name
        )}
      </h3>

      <p
        class="product-price"
      >
        ${escapeHTML(
          item.priceLabel
        )}
      </p>

      <p
        class="product-status"
      >
        ${escapeHTML(
          item.status
        )}
      </p>

    `;


    detailLink.appendChild(
      imageBox
    );


    detailLink.appendChild(
      content
    );


    /*
      カートボタン
    */

    const cartButton =
      document.createElement(
        "button"
      );


    cartButton.type =
      "button";


    cartButton.className =
      "card-cart-button";


    cartButton.textContent =
      "カートに入れる";


    cartButton.addEventListener(
      "click",
      () => {

        openCartModal(
          item
        );

      }
    );


    card.appendChild(
      detailLink
    );


    card.appendChild(
      cartButton
    );


    grid.appendChild(
      card
    );

  });

}



function setupCartModal() {

  const overlay =
    document.getElementById(
      "cartModalOverlay"
    );


  if (!overlay) return;


  overlay.addEventListener(
    "click",
    closeCartModal
  );

}



function openCartModal(product) {

  const modal =
    document.getElementById(
      "cartModal"
    );


  const overlay =
    document.getElementById(
      "cartModalOverlay"
    );


  const content =
    document.getElementById(
      "cartModalContent"
    );


  if (
    !modal ||
    !overlay ||
    !content
  ) {
    return;
  }


  content.innerHTML = `

    <div
      class="cart-modal-header"
    >

      <div>

        <span
          class="section-label"
        >
          ADD TO CART
        </span>

        <h2>
          ${escapeHTML(
            product.name
          )}
        </h2>

      </div>


      <button
        type="button"
        class="cart-modal-close"
        id="cartModalClose"
      >
        ×
      </button>

    </div>


    <p
      class="modal-base-price"
    >
      ${formatYen(
        product.price
      )}
    </p>


    <div
      class="product-options"
      id="modalOptions"
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
          id="modalQuantityMinus"
        >
          −
        </button>

        <span
          id="modalQuantity"
        >
          1
        </span>

        <button
          type="button"
          id="modalQuantityPlus"
        >
          ＋
        </button>

      </div>

    </div>


    <div
      class="modal-total-row"
    >

      <span>
        合計
      </span>

      <strong
        id="modalTotal"
      >
        ${formatYen(
          product.price
        )}
      </strong>

    </div>


    <button
      type="button"
      class="buy-button"
      id="modalAddCart"
    >
      カートに追加
    </button>


    <a
      href="cart.html"
      class="modal-cart-link"
    >
      カートを見る
    </a>

  `;


 renderKeyholderOptions(
  product,
  document.getElementById("modalOptions")
);


  let quantity = 1;


  const quantityText =
    document.getElementById(
      "modalQuantity"
    );


  const totalText =
    document.getElementById(
      "modalTotal"
    );


  function updateTotal() {

    const optionTotal =
      getSelectedOptionTotal(
        product,
        content
      );


    const unitPrice =
      product.price +
      optionTotal;


    totalText.textContent =
      formatYen(
        unitPrice *
        quantity
      );

  }


  document
    .getElementById(
      "modalQuantityMinus"
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
      "modalQuantityPlus"
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


  content.addEventListener(
    "input",
    updateTotal
  );


  content.addEventListener(
    "change",
    updateTotal
  );


  document
    .getElementById(
      "cartModalClose"
    )
    .addEventListener(
      "click",
      closeCartModal
    );


  document
    .getElementById(
      "modalAddCart"
    )
    .addEventListener(
      "click",
      () => {

   const result =
  buildKeyholderCartItem(
    product,
    quantity,
    content
  );


        if (!result) return;


      addCartItem(
  result
);

updateCartBadge();

closeCartModal();


        alert(
          "カートに追加しました"
        );

      }
    );


  overlay.classList.add(
    "show"
  );


  modal.classList.add(
    "show"
  );


  document.body.style.overflow =
    "hidden";

}



function closeCartModal() {

  const modal =
    document.getElementById(
      "cartModal"
    );


  const overlay =
    document.getElementById(
      "cartModalOverlay"
    );


  if (modal) {

    modal.classList.remove(
      "show"
    );

  }


  if (overlay) {

    overlay.classList.remove(
      "show"
    );

  }


  document.body.style.overflow =
    "";

}



function renderOptions(
  product,
  container
) {

  if (!container) return;


  const options =
    product.options || [];


  if (!options.length) {

    container.innerHTML = "";

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

    if (
      option.type ===
      "text"
    ) {

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
            option.placeholder || ""
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


          if (
            !checkbox.checked
          ) {

            input.value =
              "";

          }


          if (
            checkbox.checked
          ) {

            input.focus();

          }

        }
      );


      container.appendChild(
        box
      );

    }

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


    let value = "";


    if (
      option.type ===
      "text"
    ) {

      const input =
        scope.querySelector(
          `[data-option-value="${option.id}"]`
        );


      value =
        input
          ? input.value.trim()
          : "";


      if (!value) {

        alert(
          "彫刻する名前を入力してください"
        );

        return null;

      }

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