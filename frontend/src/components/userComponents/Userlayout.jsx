import React from "react";

import { Navigate, Outlet } from "react-router-dom";
import { Navbar, Footer } from "./index";
import Topbar from "./Topbar";
import { useSelector } from "react-redux";

const Userlayout = () => {
  const { userInfo } = useSelector((state) => state.auth || {});
  
  if (userInfo?.user?.role === 1) {
    return <Navigate to="/admin" />;
  }

  return (
    <>
      <Topbar />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Userlayout;
