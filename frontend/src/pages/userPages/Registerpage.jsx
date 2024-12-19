import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../../features/userApiSlice";

const Registerpage = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmError, setConfirmError] = useState("");

  const handleChange = (e) => {
    setRegisterData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setConfirmError("");

    if (confirmPassword !== registerData.password) {
      setConfirmError("Confirm password does not match");
      return;
    }

    try {
      const res = await register(registerData).unwrap();
      setRegisterData({ name: "", email: "", password: "" });
      setConfirmPassword("");
      toast.success(res.message);
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.error || error.error || "Registration failed");
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 mx-auto pb-[40px] pt-[42px]">
        <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold text-gray-900 md:text-2xl dark:text-white">
              Register new account here
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Name
                </label>
                <input
                  value={registerData.name}
                  onChange={handleChange}
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border text-gray-900 rounded-lg w-full p-2.5 dark:bg-gray-700"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  value={registerData.email}
                  onChange={handleChange}
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border text-gray-900 rounded-lg w-full p-2.5 dark:bg-gray-700"
                  placeholder="test1@test.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  value={registerData.password}
                  onChange={handleChange}
                  type="password"
                  name="password"
                  id="password"
                  className="bg-gray-50 border text-gray-900 rounded-lg w-full p-2.5 dark:bg-gray-700"
                  placeholder="••••••••"
                  required
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Confirm Password
                </label>
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  id="confirmPassword"
                  className="bg-gray-50 border text-gray-900 rounded-lg w-full p-2.5 dark:bg-gray-700"
                  placeholder="Re-enter password"
                  required
                />
                {confirmError && <p className="text-red-500 text-sm">{confirmError}</p>}
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full text-white bg-[#8d7db3] hover:bg-[#735DA5] font-medium rounded-lg text-sm px-5 py-2.5 ${
                  isLoading && "opacity-50 cursor-not-allowed"
                }`}
              >
                {isLoading ? "Registering..." : "Register"}
              </button>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link to="/login" className="text-primary-600 hover:underline dark:text-primary-500">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Registerpage;
