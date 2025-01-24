import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import {
  useDeleteCategoryMutation,
  useGetCategoryQuery,
  useUpdateCategoryMutation,
} from "../../features/categoryApiSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";

const AdminCategoryListpage = () => {
  const { userInfo } = useSelector((state) => state.auth || {});
  const { token } = userInfo || {};

  const {
    data: categorylist,
    isLoading: categorylistLoading,
    error,
    refetch,
  } = useGetCategoryQuery({ token });

  const [deleteCategory, { isLoading: deleteLoading }] =
    useDeleteCategoryMutation();

  const [updateCategory, { isLoading: updateLoading }] =
    useUpdateCategoryMutation();

  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editedCategoryName, setEditedCategoryName] = useState("");

  const handleDelete = async (categoryId) => {
    try {
      const response = await deleteCategory({
        categoryId,
        token,
      }).unwrap();
      refetch();
      toast.success(response.message);
    } catch (error) {
      toast.error("Error deleting category");
      console.log(error);
    }
  };

  const handleEditClick = (category) => {
    setEditCategoryId(category._id);
    setEditedCategoryName(category.category_name);
  };

  const handleUpdate = async (categoryId) => {
    try {
      await updateCategory({
        categoryId,
        category_name: editedCategoryName,
        token,
      }).unwrap();
      refetch();
      toast.success("Category updated successfully");
      setEditCategoryId(null);
    } catch (error) {
      toast.error("Error updating category");
      console.log(error);
    }
  };

  const handleCancelEdit = () => {
    setEditCategoryId(null); // Cancel edit mode
    setEditedCategoryName(""); // Reset the edited category name
  };

  const override: CSSProperties = {
    display: "block",
    margin: "10% auto",
    borderColor: "red",
    position: "center",
  };

  if (categorylistLoading) {
    return (
      <ClipLoader
        color="gray"
        loading="true"
        cssOverride={override}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );
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
                    {editCategoryId === category._id ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={editedCategoryName}
                          onChange={(e) =>
                            setEditedCategoryName(e.target.value)
                          }
                          className="border p-2 rounded-lg"
                        />
                        <button
                          onClick={handleCancelEdit}
                          className="p-2 bg-gray-300 hover:bg-gray-400 text-gray-600 rounded-lg"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      category.category_name
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-4">
                      {/* Edit Button */}
                      {editCategoryId === category._id ? (
                        <button
                          onClick={() => handleUpdate(category._id)}
                          className="p-2 bg-green-100 hover:bg-green-200 text-green-600 rounded-lg shadow-sm hover:mr-2 transition-all ease-in-out duration-400"
                        >
                          {updateLoading ? "Updating..." : "Save"}
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEditClick(category)}
                          className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg shadow-sm hover:mr-2 transition-all ease-in-out duration-400"
                          type="button"
                        >
                          <BiEdit size={20} />
                        </button>
                      )}
                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(category._id)}
                        className={`p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg shadow-sm hover:ml-2 transition-all ease-in-out duration-400 ${
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
