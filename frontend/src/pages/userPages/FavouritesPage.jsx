import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useDeleteMyWishlistMutation,
  useGetMyWishlistQuery,
} from "../../features/wishlistApiSlice";
import { addToCart } from "../../features/cartSlice";

const WishlistPage = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth || {});
  const { token } = userInfo || {};
  const { _id: userId } = userInfo?.user || {};
  const [qty, setQty] = useState(1);

  const {
    data: wishlistData,
    isLoading: wishlistLoading,
    error: wishlistError,
    refetch: refetchWishlist,
  } = useGetMyWishlistQuery({ userId, token });

  const [deleteWishlist, { isLoading: deleteWishlistLoading }] =
    useDeleteMyWishlistMutation();

  const removeFromWishlist = async (productId) => {
    try {
      await deleteWishlist({ token, userId, productId }).unwrap();
      refetchWishlist();
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  if (!(token && userInfo.user)) {
    return <Navigate to="/login" />;
  }

  if (wishlistLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="bg-gray-50 min-h-[calc(100vh-375px)] py-6">
      <div className="container mx-auto px-4">
        {/* View Cart Button */}
        {wishlistData?.products.length > 0 && (
          <div className=" containerBox flex justify-between items-center pb-6   underline underline-offset-2">
            <Link
              to="/cart"
              className="text-xl font-semibold text-black hover:underline"
            >
              Go to Cart
            </Link>
          </div>
        )}
        <h1 className="text-2xl font-bold text-gray-600 mb-6">Your Wishlist</h1>

        {/* Empty Wishlist Message */}
        {wishlistData?.products.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600 mb-4">Your wishlist is empty.</p>
            <Link to="/" className="text-blue-600 hover:underline">
              Browse products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Wishlist Items */}
            {wishlistData?.products.map((item) => (
              <div
                key={item.productId._id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <Link to={`/product/${item.productId._id}`}>
                  <img
                    src={`http://localhost:5000/${item.productId.product_image[0]}`}
                    alt={item.name}
                    className="w-full h-48 object-cover object-center transform hover:scale-x-[-1]"
                  />
                </Link>
                <div className="p-2 flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {item.productId.product_name}
                  </h3>
                  <p className="text-sm text-gray-500">{item.description}</p>
                  <p className="text-md font-semibold text-[#735DA5]">
                    Rs.{item.productId.product_price}
                  </p>
                </div>
                <div className="p-4 flex justify-between items-center">
                  <button
                    onClick={() => {
                      dispatch(addToCart({ ...item.productId, qty: 1 }));
                    }}
                    className="bg-[#735DA5] text-white py-2 px-4 rounded-lg hover:bg-[#604d8b]"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item.productId._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default WishlistPage;
