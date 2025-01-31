import React, { useEffect, useState } from "react";
import image1 from "../../assets/images/bann.jpg";
import image2 from "../../assets/images/banner.jpg";

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [timer, setTimer] = useState(null);

  const images = [image1, image2, image1, image2];

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 5000); // Auto-slide every 3 seconds
    setTimer(interval);
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const handleMouseEnter = () => {
    if (timer) clearInterval(timer); // Pause auto-slide on hover
  };

  const handleMouseLeave = () => {
    const interval = setInterval(handleNext, 3000); // Resume auto-slide on hover leave
    setTimer(interval);
  };

  return (
    <div
      id="default-carousel"
      className="relative w-full"
      data-carousel="slide"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Carousel Wrapper */}
      <div className="relative h-56 overflow-hidden rounded-lg md:h-[400px] lg:h-[450px] xl:h-[500px]">
        {images.map((src, index) => (
          <div
            key={index}
            className={`duration-700 ease-in-out ${
              index === activeIndex ? "block" : "hidden"
            }`}
            aria-hidden={index !== activeIndex}
          >
            <img
              src={src}
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/600x400";
              }}
              className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </div>

      {/* Slider Indicators */}
      <div className="hidden md:block flex absolute z-30  -translate-x-1/2   md:bottom-10 left-1/2 space-x-3 rtl:space-x-reverse opacity-30">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full ${
              index === activeIndex ? "bg-blue-500" : "bg-gray-300"
            }`}
            aria-current={index === activeIndex}
            aria-label={`Slide ${index + 1}`}
            onClick={() => setActiveIndex(index)}
          ></button>
        ))}
      </div>

      {/* Slider Controls */}
      <button
        type="button"
        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={handlePrev}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={handleNext}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
};

export default Carousel;
