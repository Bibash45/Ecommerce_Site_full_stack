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
import { TiPlus } from "react-icons/ti";
import { RiFileListLine } from "react-icons/ri";

const Header = ({ isSidebarOpen, setIsSidebarOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const [isProductSubmenuOpen, setIsProductSubmenuOpen] = useState(false);
  const [isCategorySubmenuOpen, setIsCategorySubmenuOpen] = useState(false);

  const toggleProductSubmenu = () => {
    setIsProductSubmenuOpen(!isProductSubmenuOpen);
  };
  const toggleCategorySubmenu = () => {
    setIsCategorySubmenuOpen(!isCategorySubmenuOpen);
  };

  const handleLogOut = async (e) => {
    e.preventDefault();
    try {
      const res = await logoutf();
      dispatch(logoutf());
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
      console.log("Error logging out:", error);
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
                className={`flex items-center py-4 px-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                  pathname === "/admin" ? "bg-gray-100" : ""
                }`}
              >
                <FaHome className="h-5 w-5" />
                <span className="ms-3 font-semibold text-2xl">Dashboard</span>
              </a>
            </li>
            <li>
              <div
                onClick={toggleProductSubmenu}
                className={`flex items-center px-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group cursor-pointer ${
                  pathname.startsWith("/admin/product") ? "bg-gray-100" : ""
                } py-4`}
              >
                <MdOutlineProductionQuantityLimits className="h-5 w-5" />
                <span className="flex-1 ms-3 whitespace-nowrap font-semibold text-2xl">
                  
                  Product
                </span>
                <span className="ms-auto">{isProductSubmenuOpen ? "-" : "+"}</span>
               
              </div>
              {isProductSubmenuOpen && (
                <ul className="ml-6 mt-2 space-y-2">
                  <li>
                    <a
                      href="/admin/product/list"
                      className={`flex items-center px-2 py-2 text-gray-900 rounded-lg font-semibold dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${
                        pathname === "/admin/product/list" ? "bg-gray-100" : ""
                      }`}
                    >
                    <span className="pr-3 "><RiFileListLine color="gray" size={25} /></span>
                      Product List
                    </a>
                  </li>
                  <li>
                    <a
                      href="/admin/product/add"
                      className={`flex items-center px-2 py-2 text-gray-900 rounded-lg font-semibold dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${
                        pathname === "/admin/product/add" ? "bg-gray-100" : ""
                      }`}
                    >
                      <span className="pr-3 "><TiPlus color="gray" size={25}/></span>
                      Add Product
                    </a>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <div
                onClick={toggleCategorySubmenu}
                className={`flex items-center px-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group cursor-pointer ${
                  pathname.startsWith("/admin/product") ? "bg-gray-100" : ""
                } py-4`}
              >
                <TbCategoryFilled className="h-5 w-5" />
                <span className="flex-1 ms-3 whitespace-nowrap font-semibold text-2xl">
                  
                  Category
                </span>
                <span className="ms-auto">{isCategorySubmenuOpen ? "-" : "+"}</span>
               
              </div>
              {isCategorySubmenuOpen && (
                <ul className="ml-6 mt-2 space-y-2">
                  <li>
                    <a
                      href="/admin/category/list"
                      className={`flex items-center px-2 py-2 text-gray-900 rounded-lg font-semibold dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${
                        pathname === "/admin/category/list" ? "bg-gray-100" : ""
                      }`}
                    >
                    <span className="pr-3 "><RiFileListLine color="gray" size={25} /></span>
                      Category List
                    </a>
                  </li>
                  <li>
                    <a
                      href="/admin/category/add"
                      className={`flex items-center px-2 py-2 text-gray-900 rounded-lg font-semibold dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${
                        pathname === "/admin/category/add" ? "bg-gray-100" : ""
                      }`}
                    >
                      <span className="pr-3 "><TiPlus color="gray" size={25}/></span>
                      Add Category
                    </a>
                  </li>
                </ul>
              )}
            </li>
            
            <li>
              <a
                href="/admin/orders"
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                  pathname === "/admin/orders" ? "bg-gray-100" : ""
                } py-4`}
              >
                <HiMiniInboxArrowDown className="h-5 w-5" />
                <span className="flex-1 ms-3 whitespace-nowrap font-semibold text-2xl">
                  Orders
                </span>
              </a>
            </li>
            <li>
              <a
                href="/admin/customers"
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                  pathname === "/admin/customers" ? "bg-gray-100" : ""
                } py-4`}
              >
                <FaUsers className="h-5 w-5" />
                <span className="flex-1 ms-3 whitespace-nowrap font-semibold text-2xl">
                  Customers
                </span>
              </a>
            </li>
            <li onClick={handleLogOut}>
              <a
                href="/login"
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                  pathname === "/admin/login" ? "bg-gray-100" : ""
                } py-4`}
              >
                <RiLogoutBoxFill className="h-5 w-5" />
                <span className="flex-1 ms-3 whitespace-nowrap font-semibold text-2xl">
                  Logout
                </span>
              </a>
            </li>
          </ul>
        </div>
      </aside>

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
