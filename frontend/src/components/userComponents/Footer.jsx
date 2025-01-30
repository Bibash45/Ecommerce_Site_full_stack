import React from "react";
import { Link } from "react-router-dom";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100  text-white-400 py-8 ">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Top Section */}
        <div className="flex flex-col items-center text-center md:text-start md:flex-row gap-10 md:gap-20 border-b border-gray-300 pb-6 justify-around">
          {/* Locations */}
          <div>
            <h6 className="text-xl font-semibold">Our Locations</h6>
            <ul className="mt-4 space-y-2">
              <li>
                <p>Nepal</p>
              </li>
              <li>
                <p>India</p>
              </li>
              <li>
                <p>Bangladesh</p>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h6 className="text-xl font-semibold">Quick Links</h6>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/about" className="hover:text-indigo-200 transition">
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
                <FaFacebookSquare size={34} color="#1877F2" />
              </Link>
              <Link to="#" className="hover:text-indigo-200 transition">
                <FaInstagram size={34} color="tomato " />
              </Link>
              <Link to="#" className="hover:text-indigo-200 transition">
                <FaYoutube size={34} color="red" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm mt-6">
          <p>© 2025 EasyStore. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link
              to="/privacy-policy"
              className="hover:text-indigo-200 transition"
            >
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-indigo-200 transition">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
