import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useGetCategoryQuery } from "../../features/categoryApiSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useGetProductDetailsQuery } from "../../features/productApiSlice";

const UpdateProduct = () => {
  const { productId } = useParams();
  const { userInfo } = useSelector((state) => state.auth || {});
  const { token } = userInfo || {};

  const { data: categoryList, isLoading: categoryListLoading } =
    useGetCategoryQuery({ token });
    console.log(categoryList);
    

  const { data: productDetail, isLoading: productDetailLoading } =
    useGetProductDetailsQuery(productId);

  const [state, setState] = useState({
    product_name: "",
    product_price: "",
    product_description: "",
    countInStock: "",
    product_image: [],
    category: "",
  });

  const [removedImages, setRemovedImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Update state when product details are loaded
  useEffect(() => {
    if (productDetail) {
      setState({
        product_name: productDetail.product_name || "",
        product_price: productDetail.product_price || "",
        product_description: productDetail.product_description || "",
        countInStock: productDetail.countInStock || "",
        product_image: productDetail.product_image || [],
        category: productDetail.category?._id || "",
      });
    }
  }, [productDetail]);

  const inputChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    // Limit to 5 images
    if (files.length + state.product_image.length > 5) {
      toast.error("You can only upload up to 5 images.");
      return;
    }

    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setState((prevState) => ({
      ...prevState,
      product_image: [...prevState.product_image, ...newImages],
    }));
  };

  // Remove image
  const removeImage = (index) => {
    const imageToRemove = state.product_image[index];
    if (imageToRemove.file) {
      // New image (not uploaded)
      setState((prevState) => ({
        ...prevState,
        product_image: prevState.product_image.filter((_, i) => i !== index),
      }));
    } else {
      // Existing image (already uploaded)
      setRemovedImages((prev) => [...prev, imageToRemove]);
      setState((prevState) => ({
        ...prevState,
        product_image: prevState.product_image.filter((_, i) => i !== index),
      }));
    }
  };

  // Submit form
  const submitForm = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !(
        state.product_price &&
        state.product_name &&
        state.product_image.length > 0 &&
        state.countInStock &&
        state.product_description &&
        state.category
      )
    ) {
      toast.error("Complete the input fields.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("product_name", state.product_name);
      formData.append("product_price", state.product_price);
      formData.append("product_description", state.product_description);
      formData.append("countInStock", state.countInStock);
      formData.append("category", state.category);

      // Append new images
      state.product_image.forEach((image) => {
        if (image.file) formData.append("product_image", image.file);
      });

      // Append removed images
      formData.append("imagesToRemove", JSON.stringify(removedImages));

      // Send request to backend
      await axios.post(`/updateproduct/${productId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Product updated successfully");
      setState({
        product_name: "",
        product_price: "",
        product_description: "",
        countInStock: "",
        product_image: [],
        category: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating product");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Cleanup object URLs
    return () => {
      state.product_image.forEach((image) => {
        if (image.preview) {
          URL.revokeObjectURL(image.preview);
        }
      });
    };
  }, [state.product_image]);

  if (productDetailLoading || categoryListLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-[880px] flex items-center justify-center bg-gray-100 py-6">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-[1200px] w-full">
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-4">
          Update Product
        </h1>
        <form onSubmit={submitForm}>
          {/* Product Name */}
          <div className="mb-4">
            <label
              htmlFor="product_name"
              className="block text-sm font-medium text-gray-600"
            >
              Product Name
            </label>
            <input
              onChange={inputChange}
              type="text"
              id="product_name"
              name="product_name"
              value={state.product_name}
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
                onChange={inputChange}
                type="number"
                id="price"
                name="product_price"
                value={state.product_price}
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
                onChange={inputChange}
                type="number"
                id="stock"
                name="countInStock"
                value={state.countInStock}
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
                onChange={inputChange}
                id="category"
                name="category"
                value={state.category}
                className="mt-1 block w-full p-2 text-gray-800 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none hover:bg-white"
                required
              >
                <option value="">Select category</option>
                {categoryList &&
                  categoryList.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.category_name}
                    </option>
                  ))}
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
              onChange={inputChange}
              id="description"
              name="product_description"
              value={state.product_description}
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
          {state.product_image.length > 0 && (
            <div className="flex flex-wrap gap-4 mt-4">
              {state.product_image.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image.preview || `http://localhost:5000/${image}`}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded-lg shadow-md"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
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
            className="w-full bg-purple-400 text-white py-2 mt-2 rounded-lg shadow-md hover:bg-purple-500 transition duration-200"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
