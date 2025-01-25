import React from "react";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";

const ProfilePage = () => {
  const { userInfo } = useSelector((state) => state.auth || {});
  const { token } = userInfo || {};
  const orderHistory = [
    { id: 12345, status: "Delivered", date: "2025-01-01" },
    { id: 12346, status: "Shipped", date: "2025-01-15" },
  ];

  const addresses = [
    {
      id: 1,
      address: "123 Main Street, Springfield, USA",
      type: "Home",
    },
    {
      id: 2,
      address: "456 Elm Street, Springfield, USA",
      type: "Work",
    },
  ];

  if (!(token && userInfo.user)) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-md py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-700">My Profile</h1>
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="bg-white w-full lg:w-1/4 p-6 rounded-lg shadow">
            <div className="flex flex-col items-center">
              <img
                className="w-24 h-24 rounded-full object-cover"
                src={`http://localhost:5000/${userInfo?.user?.image}`}
                alt="Profile"
              />
              <h2 className="mt-4 text-xl font-semibold text-gray-700">
                John Doe
              </h2>
              <p className="text-gray-500">{userInfo?.user?.email}</p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-600">
                Edit Profile
              </button>
            </div>
            <hr className="my-4" />
            <ul className="space-y-3">
              <li className="text-gray-700 font-medium cursor-pointer hover:text-blue-500">
                🛒 Order History
              </li>
              <li className="text-gray-700 font-medium cursor-pointer hover:text-blue-500">
                <Link to="/favourites">❤️ Wishlist</Link>
              </li>
              <li className="text-gray-700 font-medium cursor-pointer hover:text-blue-500">
                📍 Saved Addresses
              </li>
              <li className="text-gray-700 font-medium cursor-pointer hover:text-blue-500">
                🔒 Change Password
              </li>
            </ul>
          </div>

          {/* Main Profile Content */}
          <div className="bg-white w-full lg:w-3/4 p-6 rounded-lg shadow">
            {/* Account Details */}
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Account Details
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-gray-600">Full Name</p>
                <p className="text-gray-800 font-medium">
                  {userInfo?.user?.name}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-600">Email</p>
                <p className="text-gray-800 font-medium">
                  {userInfo?.user?.email}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-600">Phone Number</p>
                <p className="text-gray-800 font-medium">+1234567890</p>
              </div>
            </div>
            <hr className="my-6" />

            {/* Order History */}
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Order History
            </h3>
            <ul className="space-y-3">
              {orderHistory.map((order) => (
                <li
                  key={order.id}
                  className="flex justify-between items-center bg-gray-100 p-3 rounded-lg"
                >
                  <div>
                    <p className="text-gray-600">Order #{order.id}</p>
                    <p className="text-gray-500 text-sm">Date: {order.date}</p>
                  </div>
                  <p
                    className={`font-medium ${
                      order.status === "Delivered"
                        ? "text-green-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {order.status}
                  </p>
                </li>
              ))}
            </ul>
            <hr className="my-6" />

            {/* Saved Addresses */}
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Saved Addresses
            </h3>
            <ul className="space-y-4">
              {addresses.map((address) => (
                <li
                  key={address.id}
                  className="flex justify-between items-center bg-gray-100 p-4 rounded-lg"
                >
                  <div>
                    <p className="text-gray-800 font-medium">
                      {address.address}
                    </p>
                    <p className="text-gray-500 text-sm">{address.type}</p>
                  </div>
                  <button className="text-red-500 hover:underline">
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            {/* Wishlist Section */}
            <hr className="my-6" />
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Wishlist
            </h3>
            <ul className="space-y-3">
              <li className="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
                <p className="text-gray-600">Product 1</p>
                <button className="text-blue-500 hover:underline">View</button>
              </li>
              <li className="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
                <p className="text-gray-600">Product 2</p>
                <button className="text-blue-500 hover:underline">View</button>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
