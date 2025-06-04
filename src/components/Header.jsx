import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import { FaCalendarAlt } from "react-icons/fa";

const Header = () => {
  return (
    <header className="bg-[#07332f] shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
              <img src={logo} alt="Logo" className="h-10" />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-white hover:text-[#f7a582] text-sm font-medium"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-white hover:text-[#f7a582] text-sm font-medium"
            >
              About Us
            </Link>
            <div className="relative group">
              <button className="text-white hover:text-[#f7a582] text-sm font-medium flex items-center">
                Services
              </button>
              {/* Optional dropdown */}
            </div>
            <div className="relative group">
              <button className="text-white text-sm font-medium flex items-center">
                Pages
              </button>
              {/* Optional dropdown */}
            </div>
            <Link
              to="/contact"
              className="text-white hover:text-[#f7a582] text-sm font-medium"
            >
              Contact Us
            </Link>
          </nav>

          {/* Book Appointment Button */}
          <div className="hidden md:block">
            <Link
              to="/appointment"
              className="border border-[#f7a582] text-[#f7a582] px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-2 hover:bg-[#f7a582] hover:text-white transition"
            >
              <span>Book Appointment</span>
              <FaCalendarAlt className="text-sm" />
            </Link>
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <button className="text-white focus:outline-none">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
