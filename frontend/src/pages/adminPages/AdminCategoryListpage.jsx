import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import {
  useDeleteCategoryMutation,
  useGetCategoryQuery,
} from "../../features/categoryApiSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const AdminCategoryListpage = () => {
  const { userInfo } = useSelector((state) => state.auth || {});
  const { token } = userInfo || {};
  const {
    data: categorylist,
    isLoading: categorylistLoading,
    error,
  } = useGetCategoryQuery({ token });

  const [deleteCategory, { isLoading: deleteLoading, refetch }] =
    useDeleteCategoryMutation();

  const handleDelete = async (categoryId) => {
    try {
      const response = await deleteCategory({
        categoryId,
        token,
      }).unwrap();
      refetch();
      console.log(response);

      toast.success(response.message);
    } catch (error) {
      toast.error("Error deleting category");
      console.log(error);
    }
  };

  if (categorylistLoading) {
    return <div className="m-10">Loading...</div>;
  }

  return (
    <>
      <div className="text-center py-4 bg-gray-100">
        <h1 className="text-3xl font-bold text-purple-600">
          Category Management
        </h1>
        <p className="text-gray-600 mt-2">Manage your categories efficiently</p>
      </div>
      <div className="container mx-auto px-4 mt-6">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full table-auto text-sm text-left text-gray-500">
            <thead className="bg-purple-400 text-white">
              <tr>
                <th scope="col" className="px-6 py-4 text-center font-medium">
                  Category Name
                </th>
                <th scope="col" className="px-6 py-4 text-center font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {categorylist.map((category) => (
                <tr
                  key={category._id}
                  className="bg-gray-50 hover:bg-purple-50 transition duration-200"
                >
                  <td className="px-6 py-4 text-center text-gray-700 font-medium">
                    {category.category_name}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-4">
                      {/* Edit Button */}
                      <button
                        className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg shadow-sm transition duration-200"
                        type="button"
                      >
                        <BiEdit size={20} />
                      </button>
                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(category._id)}
                        className={`p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg shadow-sm transition duration-200 ${
                          deleteLoading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        type="button"
                        disabled={deleteLoading}
                      >
                        {deleteLoading ? (
                          "Deleting..."
                        ) : (
                          <RiDeleteBin6Line size={20} />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminCategoryListpage;
