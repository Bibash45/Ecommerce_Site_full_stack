import React from "react";
import { useGetMyOrdersQuery } from "../../features/orderApiSlice";
import { useSelector } from "react-redux";
import { FcPaid } from "react-icons/fc";
import { RxCross1 } from "react-icons/rx";
import { format } from "date-fns";
import { Product } from "../../components/userComponents";
import { Navigate } from "react-router-dom";

const MyOrders = () => {
  const { token = "", user = {} } = useSelector(
    (state) => state.auth.userInfo || {}
  );
  const { _id: userId } = user;
  console.log(token);

  const {
    data: myOrders,
    isLoading: myOrdersLoading,
    error: myOrdersError,
  } = useGetMyOrdersQuery({ userId, token });
  console.log(myOrders);


  if (
    !(token && user) 
  ) {
    return <Navigate to="/login" />;
  }

  if (myOrdersLoading) {
    return <div>Loading...</div>;
  }

  if (myOrdersError) {
    return (
      <div className="containerBox ">
        <div className="text-center text-3xl py-10 text-gray-700 font-semibold bg-[#D3C5E5] rounded-lg shadow-lg p-8 max-w-2xl mx-auto mt-8">
          Please make some orders !!!
        </div>

        <Product />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-87.98px)]  py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-400">
        My Orders
      </h1>
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          {/* Responsive table wrapper */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-gray-600 border-b text-center">
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">
                    Total <span className="text-xs ">(Rs.)</span>
                  </th>
                  <th className="py-3 px-4">Paid Status</th>
                  <th className="py-3 px-4">Delivered</th>
                  <th className="py-3 px-4">Payment Method</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {myOrders.map((order) => {
                  const { createdAt } = order;
                  const formattedDate = format(new Date(createdAt), "PPpp");
                  return (
                    <tr
                      key={order._id}
                      className="hover:bg-gray-100 transition duration-200 text-center"
                    >
                      <td className="py-3 px-4">{order._id}</td>
                      <td className="py-3 px-4">{formattedDate}</td>
                      <td className="py-3 px-4">{order.totalPrice}</td>
                      <td
                        className={`py-3 px-4 ${
                          order.status === "completed"
                            ? "text-green-500"
                            : "text-yellow-500"
                        }`}
                      >
                        {order.status}
                      </td>
                      <td
                        className={`mt-12 px-4 text-center flex justify-center items-center`}
                      >
                        {order.delivered ? (
                          <FcPaid color="green" size={30} />
                        ) : (
                          <RxCross1 color="red" size={20} />
                        )}
                      </td>
                      <td className="py-3 px-4">
                        {order.method.toUpperCase()}
                      </td>
                      <td className="py-3 px-4">
                        <button className="bg-gradient-to-r from-purple-400 to-purple-600 py-2 px-4 rounded-lg hover:from-purple-500 hover:to-purple-700 text-white shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300">
                          View Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
