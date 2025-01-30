import React, { useEffect, useState } from "react";
import { useGetProductDetailsQuery } from "../../features/productApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../features/cartSlice";
import { toast } from "react-toastify";
import { Product } from "../../components/userComponents";
import {
  useCreateWishlistMutation,
  useDeleteMyWishlistMutation,
  useGetMyWishlistQuery,
} from "../../features/wishlistApiSlice";

const ProductDetailPage = () => {
  const { userInfo } = useSelector((state) => state.auth || {});
  const { token } = userInfo || {};
  const { _id: userId } = userInfo?.user || {};

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();

  const [qty, setQty] = useState(1);
  const [mainImage, setMainImage] = useState("");
  const [zoom, setZoom] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Fetch product details
  const {
    data: product,
    isLoading: productLoading,
    error: productError,
  } = useGetProductDetailsQuery(productId);

  const {
    data: wishlistData,
    isLoading: wishlistLoading,
    error: wishlistError,
    refetch: refetchWishlist,
  } = useGetMyWishlistQuery({ userId, token }, { skip: !userId || !token });

  const [createWishlist, { isLoading: createWishlistLoading }] =
    useCreateWishlistMutation();

  const [deleteWishlist, { isLoading: deleteWishlistLoading }] =
    useDeleteMyWishlistMutation();

  useEffect(() => {
    if (product?.product_image?.length > 0) {
      setMainImage(`http://localhost:5000/${product.product_image[0]}`);
    }
  }, [product]);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoom({ x, y });
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Item added to cart");
  };

  const addToWishlist = async () => {
    if (!userInfo) {
      return navigate("/login");
    }
    try {
      await createWishlist({ userId, productId, token }).unwrap();
      refetchWishlist();
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  const removeFromWishlist = async () => {
    try {
      await deleteWishlist({ token, userId, productId }).unwrap();
      refetchWishlist();
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  const checkWishlistData = () => {
    return wishlistData?.products?.some(
      (item) => item?.productId?._id === productId
    );
  };

  if (
    productLoading ||
    wishlistLoading ||
    createWishlistLoading ||
    deleteWishlistLoading
  ) {
    return <div className="text-center">Loading...</div>;
  }

  if (productError || wishlistError) {
    return <div className="text-center text-red-500">Error loading data</div>;
  }

  return (
    <div className="containerBox bg-[rgb(255,255,255)]">
      {/* Zoomed Image Preview */}
      {isHovered && (
        <div
          className="hidden md:block absolute top-[10%] right-[9%] w-[400px] h-[400px] lg:w-[700px] lg:h-[600px] z-50 bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url('${mainImage}')`,
            backgroundSize: "200%",
            backgroundPosition: `${zoom.x}% ${zoom.y}%`,
            pointerEvents: "none",
            transition: "opacity 0.3s ease-in-out",
            opacity: 1,
            borderRadius: "20px",
          }}
        ></div>
      )}

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap -mx-4">
          {/* Product Images */}
          <div className="w-full md:w-1/2 px-4 mb-8 relative">
            <div
              className="relative w-full h-auto"
              style={{ overflow: "hidden", borderRadius: "8px" }}
            >
              <img
                src={mainImage}
                alt="Product"
                className="w-full h-auto rounded-lg shadow-md mb-4"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              />
            </div>
            <div className="flex gap-4 py-4 justify-center overflow-x-auto">
              {product?.product_image?.map((image) => (
                <img
                  key={image}
                  src={`http://localhost:5000/${image}`}
                  alt="Thumbnail"
                  className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                  onMouseEnter={(e) => setMainImage(e.target.src)}
                />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="w-full md:w-1/2 px-10 md:px-4">
            <h2 className="text-3xl font-bold mb-2">{product.product_name}</h2>
            <p className="text-gray-600 mb-1">
              Category: {product?.category?.category_name}
            </p>
            <div className="mb-4">
              <span className="text-2xl font-bold mr-2">
                Rs.{product.product_price}
              </span>
            </div>
            <p className="text-gray-700 mb-6">{product.product_description}</p>

            <div className="mb-6">
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Quantity:
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min={1}
                max={product.countInStock}
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                className="w-12 text-center rounded-md border-gray-300 shadow-sm"
              />
            </div>

            <div className="flex space-x-4 mb-6">
              <button
                onClick={addToCartHandler}
                className="bg-[#735DA5] flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-[#563d91] focus:outline-none"
              >
                Add to Cart
              </button>
              {checkWishlistData() ? (
                // <button
                //   onClick={removeFromWishlist}
                //   className="bg-gradient-to-r from-gray-400 to-gray-600 flex gap-2 items-center text-white px-6 py-2 rounded-md"
                // >
                //   Clear Favourite
                // </button>
                ""
              ) : (
                <button
                  onClick={addToWishlist}
                  className="bg-gradient-to-r from-pink-500 to-red-400 flex gap-2 items-center text-white px-6 py-2 rounded-md"
                >
                  Add to Favourite
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 py-2">
        <h1 className="text-xl text-gray-700 px-5 font-medium">
          You may also like
        </h1>
        <Product />
      </div>
    </div>
  );
};

export default ProductDetailPage;
