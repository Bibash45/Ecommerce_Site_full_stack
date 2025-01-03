import React from "react";

import { Outlet } from "react-router-dom";
import { Navbar, Footer } from "./index";
import Topbar from "./Topbar";

const Userlayout = () => {
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
