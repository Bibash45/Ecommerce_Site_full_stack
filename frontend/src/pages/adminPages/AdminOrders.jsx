import React, { CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { useGetAllOrdersQuery } from "../../features/orderApiSlice";
import { FcPaid } from "react-icons/fc";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { FaEye } from "react-icons/fa";

const AdminOrders = () => {
  const { userInfo } = useSelector((state) => state.auth || {});
  const { token } = userInfo || {};
  const { data: orderlist, isLoading: orderlistLoading } = useGetAllOrdersQuery(
    { token }
  );
  const override: CSSProperties = {
    display: "block",
    margin: "10% auto",
    borderColor: "red",
    position: "center",
  };

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

  if (orderlistLoading) {
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
  console.log(orderlist);

  return (
    <>
      <div>Header</div>
      <div className="relative overflow-x-auto mt-3">
        <table className="table-auto w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700 uppercase bg-purple-300 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                User
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Total
              </th>
              <th scope="col" className="px-6 py-3">
                Method
              </th>
              <th scope="col" className="px-6 py-3">
                Paid
              </th>

              <th scope="col" className="px-6 py-3">
                Delivered
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {orderlist &&
              orderlist.map((order, i) => {
                return (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {order._id}
                    </th>
                    <td className="px-6 py-4">{order?.user?.name}</td>
                    <td className="px-6 py-4">{formatDate(order.createdAt)}</td>
                    <td className="px-6 py-4">{order.totalPrice}</td>
                    <td className="px-6 py-4">{order.method}</td>
                    <td className="px-6 py-4">
                      {order.status === "completed" ? <FcPaid size={25} /> : <RxCross2 size={25} />}
                    </td>
                    <td className="px-6 py-4">
                      {order.delivered ? "Delivered" : "Not Delivered"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-4">
                        <button
                          className="hover:mr-2 transition-all duration-300 ease-in-out bg-yellow-300 px-2 py-[1px] rounded-md"
                          type="button"
                        >
                          <FaEye color="black" size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminOrders;
