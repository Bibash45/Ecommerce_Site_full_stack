import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";

const AdminAddProductPage = () => {
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + images.length > 5) {
      setImages([]);
      alert("You can only upload up to 5 images.");
      return;
    }

    setImages((prevImages) => [...prevImages, ...files]);
  };

  return (
    <div className="min-h-[880px]  flex items-center justify-center bg-gray-100 py-6">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-[1200px] w-full">
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-4">
          Add New Product
        </h1>
        <form>
          {/* Product Name */}
          <div className="mb-4">
            <label
              htmlFor="product_name"
              className="block text-sm font-medium text-gray-600"
            >
              Product Name
            </label>
            <input
              type="text"
              id="product_name"
              className="mt-1 block w-full p-2 text-gray-800 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter product name"
              required
            />
          </div>

          {/* Price, Stock, and Category */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-600"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                className="mt-1 block w-full p-2 text-gray-800 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter price"
                required
              />
            </div>
            <div>
              <label
                htmlFor="stock"
                className="block text-sm font-medium text-gray-600"
              >
                Stock
              </label>
              <input
                type="number"
                id="stock"
                className="mt-1 block w-full p-2 text-gray-800 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter stock"
                required
              />
            </div>
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-600"
              >
                Category
              </label>
              <select
                id="category"
                className="mt-1 block w-full p-2 text-gray-800 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">Select category</option>
                <option value="jacket">Jacket</option>
                <option value="electronics">Electronics</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-600"
            >
              Description
            </label>
            <textarea
              id="description"
              className="mt-1 block w-full p-2 text-gray-800 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              rows="3"
              placeholder="Enter product description"
              required
            ></textarea>
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <label
              htmlFor="images"
              className="block text-sm font-medium text-gray-600"
            >
              Upload Images (Max: 5)
            </label>
            <input
              type="file"
              id="images"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full p-2 text-gray-800 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Preview Images */}
          {images.length > 0 && (
            <div className="flex flex-wrap gap-4 mt-4">
              {images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded-lg shadow-md"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setImages(images.filter((_, i) => i !== index))
                    }
                    className="absolute top-1 right-1 text-white bg-red-500 hover:bg-red-600 p-1 rounded-full text-sm transition-opacity opacity-0 group-hover:opacity-100"
                  >
                    <RxCross2 />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 mt-2 rounded-lg shadow-md hover:bg-purple-700 transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminAddProductPage;
