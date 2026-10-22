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

updateCartBadge();

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

        
        <div class="cart-item-image">

          ${
            item.image

              ? `
                <img
                  src="${escapeHTML(item.image)}"
                  alt="${escapeHTML(item.name)}"
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



const price = getMarinkCartPricing();



summary.innerHTML = `

  <div class="cart-summary-row">
    <span>商品点数</span>
    <strong>${price.count}点</strong>
  </div>

 
  ${price.set5 > 0 ? `
    <div class="cart-summary-row">
      <span>
        5個セット割引（¥1,599 × ${price.set5}）
      </span>
      <strong>
        ${formatYen(1599 * price.set5)}
      </strong>
    </div>
  ` : ""}

  ${price.set3 > 0 ? `
    <div class="cart-summary-row">
      <span>
        3個セット割引（¥999 × ${price.set3}）
      </span>
      <strong>
        ${formatYen(999 * price.set3)}
      </strong>
    </div>
  ` : ""}

  ${price.single > 0 ? `
    <div class="cart-summary-row">
      <span>
        単品（¥349 × ${price.single}）
      </span>
      <strong>
        ${formatYen(349 * price.single)}
      </strong>
    </div>
  ` : ""}


  <div class="cart-summary-row">
    <span>裏面オプション</span>
    <strong>${formatYen(price.optionTotal)}</strong>
  </div>

  <div class="cart-summary-row">
    <span>送料（全国一律）</span>
    <strong>${formatYen(price.shipping)}</strong>
  </div>

  <div class="cart-summary-row total">
    <span>お支払い合計（税込）</span>
    <strong>${formatYen(price.total)}</strong>
  </div>

  <p class="cart-shipping-note">
    複数購入の場合は、最もお得なセット価格を自動適用しています。
  </p>

 <a
  href="checkout.html"
  class="buy-button"
>
  ご注文内容を確認する
</a>

`;

updateCartBadge();


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