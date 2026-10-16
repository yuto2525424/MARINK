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

