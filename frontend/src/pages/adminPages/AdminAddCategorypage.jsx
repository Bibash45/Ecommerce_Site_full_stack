import React from "react";

const AdminAddCategorypage = () => {
  return (
    <div className="min-h-[880px] flex items-center justify-center bg-gray-100 py-6">
      <div className="bg-white shadow-lg rounded-lg py-6 px-12 max-w-[1200px] w-full">
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-4">
          Add New Category
        </h1>
        <form>
          {/* Category Name */}
          <div className="mb-4">
            <label
              htmlFor="category_name"
              className="block text-sm font-medium text-gray-600"
            >
              Category Name
            </label>
            <input
              type="text"
              id="category_name"
              className="mt-1 block w-full p-2 text-gray-800 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter category name"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg shadow-md hover:bg-purple-700 transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminAddCategorypage;
