import React, { CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../features/productApiSlice";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const AdminProductList = () => {
  const { userInfo } = useSelector((state) => state.auth || {});
  const { token } = userInfo || {};
  const {
    data: productlist,
    isLoading: productlistLoading,
    refetch,
  } = useGetProductsQuery();
  const override: CSSProperties = {
    display: "block",
    margin: "10% auto",
    borderColor: "red",
    position: "center",
  };

  const [deleteProduct, { isLoading }] = useDeleteProductMutation();

  const handleDelete = async (productId) => {
    try {
      const response = await deleteProduct({ productId, token }).unwrap();
      toast.success(response?.message);
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  if (productlistLoading) {
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
  console.log(productlist);

  return (
    <>
      <div>Header</div>
      <div className="relative overflow-x-auto mt-3">
        <table className="table-auto w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700 uppercase bg-purple-300 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                stock
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>

              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {productlist &&
              productlist.map((product, i) => {
                return (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {product.product_name}
                    </th>
                    <td className="px-6 py-4">
                      <div className="flex gap-1 overflow-x-auto min-w-[150px]">
                        {product &&
                          product.product_image.map((image) => (
                            <img
                              className="w-[50px] h-[50px] hover:scale-150 hover:shadow-lg hover:shadow-black"
                              src={`http://localhost:5000/${image}`}
                              alt=""
                            />
                          ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {product?.category?.category_name}
                    </td>
                    <td className="px-6 py-4">{product.countInStock}</td>
                    <td className="px-6 py-4">{product.product_description}</td>
                    <td className="px-6 py-4">{product.product_price}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-5">
                        <Link
                        to={`/admin/product/update/${product._id}`}
                          className="hover:mr-2 transition-all duration-300 ease-in-out"
                          type="button"
                        >
                          <BiEdit color="purple" size={30} />
                        </Link>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="hover:ml-2 transition-all duration-300 ease-in-out"
                          type="button"
                        >
                          <RiDeleteBin6Line color="red" size={25} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminProductList;
