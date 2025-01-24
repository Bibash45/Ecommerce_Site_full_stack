import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { LuShoppingCart } from "react-icons/lu";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../features/userApiSlice";
import { logoutf } from "../../features/authSlice";
import { toast } from "react-toastify";

const navigation = [
  { name: "Dashboard", to: "/", current: true },
  { name: "Team", to: "/team", current: false },
  { name: "Projects", to: "/projects", current: false },
  { name: "Calendar", to: "/calendar", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout, { isLoading }] = useLogoutMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const handleLogOut = async (e) => {
    e.preventDefault();
    try {
      const res = await logout();
      dispatch(logoutf());
      navigate("/login");
    } catch (error) {
      toast.error("logout failed");
      console.log("Error logging out:");
    }
  };

  return (
    <Disclosure
      as="nav"
      className="bg-[#735DA5] py-2 sticky top-0 z-50  shadow-md shadow-[#D3C5E5]"
    >
      {/* Navbar Container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center">
              <img
                className="h-10 w-auto"
                src="https://www.e-capinfo.com/wp-content/uploads/2018/10/pictos_easystore.png"
                alt="Your Company"
              />
              <span className="text-white font-bold ml-2 hidden sm:block  tracking-widest">
                EasyStore
              </span>
            </Link>
          </div>

          {/* Search Bar (Always visible and responsive) */}
          <div className="flex items-center flex-grow sm:w-1/3 justify-center  md:justify-around">
            <form className="relative w-full md:max-w-xs flex justify-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search product here..."
                  className="block w-40 md:w-96 rounded-lg border-gray-300 px-3 py-3 pr-10 shadow-sm focus:border-[#735DA5] focus:ring-[#735DA5] sm:text-sm"
                />
                <button
                  type="submit"
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 19l-4-4m0-7a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>

          {/* Right section (Profile + Bell Icon) */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon */}
            <Link to="/cart" className="relative">
              <button
                type="button"
                className="relative rounded-full p-2 text-gray-300 hover:text-white "
              >
                <LuShoppingCart className="h-6 w-6" aria-hidden="true" />
              </button>
              {cartItems.length ? (
                <div className="absolute text-[#53427d] bg-white rounded-full top-0 right-0 h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </div>
              ) : (
                ""
              )}
            </Link>

            {/* Profile Dropdown */}
            {userInfo && userInfo.user ? (
              <Menu as="div" className="relative">
                <div>
                  <MenuButton className="flex rounded-full bg-white text-sm  ">
                    <img
                      className="h-[38px] w-[38px] rounded-full object-contain object-center "
                      src={`http://localhost:5000/${userInfo.user.image}`}
                      alt=""
                    />
                  </MenuButton>
                </div>
                <MenuItems className=" border-1.5 border-black absolute -right-10 mt-2 w-44 rounded-lg bg-white shadow-lg ring-1 ring-black/5 focus:outline-none cursor-pointer">
                  <MenuItem>
                    {({ active }) => (
                      <Link
                        to="/profile"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        Profile
                      </Link>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ active }) => (
                      <Link
                        to="/myorders"
                        className={`${classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )} w-full`}
                      >
                        My orders
                      </Link>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ active }) => (
                      <button
                        onClick={handleLogOut}
                        className={`${classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )} w-full text-start`}
                      >
                        Sign out
                      </button>
                    )}
                  </MenuItem>
                </MenuItems>
              </Menu>
            ) : (
              <Link
                to="/login"
                type="button"
                className="text-white font-semibold bg-gradient-to-r from-[#ffde21] via-[#e0bc00] to-[#ffde21] hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300  rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 shadow-sm mt-1"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </Disclosure>
  );
}
