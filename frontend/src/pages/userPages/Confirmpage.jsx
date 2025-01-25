import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
import { clearCartItems } from "../../features/cartSlice";
import { useOnCashOrderMutation } from "../../features/orderApiSlice";

const Confirmpage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    cartItems = [],
    shippingAddress1 = "",
    shippingAddress2 = "",
    shippingPrice = "",
    city = "",
    zip = "",
    country = "",
    phone = "",
    totalPrice = "",
  } = useSelector((state) => state.cart || {});

  const [loading, setLoading] = useState(false);

  const { token = "", user = {} } = useSelector(
    (state) => state.auth?.userInfo || {}
  );

  const [onCashOrder] = useOnCashOrderMutation();

  // const { userId } = userInfo;

  const subTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.qty * item.product_price,
      0
    );
  };

  const [orderDetails, setOrderDetails] = useState({
    orderItems: cartItems,
    shippingAddress1,
    shippingAddress2,
    city,
    zip,
    country,
    phone,
    user: user._id,
    totalPrice: totalPrice,
  });

  const handlePayment = async () => {
    try {
      const response = await axios.post(
        "/payment/initializeEsewa",
        orderDetails,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);

      const { payment, order } = response.data;
      const { signed_field_names, signature } = payment;
      const order_id = order._id;

      if (response.data.success) {
        // Create a form and set its properties dynamically
        const form = document.createElement("form");
        form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
        form.method = "POST";

        // Create input fields for the form
        const fields = [
          { name: "amount", value: totalPrice },
          { name: "tax_amount", value: "0" },
          { name: "total_amount", value: totalPrice },
          { name: "transaction_uuid", value: order_id },
          {
            name: "product_code",
            value: process.env.REACT_APP_ESEWA_PRODUCT_CODE,
          },
          { name: "product_service_charge", value: "0" },
          { name: "product_delivery_charge", value: "0" },
          {
            name: "success_url",
            value: `${process.env.REACT_APP_BACKEND_URI}/api/payment/completeEsewa`,
          },
          {
            name: "failure_url",
            value: `${process.env.REACT_APP_BACKEND_URI}/api//payment/failedEsewa`,
          },
          { name: "signed_field_names", value: signed_field_names },
          { name: "signature", value: signature },
        ];

        fields.forEach((field) => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = field.name;
          input.value = field.value;
          form.appendChild(input);
        });

        // Append the form to the body
        document.body.appendChild(form);

        // Submit the form
        form.submit();
        dispatch(clearCartItems());
      } else {
        alert("Payment initialization failed");
      }
    } catch (error) {
      console.error("Payment initialization error:", error.message);
    }
  };

  const OnCashPayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!orderDetails || !token) {
        throw new Error("Invalid order details or token");
      }

      // Call the mutation function provided by the hook
      const result = await onCashOrder({ orderDetails, token }).unwrap();

      console.log("Order placed:", result);

      // Clear cart and notify user
      dispatch(clearCartItems());
      toast.success("Order placed successfully");

      navigate("/myorders"); // Redirect to "My Orders" page
    } catch (error) {
      console.error("Order placement failed:", error);
      toast.error(
        error?.data?.message || "Failed to place the order. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (
    !(token && user) &&
    !(shippingAddress1,
    shippingAddress2,
    shippingPrice,
    city,
    zip,
    country,
    phone)
  ) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="">
      <div className="flex flex-col lg:flex-row w-full mt-10 mb-10 px-4 lg:px-16 min-h-[500px] ">
        {/* Order summary table */}
        <div className="w-full lg:w-2/3 bg-white p-6 shadow-md rounded-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            Order Summary
          </h2>
          <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                  Price Details
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {cartItems.map((item, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {item.product_name}
                  </td>
                  <td className="px-6 py-4">
                    <img
                      src={`http://localhost:5000/${item.product_image[0]}`}
                      alt={item.product_name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    Rs.{item.product_price} x {item.qty} = Rs.
                    {(item.qty * item.product_price).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Payment Details */}
        <div className="w-full lg:w-1/3 mt-6 lg:mt-0 lg:ml-6">
          <div className="bg-gray-50 p-6 shadow-md rounded-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Payment Details
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-800 font-medium">
                  Rs.{subTotal().toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Charge</span>
                <span className="text-gray-800 font-medium">Rs.10.00</span>
              </div>

              <hr className="border-gray-200" />
              <div className="flex justify-between text-lg font-semibold">
                <span className="text-gray-700">Total</span>
                <span className="text-gray-900">Rs.{totalPrice}</span>
              </div>
              <div className="flex gap-8">
                <button
                  className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
                  onClick={handlePayment}
                >
                  Proceed to eSewa Payment
                </button>
                <button
                  onClick={OnCashPayment}
                  className="w-full bg-slate-500 text-white py-2 rounded-md hover:bg-slate-600 transition"
                >
                  {loading ? "Placing order...." : "Pay on cash"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmpage;
