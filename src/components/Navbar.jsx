import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalStateContext } from "../context/GlobalStateContext";
import SettingsPage from "../pages/SettingsPage";
import NotificationsIcon from '@mui/icons-material/Notifications';
import notifications from './NotificationToast'
import { useAuthContext } from "../context/AuthContext";

const Navbar = () => {
 
  const { handlelogin, handlelogout, user, setUser } = useAuthContext();
  const { preferences } = useGlobalStateContext();
  const { categories } = preferences;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  console.log('AuthContext:', { user, handlelogin, handlelogout });

  // const logout = () => {
  //   setUser(null);
  //   localStorage.removeItem("authToken");
  // };


  return (
    <nav className="bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo Section */}
        <div className="flex items-center text-xl font-extrabold text-white">
          <span className="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
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
          <Link to="/" className="hover:text-gray-200 transition duration-300">Home</Link>
          {!isLoading ? (
            user ? (
              <>
                <Link to="/dashboard" className="hover:text-gray-200 transition duration-300">Dashboard</Link>
                <Link to="/settings" className="hover:text-gray-200 transition duration-300">Settings</Link>

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
                <button onClick={handlelogout} className="hover:text-gray-200 transition duration-300">Logout</button>
              </>
            ) : (
              <div>
                <Link to="/login">
                  <button className="hover:text-gray-200 transition duration-300 bg-blue-500 text-white px-4 py-2 rounded-md">
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="hover:text-gray-200 transition duration-300 bg-blue-500 text-white px-4 py-2 rounded-md">
                    Sign Up
                  </button>
                </Link>
              </div>
            )
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;




