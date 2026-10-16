document.addEventListener(
  "DOMContentLoaded",
  () => {

    renderCart();

  }
);



function renderCart() {

  const list =
    document.getElementById(
      "cartList"
    );


  const summary =
    document.getElementById(
      "cartSummary"
    );


  if (
    !list ||
    !summary
  ) {
    return;
  }


  const cart =
    getCart();


  if (!cart.length) {

    list.innerHTML = `

      <div
        class="cart-empty"
      >

        <p>
          カートは空です。
        </p>

        <a
          href="acrylic-keyholders.html"
          class="buy-button"
        >
          商品を見る
        </a>

      </div>

    `;


    summary.innerHTML =
      "";


    return;

  }


  list.innerHTML =
    "";


  cart.forEach(
    (item, index) => {

      const card =
        document.createElement(
          "div"
        );


      card.className =
        "cart-item";


      const optionsHTML =
        (item.options || [])
          .map(option => `

            <p
              class="cart-option"
            >

              ${escapeHTML(
                option.name
              )}

              ${
                option.value
                  ? `：${escapeHTML(
                      option.value
                    )}`
                  : ""
              }

              <span>
                +${formatYen(
                  option.price
                )}
              </span>

            </p>

          `)
          .join("");


      card.innerHTML = `

        <div
          class="cart-item-image"
        >

          <img
            src="${escapeHTML(
              item.image
            )}"
            alt="${escapeHTML(
              item.name
            )}"
          >

        </div>


        <div
          class="cart-item-info"
        >

          <h3>
            ${escapeHTML(
              item.name
            )}
          </h3>


          ${optionsHTML}


          <p
            class="cart-item-price"
          >
            ${formatYen(
              item.unitPrice
            )}
          </p>


          <div
            class="cart-item-actions"
          >

            <div
              class="quantity-control"
            >

              <button
                type="button"
                data-minus="${index}"
              >
                −
              </button>

              <span>
                ${item.quantity}
              </span>

              <button
                type="button"
                data-plus="${index}"
              >
                ＋
              </button>

            </div>


            <button
              type="button"
              class="cart-remove"
              data-remove="${index}"
            >
              削除
            </button>

          </div>

        </div>

      `;


      list.appendChild(
        card
      );

    }
  );


  setupCartButtons();


  summary.innerHTML = `

    <div
      class="cart-summary-row"
    >

      <span>
        商品点数
      </span>

      <strong>
        ${getCartCount()}点
      </strong>

    </div>


    <div
      class="cart-summary-row total"
    >

      <span>
        商品合計
      </span>

      <strong>
        ${formatYen(
          getCartTotal()
        )}
      </strong>

    </div>


    <p
      class="cart-shipping-note"
    >
      送料は購入手続き時に確定します。
    </p>


    <button
      type="button"
      class="buy-button disabled"
      disabled
    >
      購入手続きへ（準備中）
    </button>

  `;

}



function setupCartButtons() {

  document
    .querySelectorAll(
      "[data-minus]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const index =
            Number(
              button.dataset.minus
            );


          const cart =
            getCart();


          if (!cart[index]) return;


          updateCartQuantity(
            index,
            cart[index].quantity - 1
          );


          renderCart();

        }
      );

    });


  document
    .querySelectorAll(
      "[data-plus]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const index =
            Number(
              button.dataset.plus
            );


          const cart =
            getCart();


          if (!cart[index]) return;


          updateCartQuantity(
            index,
            cart[index].quantity + 1
          );


          renderCart();

        }
      );

    });


  document
    .querySelectorAll(
      "[data-remove]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const index =
            Number(
              button.dataset.remove
            );


          removeCartItem(
            index
          );


          renderCart();

        }
      );

    });

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