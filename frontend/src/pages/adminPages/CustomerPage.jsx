import React, { CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { useGetAllusersQuery } from "../../features/userApiSlice";
import { FcPaid } from "react-icons/fc";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGetUsersQuery } from "../../features/userApiSlice";

const CustomerPage = () => {
  const { userInfo } = useSelector((state) => state.auth || {});
  const { token } = userInfo || {};
  const {
    data: userlist,
    isLoading: userlistLoading,
    error,
  } = useGetUsersQuery({ token });
  console.log(userlist);

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

  if (userlistLoading) {
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
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                User
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
            </tr>
          </thead>
          <tbody>
            {userlist &&
              userlist.map((user, i) => {
                return (
                  <tr className="bg-white buser-b dark:bg-gray-800 dark:buser-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {user._id}
                    </th>
                    <td className="px-6 py-4">
                      <img
                        className="h-[38px] w-[38px] rounded-full object-contain object-center"
                        src={`http://localhost:5000/${user.image}`}
                        alt=""
                      />
                    </td>
                    <td className="px-6 py-4">{user?.name}</td>
                    <td className="px-6 py-4">{user?.email}</td>
                    <td className="px-6 py-4">{formatDate(user.createdAt)}</td>
                    <td className="px-6 py-4">
                      {user?.role === 1 ? (
                        <span className="font-bold text-red-800">Admin</span>
                      ) : (
                        "Customer"
                      )}
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

export default CustomerPage;
