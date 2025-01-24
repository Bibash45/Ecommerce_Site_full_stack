import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";

import axios from "axios";
import { toast } from "react-toastify";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { clearCartItems } from "../../features/cartSlice";
import {
  useGetOrderDetailsQuery,
  useOnCashOrderMutation,
} from "../../features/orderApiSlice";

const OrderDetails = () => {
  const { userInfo } = useSelector((state) => state.auth || {});
  const { token } = userInfo || {};
  const { orderId } = useParams();
  const { data: orderDetails, isLoading: orderDetailsLoading } =
    useGetOrderDetailsQuery({ token, orderId });
  console.log(orderDetails);

  function formatDate(isoDate) {
    const date = new Date(isoDate);

    const options = {
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );

    return formattedDate.replace(/,\s\d{2}:\d{2}:\d{2}.*$/, "");
  }

  const override: CSSProperties = {
    display: "block",
    margin: "10% auto",
    borderColor: "red",
    position: "center",
  };
  if (orderDetailsLoading) {
    return (
      <ClipLoader
        color="gray"
        loading="true"
        cssOverride={override}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );
  }

  return (
    <div className="flex flex-col lg:flex-row w-full mt-10 px-4 lg:px-16">
      {/* Order summary table */}
      <div className="w-full lg:w-2/3 bg-white p-6 shadow-md rounded-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Order Items
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
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Price Details
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr key="" className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-800">ffff</td>
              <td className="px-6 py-4">
                {/* <img
                    src={`http://localhost:5000/${item.product_image[0]}`}
                    alt={item.product_name}
                    className="w-20 h-20 object-cover rounded-md"
                  /> */}
                ll
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">Rs.45656</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Order Information */}
      <div className="w-full lg:w-1/3 mt-6 lg:mt-0 lg:ml-6">
        <div className="bg-gray-50 p-6 shadow-md rounded-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Order Information :
          </h2>
          <div className="space-y-4">
            <div className="flex flex-wrap justify-between">
              <span className="text-gray-600">Order ID: </span>
              <span className="text-gray-800 font-medium">
                {orderDetails?._id}
              </span>
            </div>
            <div className="flex flex-wrap justify-between">
              <span className="text-gray-600">Date:</span>
              <span className="text-gray-800 font-medium">
                {`${formatDate(orderDetails?.createdAt)} `}
              </span>
            </div>
            <div className="flex flex-wrap justify-between">
              <span className="text-gray-600">Paid Status:</span>
              <span className="text-gray-800 font-medium">
                {orderDetails?.status}
              </span>
            </div>
            <div className="flex flex-wrap justify-between">
              <span className="text-gray-600">Delivere Status:</span>
              <span className="text-gray-800 font-medium">
                {orderDetails.delivered ? "Delivered" : "Not Delivered"}
              </span>
            </div>
            <div className="flex flex-wrap justify-between">
              <span className="text-gray-600">Payment Method:</span>
              <span className="text-gray-800 font-medium">
                {orderDetails.method}
              </span>
            </div>

            <hr className="border-gray-200" />
            <div className="flex justify-between text-lg font-semibold">
              <span className="text-gray-700">Total:</span>
              <span className="text-gray-900">{orderDetails?.totalPrice}</span>
            </div>
            {!orderDetails.delivered && (
              <div className="flex gap-8">
                <button
                  className={`w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition`}
                  onClick={() => console.log("d")}
                >
                  Update TO Delivered
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
