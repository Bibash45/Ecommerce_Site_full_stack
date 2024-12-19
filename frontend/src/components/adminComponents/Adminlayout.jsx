import React from "react";
import Header from "./Header";
import { Footer } from "../userComponents";
import { Outlet } from "react-router-dom";

const Adminlayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Adminlayout;
