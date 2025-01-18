import React, { useState } from "react";
import Header from "./Header";
import { HiMenuAlt2 } from "react-icons/hi";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Adminlayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const { userInfo } = useSelector((state) => state.auth || {});

  if (userInfo?.user?.role === 0) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Header
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      <div className={`  lg:ml-64 flex flex-col `}>
        <div className="bg-[#735DA5]  py-2 pl-2 pr-10 flex justify-between items-center">
          <div>
            <button
              onClick={toggleSidebar}
              className="z-50 mt-2  text-white rounded-md lg:hidden hover:bg-purple-600 "
            >
              <HiMenuAlt2 className="w-8 h-8" />
            </button>
          </div>
          <div className="flex justify-center items-center">
            <h1 className="text-white  font-bold text-3xl">{userInfo?.user?.name}</h1>
          </div>
        </div>
        <div >
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Adminlayout;
