import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100  text-white-400 py-8 mt-4">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row gap-10 md:gap-20 border-b border-gray-300 pb-6 justify-around">
          {/* Locations */}
          <div>
            <h6 className="text-xl font-semibold">Our Locations</h6>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  to="/nepal"
                  className="hover:text-indigo-200 transition"
                >
                  Nepal
                </Link>
              </li>
              <li>
                <Link
                  to="/india"
                  className="hover:text-indigo-200 transition"
                >
                  India
                </Link>
              </li>
              <li>
                <Link
                  to="/bangladesh"
                  className="hover:text-indigo-200 transition"
                >
                  Bangladesh
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h6 className="text-xl font-semibold">Quick Links</h6>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  to="/about"
                  className="hover:text-indigo-200 transition"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="hover:text-indigo-200 transition"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-indigo-200 transition"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h6 className="text-xl font-semibold">Follow Us</h6>
            <div className="flex space-x-4 mt-4">
              <Link to="#" className="hover:text-indigo-200 transition">
                {/* Twitter Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M24 4.557c-.883.392-1.83.656-2.825.775a4.92 4.92 0 0 0 2.165-2.717 9.864 9.864 0 0 1-3.127 1.196 4.92 4.92 0 0 0-8.379 4.482A13.95 13.95 0 0 1 1.671 3.149a4.916 4.916 0 0 0 1.523 6.573A4.902 4.902 0 0 1 .964 9.17v.062a4.918 4.918 0 0 0 3.946 4.827 4.93 4.93 0 0 1-2.212.084 4.924 4.924 0 0 0 4.6 3.42A9.867 9.867 0 0 1 0 19.54a13.94 13.94 0 0 0 7.548 2.212c9.058 0 14.009-7.503 14.009-14.009 0-.213-.005-.426-.015-.637a10.025 10.025 0 0 0 2.459-2.556z" />
                </svg>
              </Link>
              <Link to="#" className="hover:text-indigo-200 transition">
                {/* LinkedIn Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19.994 24V12.945c0-2.42-.646-4.306-3.914-4.306-1.919 0-2.741 1.052-3.207 1.788v-1.54h-3.16c.041 1.032 0 10.113 0 10.113h3.16v-5.61c0-.3.021-.599.109-.814.238-.599.778-1.221 1.685-1.221 1.191 0 1.666.916 1.666 2.254v5.391h3.16zM3.422 8.642c1.086 0 1.962-.886 1.962-1.973s-.876-1.973-1.962-1.973-1.973.887-1.973 1.973.887 1.973 1.973 1.973zM4.977 24v-10.113H1.882V24h3.095zM22.225 0H1.775C.792 0 0 .792 0 1.775v20.451C0 23.208.792 24 1.775 24h20.451C23.208 24 24 23.208 24 22.226V1.775C24 .792 23.208 0 22.225 0z" />
                </svg>
              </Link>
              <Link to="#" className="hover:text-indigo-200 transition">
                {/* YouTube Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.406.593 24 1.325 24h21.351c.732 0 1.325-.593 1.325-1.325V1.325C24 .593 23.406 0 22.675 0zm-14.68 19.44V8.56l10.56 5.44-10.56 5.44z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm mt-6">
          <p>© 2025 YourWebsite. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link
              to="/privacy-policy"
              className="hover:text-indigo-200 transition"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="hover:text-indigo-200 transition"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
