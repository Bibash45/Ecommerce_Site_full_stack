import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { useGetMyOrdersQuery } from "../../features/orderApiSlice";
import { format } from "date-fns";
import { useGetMyWishlistQuery } from "../../features/wishlistApiSlice";
import { useUpdateUserMutation } from "../../features/userApiSlice"; // FIXED: Correct mutation

const ProfilePage = () => {
  const { userInfo } = useSelector((state) => state.auth || {});
  const { token } = userInfo || {};

  const { data: myOrders, isLoading: myOrdersLoading } = useGetMyOrdersQuery({
    userId: userInfo?.user?._id,
    token,
  });

  const { data: wishlistData, isLoading: wishlistLoading } =
    useGetMyWishlistQuery({ userId: userInfo?.user?._id, token });

  const [updateUser, { isLoading: updateUserLoading }] =
    useUpdateUserMutation(); // FIXED: Correct mutation

  const [isEditing, setIsEditing] = useState(false);
  const [updatedDetails, setUpdatedDetails] = useState({
    name: userInfo?.user?.name || "",
    email: userInfo?.user?.email || "",
    address: userInfo?.user?.address || "",
  });

  if (!(token && userInfo?.user)) {
    return <Navigate to="/login" />;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await updateUser({userId:userInfo.user._id, token, ...updatedDetails }).unwrap();
      setIsEditing(false);
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  if (myOrdersLoading || wishlistLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-300 min-h-screen">
      <main className="container mx-auto px-4 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="bg-white w-full lg:w-1/4 p-6 rounded-2xl shadow-lg">
            <div className="flex flex-col items-center">
              <img
                className="w-24 h-24 rounded-full object-cover"
                src={
                  userInfo?.user?.image
                    ? `http://localhost:5000/${userInfo?.user?.image}`
                    : "/default-profile.png" // FIXED: Default Image
                }
                alt="Profile"
              />
              <h2 className="mt-4 text-2xl font-bold text-gray-800">
                {userInfo?.user?.name}
              </h2>
              <p className="text-gray-600 text-sm">{userInfo?.user?.email}</p>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-[#735DA5] text-white px-6 py-2 rounded-full mt-4 transition hover:bg-[#504074]"
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </button>
            </div>
            <hr className="my-6 border-gray-300" />
            <ul className="space-y-4">
              <li>
                <Link
                  to="/myorders"
                  className="text-gray-700 font-medium flex items-center gap-2 hover:text-indigo-600 transition"
                >
                  🛒 Order History
                </Link>
              </li>
              <li>
                <Link
                  to="/favourites"
                  className="text-gray-700 font-medium flex items-center gap-2 hover:text-indigo-600 transition"
                >
                  ❤️ Wishlist
                </Link>
              </li>
              <li className="text-gray-700 font-medium flex items-center gap-2 hover:text-indigo-600 transition">
                📍 Saved Addresses
              </li>
              <li className="text-gray-700 font-medium flex items-center gap-2 hover:text-indigo-600 transition">
                🔒 Change Password
              </li>
            </ul>
          </aside>

          {/* Main Content */}
          <section className="bg-white w-full lg:w-3/4 p-6 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Account Details
            </h3>
            <div className="space-y-4">
              {[
                {
                  label: "Full Name",
                  name: "name",
                  value: updatedDetails.name,
                },
                { label: "Email", name: "email", value: updatedDetails.email },
                {
                  label: "Address",
                  name: "address",
                  value: updatedDetails.address || "Please add an address !!",
                },
              ].map((detail) => (
                <div
                  key={detail.name}
                  className="flex justify-between items-center"
                >
                  <p className="text-gray-600">{detail.label}</p>
                  {isEditing ? (
                    <input
                      type="text"
                      name={detail.name}
                      value={detail.value}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-md px-4 py-1 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  ) : (
                    <p className="text-gray-800 font-medium">{detail.value}</p>
                  )}
                </div>
              ))}
            </div>
            {isEditing && (
              <div className="flex justify-between items-center mt-3">
                <p className="text-gray-600">Change Image</p>
                <input
                  className="border border-gray-300 rounded-md px-4 py-1 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none w-[219px]"
                  type="file"
                />
              </div>
            )}
            {isEditing && (
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  onClick={handleSave}
                  className="bg-green-500 text-white px-6 py-2 rounded-full transition hover:bg-green-600"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-500 text-white px-6 py-2 rounded-full transition hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            )}

            <hr className="my-6 border-gray-300" />

            {/* Order History */}
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Order History
            </h3>
            <ul className="space-y-4">
              {myOrders && myOrders.length > 0 ? (
                myOrders.slice(0, 4).map((order) => {
                  const formattedDate = format(
                    new Date(order.createdAt),
                    "PPpp"
                  );
                  return (
                    <li
                      key={order._id}
                      className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md"
                    >
                      <div>
                        <p className="text-gray-600">Order #{order._id}</p>
                        <p className="text-gray-500 text-sm">
                          Date: {formattedDate}
                        </p>
                      </div>
                      <p
                        className={`font-medium ${
                          order.status === "completed"
                            ? "text-green-500"
                            : "text-yellow-500"
                        }`}
                      >
                        {order.status}
                      </p>
                    </li>
                  );
                })
              ) : (
                <p>No orders found !!!</p>
              )}
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
