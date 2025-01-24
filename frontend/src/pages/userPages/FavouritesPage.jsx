import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([
    // Example Wishlist Items (Replace with real data from your API or state)
    {
      id: 1,
      name: "Product 1",
      price: 29.99,
      imageUrl: "/path-to-image1.jpg",
      description: "Short description of Product 1",
    },
    {
      id: 2,
      name: "Product 2",
      price: 49.99,
      imageUrl: "/path-to-image2.jpg",
      description: "Short description of Product 2",
    },
  ]);

  const removeFromWishlist = (id) => {
    setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== id));
    toast.success("Item removed from wishlist!");
  };

  const addToCart = (item) => {
    // Logic to add item to cart (e.g., update global state or localStorage)
    toast.success(`${item.name} added to cart!`);
  };

  return (
    <section className="bg-gray-50 min-h-screen py-6">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Wishlist</h1>

        {/* Empty Wishlist Message */}
        {wishlistItems.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600 mb-4">Your wishlist is empty.</p>
            <Link to="/shop" className="text-blue-600 hover:underline">
              Browse products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Wishlist Items */}
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.description}</p>
                  <p className="text-lg font-bold text-gray-800">${item.price}</p>
                </div>
                <div className="p-4 flex justify-between items-center">
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View Cart Button */}
        {wishlistItems.length > 0 && (
          <div className="flex justify-between items-center mt-6">
            <Link
              to="/cart"
              className="text-xl font-semibold text-blue-600 hover:underline"
            >
              Go to Cart
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default WishlistPage;
