export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  // Calculate items price
  const itemsPrice = state.cartItems.reduce(
    (acc, item) => acc + item.product_price * item.qty,
    0
  );

  // Calculate shipping price
  state.shippingPrice = addDecimals(itemsPrice > 200 ? 0 : 10);

  // Calculate tax (e.g., 13%)
  const taxPrice = addDecimals(itemsPrice) * 0.13;
  console.log(taxPrice);

  // Calculate total price
  state.totalPrice = addDecimals(
    Number(itemsPrice) + Number(state.shippingPrice) + Number(taxPrice)
  );
  console.log(state.totalPrice);
  

  // Save updated cart state to localStorage
  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
