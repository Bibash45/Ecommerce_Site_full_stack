import React from "react";

const Topbar = () => {
  return (
    <div className=" h-7 bg-white text-end z-10 flex justify-center md:justify-between items-center  md:pr-6 lg:pr-10">
      {/* <!-- Marquee Section --> */}
      <div className="hidden md:block w-full md:w-[50%] lg:w-[70%] overflow-hidden">
        <div className="scrolling-text">
          <marquee className="text-amber-500 text-sm md:text-base font-semibold ">
            SALE - UPTO 80% OFF + EXTRA 10% OFF ON PREPAID ORDERS &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; SALE - UPTO 80% OFF + EXTRA 10% OFF ON PREPAID
            ORDERS &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; SALE - UPTO 80% OFF +
            EXTRA 10% OFF ON PREPAID ORDERS &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            SALE - UPTO 80% OFF + EXTRA 10% OFF ON PREPAID ORDERS &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; SALE - UPTO 80% OFF + EXTRA 10% OFF ON PREPAID
            ORDERS &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; SALE - UPTO 80% OFF +
            EXTRA 10% OFF ON PREPAID ORDERS &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            SALE - UPTO 80% OFF + EXTRA 10% OFF ON PREPAID ORDERS
          </marquee>
        </div>
      </div>

      {/* <!-- Navigation Links Section --> */}
      <div className="flex justify-end gap-4 md:gap-6 items-center text-sm md:text-sm lg:text-md">
        <p className="tracking-tighter text-[#735DA5] cursor-pointer hover:text-[#9b75c6] transition-colors">
          SAVE MORE ON APP
        </p>
        <p className="tracking-tighter text-[#735DA5] cursor-pointer hover:text-[#9b75c6] transition-colors">
          BECOME A SELLER
        </p>
        <p className="tracking-tighter text-[#735DA5] cursor-pointer hover:text-[#9b75c6] transition-colors">
          HELP AND SUPPORT
        </p>
      </div>
    </div>
  );
};

export default Topbar;
