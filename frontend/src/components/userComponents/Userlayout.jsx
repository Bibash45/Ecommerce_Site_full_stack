import React from "react";

import { Outlet } from "react-router-dom";
import { Navbar, Footer } from "./index";

const Userlayout = () => {
  return (
    <>
      <div className="containerBox h-7 bg-[white] text-end px-10 z-100 flex justify-end gap-5 items-center">
        <p className="tracking-tighter text-[#735DA5]">SAVE MORE ON APP</p>
        <p className="tracking-tighter text-[#735DA5]">BECOME A SELLER</p>
        <p className="tracking-tighter text-[#735DA5]">HELP AND SUPPORT</p>
      </div>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Userlayout;
