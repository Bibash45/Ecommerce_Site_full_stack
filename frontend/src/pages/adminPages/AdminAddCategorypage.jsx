import React, { useState } from "react";
import { usePostCategoryMutation } from "../../features/categoryApiSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const AdminAddCategorypage = () => {
  const { userInfo } = useSelector((state) => state.auth || {});
  const { token } = userInfo || {};
  const [category, setCategoryName] = useState({ category_name: "" });
  const [postCategory, { isLoading: postCategoryLoading }] =
    usePostCategoryMutation();

  const submit = async (e) => {
    e.preventDefault();
    console.log(category);

    try {
      const response = await postCategory({ category, token })
      console.log(response);
      toast.success("Category created successfully");
      setCategoryName({ category_name: "" });
    } catch (error) {
      console.log(error);
      toast.error(
        error?.data?.message || "An error occurred while creating the category"
      );
    }
  };

  return (
    <div className="min-h-[880px] flex items-center justify-center bg-gray-100 py-6">
      <div className="bg-white shadow-lg rounded-lg py-6 px-12 max-w-[1200px] w-full">
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-4">
          Add New Category
        </h1>
        <form onSubmit={submit}>
          {/* Category Name */}
          <div className="mb-5">
            <label
              htmlFor="category_name"
              className="block text-sm font-medium text-gray-600"
            >
              Category Name
            </label>
            <input
              value={category.category_name}
              onChange={(e) =>
                setCategoryName({ category_name: e.target.value })
              }
              type="text"
              id="category_name"
              className="mt-1 block w-full p-3 text-gray-800 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter category name"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-400 text-white py-2 rounded-lg shadow-md hover:bg-purple-500 transition duration-200"
          >
            {postCategoryLoading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminAddCategorypage;
