import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ name, description, price, image, productId }) => {
  console.log(image);

  const imageUrl = `http://localhost:5000/${image[0]}`;

  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${productId}`);
  };
  return (
    <div
      onClick={handleCardClick}
      className=" mx-auto mt-5 md:w-55 transform overflow-hidden rounded-lg bg-white dark:bg-slate-800  shadow-md duration-300  hover:shadow-xl"
    >
      <img
        src={imageUrl}
        alt="Product Image"
        className="w-full h-48 object-cover object-center transform hover:scale-x-[-1]"
      />
      <div className="p-2">
        <h2 className=" text-lg font-medium dark:text-white text-gray-900">
          {name}
        </h2>
        <p className="mb-1 text-base dark:text-gray-300 text-gray-700">
          {description.length > 29
            ? `${description.substring(0, 29)}....`
            : description}
        </p>
        <div className="flex items-center">
          <p className="mr-2 text-lg font-semibold text-[#735DA5] 3dark:text-white">
            Rs.{price}
          </p>
          <p className="text-base  font-medium text-gray-500 line-through dark:text-gray-300">
            Rs.25.00
          </p>
          <p className="ml-auto text-base font-medium text-green-500">
            20% off
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
