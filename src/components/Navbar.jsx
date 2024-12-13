import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalStateContext } from "../context/GlobalStateContext";

import NotificationsIcon from '@mui/icons-material/Notifications';
import notifications from './NotificationToast'

const Navbar = () => {
  const { user, preferences, setUser } = useGlobalStateContext();
  const { categories } = preferences;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authToken");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
       



<div className="flex items-center text-xl font-extrabold text-white">
  <span className="mr-2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 3.75h15a2.25 2.25 0 012.25 2.25v12a2.25 2.25 0 01-2.25 2.25h-15A2.25 2.25 0 012.25 18V6A2.25 2.25 0 014.5 3.75zM16.5 9.75v4.5M7.5 9.75v4.5M12 9.75v4.5"
      />
    </svg>
  </span>
  <Link to="/">NewsApp</Link>
</div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/"
            className="hover:text-gray-200 transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className="hover:text-gray-200 transition duration-300"
          >
            Dashboard
          </Link>

          </div> 
         

        {/* Notification-icon */}
        <div className="relative">
  <Link to="/notifications" className="hover:text-gray-200">
    <NotificationsIcon />
    {notifications.length > 0 && (
      <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-2">
        {notifications.length}
      </span>
    )}
  </Link>
</div>
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden bg-gray-200 text-blue-500 p-2 rounded-full focus:outline-none"
          aria-label="Toggle Menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-blue-600 text-white p-4">
          <div className="flex flex-col space-y-2">
            <Link
              to="/"
              className="hover:bg-blue-700 px-4 py-2 rounded-md transition duration-300"
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className="hover:bg-blue-700 px-4 py-2 rounded-md transition duration-300"
            >
              Dashboard
            </Link>
           
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

