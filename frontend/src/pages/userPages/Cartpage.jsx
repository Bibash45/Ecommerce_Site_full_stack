import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../features/cartSlice";
import { Product } from "../../components/userComponents/index";
import { Link } from "react-router-dom";

const Cartpage = () => {
  const dispatch = useDispatch();
  const { cartItems, totalPrice } = useSelector((state) => state.cart);

  const handleQuantityChange = (item, change) => {
    const updatedQuantity = item.qty + change; // Calculate new quantity

    // Ensure that the quantity does not exceed the countInStock and is not below 1
    if (updatedQuantity > 0 && updatedQuantity <= item.countInStock) {
      dispatch(
        addToCart({
          ...item,
          qty: updatedQuantity,
        })
      );
    } else if (updatedQuantity > item.countInStock) {
      alert("Sorry, not enough stock available!"); // Optionally alert the user
    }
  };

  const subTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + item.qty * item.product_price;
    }, 0);
  };

  if (cartItems.length === 0) {
    return (
      <div className="h-[70vh] ">
        <div className="text-center text-3xl py-16 text-gray-500 font-semibold bg-[#D3C5E5]">
          Please add product to the cart !!!
        </div>
        <Product />
      </div>
    );
  }

  return (
    <section className="py-15 relative">
      <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
        <h2 className="title font-manrope font-bold text-4xl leading-10 mb-8 text-center text-black">
          Shopping Cart
        </h2>
        <div className="hidden lg:grid grid-cols-2 py-6">
          <div className="font-normal text-xl leading-8 text-gray-500">
            Product
          </div>
          <p className="font-normal text-xl leading-8 text-gray-500 flex items-center justify-between">
            <span className=" w-full max-w-[260px] text-center">Quantity</span>
            <span className="w-full max-w-[200px] text-center">Total</span>
          </p>
        </div>

        {cartItems.map((item) => {
          const {
            product_name,
            product_price,
            product_image,
            qty,
            countInStock,
          } = item;

          return (
            <div
              key={item._id}
              className="grid grid-cols-1 lg:grid-cols-2 min-[550px]:gap-6 border-t border-gray-200 py-6"
            >
              <div className="flex items-center flex-col min-[550px]:flex-row gap-3 min-[550px]:gap-6 w-full max-xl:justify-center max-xl:max-w-xl max-xl:mx-auto">
                <div className="img-box">
                  <img
                    src={`http://localhost:5000/${product_image[0]}`}
                    alt="product image"
                    className="xl:w-[140px] rounded-xl object-cover"
                  />
                </div>
                <div className="pro-data w-full max-w-sm flex flex-col gap-4">
                  <div>
                    <h5 className="font-semibold text-xl leading-8 text-black max-[550px]:text-center">
                      {product_name}
                    </h5>
                    <h6 className="font-medium text-lg leading-8 text-indigo-600  max-[550px]:text-center">
                      ${product_price}
                    </h6>
                  </div>
                  <h3>
                    <button
                      onClick={() => dispatch(removeFromCart(item._id))}
                      className="group btn-sm rounded-full mt-4 px-4 py-1 border border-red-500 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-red-200 hover:border-red-300 hover:bg-red-50"
                    >
                      <svg
                        className="stroke-red-500 transition-all duration-500 group-hover:stroke-red-600"
                        xmlns="http://www.w3.org/2000/svg"
                        width={22}
                        height={22}
                        viewBox="0 0 22 22"
                        fill="none"
                      >
                        <path
                          d="M5 11H17"
                          stroke=""
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="ml-2 text-red-500">Remove</span>
                    </button>
                  </h3>
                </div>
              </div>

              <div className="flex items-center flex-col min-[550px]:flex-row w-full max-xl:max-w-xl max-xl:mx-auto gap-28">
                <div className="flex items-center w-full mx-auto justify-center">
                  <button
                    onClick={() => handleQuantityChange(item, 1)}
                    className="group rounded-l-full px-6 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  >
                    <svg
                      className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                      xmlns="http://www.w3.org/2000/svg"
                      width={22}
                      height={22}
                      viewBox="0 0 22 22"
                      fill="none"
                    >
                      <path
                        d="M11 5.5V16.5M16.5 11H5.5"
                        stroke=""
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                  <p className="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[118px] min-w-[80px] placeholder:text-gray-900 py-[15px] text-center bg-transparent">
                    {qty}
                  </p>
                  <button
                    onClick={() => handleQuantityChange(item, -1)}
                    className="group rounded-r-full px-6 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  >
                    <svg
                      className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                      xmlns="http://www.w3.org/2000/svg"
                      width={22}
                      height={22}
                      viewBox="0 0 22 22"
                      fill="none"
                    >
                      <path
                        d="M16.5 11H5.5"
                        stroke=""
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
                <h6 className="text-indigo-600 font-manrope font-bold text-2xl leading-9 w-full max-w-[176px] text-center">
                  ${qty * product_price}
                </h6>
              </div>
            </div>
          );
        })}

        <div className="bg-gray-50 rounded-xl p-6 w-full mb-8 max-lg:max-w-xl max-lg:mx-auto">
          <div className="flex items-center justify-between w-full mb-6">
            <p className="font-normal text-xl leading-8 text-gray-400">
              Sub Total
            </p>
            <h6 className="font-semibold text-xl leading-8 text-gray-900">
              ${subTotal()}
            </h6>
          </div>
          <div className="flex items-center justify-between w-full mb-6">
            <p className="font-normal text-xl leading-8 text-gray-400">
              Delivery Charge
            </p>
            <h6 className="font-semibold text-xl leading-8 text-gray-900">
              $10
            </h6>
          </div>
          <hr />
          <div className="flex items-center justify-between w-full py-6">
            <p className="font-manrope font-medium text-2xl leading-9 text-gray-900">
              <span className="text-gray-400">(tax added) </span>Total Amount
            </p>
            <h6 className="font-manrope font-medium text-2xl leading-9 text-indigo-500">
              ${totalPrice}
            </h6>
          </div>
        </div>

        <div className="flex items-center flex-col sm:flex-row justify-center gap-3 mt-8">
          <button className="rounded-full py-4 w-full max-w-[280px]  flex items-center bg-indigo-50 justify-center transition-all duration-500 hover:bg-indigo-100">
            <span className="px-2 font-semibold text-lg leading-8 text-[#735DA5]">
              Add Coupon Code
            </span>
          </button>
          <Link
            to="/shipping"
            className="rounded-full w-full max-w-[280px] py-4 text-center justify-center items-center bg-[#7f6ab0] font-semibold text-lg text-white flex transition-all duration-500 hover:bg-[#4c3d70]"
          >
            Proceed To Checkout
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Cartpage;
