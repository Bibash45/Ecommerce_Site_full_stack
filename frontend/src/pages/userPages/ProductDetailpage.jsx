import React, { useEffect, useState } from "react";
import { useGetProductDetailsQuery } from "../../features/productApiSlice";

import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cartSlice";
import { toast } from "react-toastify";

const ProductDetailpage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const { productId } = useParams();
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  // getting images array
  const { product_image = [] } = product || {};

  const [zoom, setZoom] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const image1 = "http://localhost:5000/" + product_image[0];

  const [mainImage, setMainImage] = useState(image1 || "");

  useEffect(() => {
    if (product_image.length > 0) {
      setMainImage(image1);
    }
  }, [product_image.length, image1]);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoom({ x, y });
  };

  const addtoCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Item added to cart");
  };

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="containerBox bg-[rgb(255,255,255)]">
      {isHovered && (
        <div
          className="hidden md:block absolute top-[10%] right-[9%] w-[400px] h-[400px] lg:w-[700px]  lg:h-[600px] z-50 bg-cover bg-no-repeat "
          style={{
            backgroundImage: `url('${mainImage}')`,
            backgroundSize: "200%",
            backgroundPosition: `${zoom.x}% ${zoom.y}%`,
            pointerEvents: "none",
            transition: "opacity 0.3s ease-in-out",
            opacity: 1,
            borderRadius: "20px",
            // boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
        ></div>
      )}
      <div>
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap -mx-4">
            {/* Product Images */}
            <div className="w-full md:w-1/2 px-4 mb-8 relative">
              <div
                className="relative w-full h-auto"
                style={{
                  overflow: "hidden",
                  borderRadius: "8px",
                }}
              >
                <img
                  src={mainImage}
                  alt="Product"
                  className="w-full h-auto rounded-lg shadow-md mb-4"
                  id="mainImage"
                  onMouseMove={handleMouseMove}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  style={{ transition: "transform 0.1s ease-out" }}
                />
              </div>
              <div className="flex gap-4 py-4 justify-center overflow-x-auto">
                {product_image &&
                  product_image.map((image) => (
                    <img
                      src={`http://localhost:5000/${image}`}
                      alt="Thumbnail 2"
                      className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                      onMouseMove={(e) => setMainImage(e.target.src)}
                    />
                  ))}
              </div>
            </div>
            {/* Product Details */}
            <div className="w-full md:w-1/2 px-4">
              <h2 className="text-3xl font-bold mb-2">
                {product.product_name}
              </h2>
              <p className="text-gray-600 mb-1">
                category: {product.category.category_name}
              </p>
              <div className="mb-4">
                <span className="text-2xl font-bold mr-2">
                  ${product.product_price}
                </span>
                <span className="text-gray-500 line-through">
                  ${product.product_price}
                </span>
              </div>
              <p className="text-gray-700 mb-6">
                {product.product_description}
              </p>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Color:</h3>
                <div className="flex space-x-2">
                  <button className="w-8 h-8 bg-black rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black" />
                  <button className="w-8 h-8 bg-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300" />
                  <button className="w-8 h-8 bg-blue-500 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" />
                </div>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Quantity:
                </label>
                <input
                  onChange={(e) => setQty(e.target.value)}
                  type="number"
                  id="quantity"
                  name="quantity"
                  min={1}
                  max={product.countInStock}
                  value={qty}
                  className="w-12 text-center rounded-md border-gray-300  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div className="flex space-x-4 mb-6">
                <button
                  onClick={addtoCartHandler}
                  className="bg-[#735DA5] flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-[#563d91] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Add to Cart
                </button>
                <button className="bg-gray-200 flex gap-2 items-center  text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                  Wishlist
                </button>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Key Features:</h3>
                <ul className="list-disc list-inside text-gray-700">
                  <li>Industry-leading noise cancellation</li>
                  <li>30-hour battery life</li>
                  <li>Touch sensor controls</li>
                  <li>Speak-to-chat technology</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailpage;
