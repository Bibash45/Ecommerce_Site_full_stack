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
      className="bg-[#735DA5] py-2 sticky top-0 z-50  shadow-lg shadow-[#D3C5E5]"
    >
      {/* Navbar Container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Mobile menu button */}
          {/* <div className="flex items-center sm:hidden">
            <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              <XMarkIcon className="hidden h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div> */}

          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"
              />
              <span className="text-white font-bold ml-2 hidden sm:block">
                Company
              </span>
            </Link>
          </div>

          {/* Search Bar (Always visible and responsive) */}
          <div className="flex items-center flex-grow sm:w-1/3 justify-center  md:justify-around">
            <form className="relative w-full md:max-w-xs flex justify-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="block w-40 md:w-96 rounded-lg border-gray-300 px-3 py-3 pr-10 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                  <MenuButton className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://e0.365dm.com/21/07/768x432/skysports-neymar-la-liga-barcelona_5459434.jpg?20210726203533"
                      alt=""
                    />
                  </MenuButton>
                </div>
                <MenuItems className="absolute -right-10 mt-2 w-44 rounded-l-lg bg-white shadow-lg ring-1 ring-black/5 focus:outline-none cursor-pointer">
                  <MenuItem>
                    {({ active }) => (
                      <Link
                        to="/profile"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        Your Profile
                      </Link>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ active }) => (
                      <Link
                        to="/settings"
                        className={`${classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )} w-full`}
                      >
                        Settings
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
                className="text-white bg-gradient-to-r from-[#D3C5E5] via-[#735DA5] to-[#3c2e5b] hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 shadow-sm mt-1"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {/* <DisclosurePanel className="sm:block">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              className={classNames(
                item.current
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </DisclosurePanel> */}
    </Disclosure>
  );
}
