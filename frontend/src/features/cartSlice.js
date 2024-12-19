import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";
import { toast } from "react-toastify";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : {
      cartItems: [],
      shippingAddress1: "",
      shippingAddress2: "",
      shippingPrice: "",
      city: "",
      zip: "",
      country: "",
      phone: "",
      totalPrice: "",
    };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existingItem = state.cartItems.find((x) => x._id === item._id);

      if (existingItem) {
        state.cartItems = state.cartItems.map((x) =>
          // x._id === existingItem._id
          //   ? { ...existingItem, qty: existingItem.qty + item.qty }
          //   : x
          x._id === existingItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      return updateCart(state);
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.cartItems = state.cartItems.filter((x) => x._id !== productId);

      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      const item = action.payload;
      state.shippingAddress1 = item.shippingAddress1;
      state.shippingAddress2 = item.shippingAddress2;
      state.city = item.city;
      state.zip = item.zip;
      state.country = item.country;
      state.phone = item.phone;
      return updateCart(state);
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      return updateCart(state);
    },
    clearCartItems: (state, action) => {
      state.cartItems = [];
      return updateCart(state);
    },
    resetCart: (state) => (state = initialState),
  },
});

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
  resetCart,
} = cartSlice.actions;
export default cartSlice.reducer;
