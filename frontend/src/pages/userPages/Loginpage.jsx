import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLoginMutation } from "../../features/userApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/authSlice";

const Loginpage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [login, { isLoading }] = useLoginMutation();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login(loginData).unwrap();
      console.log("Login response:", res);
      dispatch(setCredentials(res));
      navigate("/");
      toast.success("Login successful");
    } catch (error) {
      console.error("Login failed:", error?.data || error?.error || error);
      toast.error("Login failed. Please check your credentials or try again.");
    }
  };

  return (
    <section className="bg-gray-50 h-[calc(100vh-373px)] flex justify-center items-center">
      <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Sign in to your account
          </h1>
          <form
            className="space-y-4 md:space-y-6"
            action="#"
            onSubmit={handleSubmitLogin}
          >
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your email
              </label>
              <input
                onChange={handleChange}
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="name@company.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <input
                onChange={handleChange}
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="remember" className="text-gray-500">
                    Remember me
                  </label>
                </div>
              </div>
              <Link
                to="#"
                className="text-sm font-medium text-primary-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-[#8d7db3] hover:bg-[#735DA5] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Sign in
            </button>
            <p className="text-sm font-light text-gray-500">
              Don’t have an account yet?{" "}
              <Link
                to="/register"
                className="font-medium text-primary-600 hover:underline"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Loginpage;
