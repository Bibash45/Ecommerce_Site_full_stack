import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { TbCategoryFilled } from "react-icons/tb";
import { FaUsers } from "react-icons/fa";
import { RiLogoutBoxFill } from "react-icons/ri";
import { HiMiniInboxArrowDown } from "react-icons/hi2";
import { logoutf } from "../../features/authSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const Header = ({ isSidebarOpen, setIsSidebarOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const handleLogOut = async (e) => {
    e.preventDefault();
    try {
      const res = await logoutf();
      dispatch(logoutf());
      navigate("/login");
    } catch (error) {
      toast.error("logout failed");
      console.log("Error logging out:");
    }
  };

  return (
    <>
      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform bg-[#E6E6FA] dark:bg-gray-800 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 z-50`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li>
              <a
                href="/admin"
                className={`flex items-center py-4 px-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group   ${
                  pathname === "/admin" ? "bg-gray-100" : " "
                }`}
              >
                <FaHome className="h-5 w-5" />
                <span className="ms-3 font-semibold text-2xl">Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href="/admin/product"
                className={` flex items-center px-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group  ${
                  pathname === "/admin/product" ? "bg-gray-100" : " "
                } py-4 `}
              >
                <MdOutlineProductionQuantityLimits className="h-5 w-5" />
                <span className="flex-1 ms-3 whitespace-nowrap font-semibold text-2xl ">
                  Product
                </span>
              </a>
            </li>
            <li>
              <a
                href="/admin/product"
                className={` flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group  ${
                  pathname === "/admin/category" ? "bg-gray-100" : " "
                } py-4 `}
              >
                <TbCategoryFilled className="h-5 w-5" />
                <span className="flex-1 ms-3 whitespace-nowrap font-semibold text-2xl ">
                  Category
                </span>
              </a>
            </li>
            <li>
              <a
                href="/admin/product"
                className={`  flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group  ${
                  pathname === "/admin/orders" ? "bg-gray-100" : " "
                } py-4 `}
              >
                <HiMiniInboxArrowDown className=" h-5 w-5" />
                <span className="flex-1 ms-3 whitespace-nowrap font-semibold text-2xl ">
                  Orders
                </span>
              </a>
            </li>

            <li>
              <a
                href="/admin/product"
                className={` flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group  ${
                  pathname === "/admin/customers" ? "bg-gray-100" : " "
                } py-4 `}
              >
                <FaUsers className="h-5 w-5" />
                <span className="flex-1 ms-3 whitespace-nowrap font-semibold text-2xl ">
                  Customer
                </span>
              </a>
            </li>
            <li onClick={handleLogOut}>
              <a
                href="/login"
                className={` flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group  ${
                  pathname === "/admin/login" ? "bg-gray-100" : " "
                } py-4 `}
              >
                <RiLogoutBoxFill className="h-5 w-5" />
                <span className="flex-1 ms-3 whitespace-nowrap font-semibold text-2xl ">
                  Logout
                </span>
              </a>
            </li>
          </ul>
        </div>
      </aside>

      {/* Content Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
        ></div>
      )}
    </>
  );
};

export default Header;
