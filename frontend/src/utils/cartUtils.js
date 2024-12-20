export const addDemicals = (num) => {
  return Math.round((num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  // calculate shipping price (If order is over $100 then free, else $10 shipping)
  state.shippingPrice = addDemicals(state.totalPrice > 200 ? 0 : 1);

  // calculate items price
  state.totalPrice =
    addDemicals(
      state.cartItems.reduce((acc, item) => acc + item.product_price * item.qty, 0)
    ) + Number(state.shippingPrice);

  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
