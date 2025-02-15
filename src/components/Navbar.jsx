import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalStateContext } from "../context/GlobalStateContext";
import SettingsPage from "../pages/SettingsPage";
import NotificationsIcon from '@mui/icons-material/Notifications';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import notifications from './NotificationToast'
import { useAuthContext } from "../context/AuthContext";

const Navbar = () => {
 
  const { handlelogin, handlelogout, user, setUser } = useAuthContext();
  const { preferences } = useGlobalStateContext();
  const { categories } = preferences;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  // console.log('AuthContext:', { user, handlelogin, handlelogout });

  // const logout = () => {
  //   setUser(null);
  //   localStorage.removeItem("authToken");
  // };


  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };


  return (
    <nav className="bg-red-800 text-white shadow-md relative z-10">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo Section */}
        <div className="flex items-center text-xl font-extrabold text-white">
          <span className="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 3.75h15a2.25 2.25 0 012.25 2.25v12a2.25 2.25 0 01-2.25 2.25h-15A2.25 2.25 0 012.25 18V6A2.25 2.25 0 014.5 3.75zM16.5 9.75v4.5M7.5 9.75v4.5M12 9.75v4.5"
              />
            </svg>
          </span>
          <Link to="/" className="text-white text-3xl font-normal">NewsTech</Link>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={toggleMobileMenu} className="md:hidden text-white focus:outline-none">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          
          </svg>
        </button>

        {/* Navigation Links */}
        <div className={`md:flex space-x-6 ${isMobileMenuOpen ? 'flex flex-col absolute top-full right-0 bg-red-800 w-full p-4' : 'hidden'}`}>
         
          <Link to="/" onClick={closeMobileMenu} className="text-white font-normal hover:underline transition duration-300 py-2 px-4 block md:inline-block">Home</Link>
         
         
          {!isLoading ? (
            user ? (
              <>
                <Link to="/dashboard" onClick={closeMobileMenu}  className="text-white font-normal hover:underline transition duration-300 py-2 block md:inline-block">Dashboard</Link>
                <Link to="/settings" onClick={closeMobileMenu}  className="text-white font-normal hover:underline transition duration-300 py-2 block md:inline-block">Settings</Link>

                <div className="relative">
                  <Link to="/notifications" onClick={closeMobileMenu}  className="text-white block md:inline-block">
                    <Tooltip title="Notifications"> {/* Optional: Add hover text */}
                      <IconButton
                        aria-label="notifications" // Accessibility
                        sx={{
                          color: 'white', // Initial color
                          '&:hover': {
                            color: 'white', // Hover color
                            transform: 'scale(1.1)', // Increase size on hover
                          },
                        }}
                      >
                        <NotificationsIcon />
                      </IconButton>
                    </Tooltip>
                    {notifications.length > 0 && (
                      <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-2">
                        {notifications.length}
                      </span>
                    )}
                  </Link>
                </div>
               
                <button onClick={() => { handlelogout(); closeMobileMenu(); }} className="text-red-800 hover:underline border border-red-800 transition duration-300 bg-white px-4 py-2 font-normal rounded-none focus:outline-none focus:ring-2 focus:ring-red-900 block md:inline-block">Logout</button>
             
              </>
            ) : (
              <div className="flex items-center justify-center space-x-4 mr-0">
                <Link to="/login" onClick={closeMobileMenu} >
                  <button className="text-red-800 hover:underline border border-red-800 transition duration-300 bg-white px-4 py-2 font-normal rounded-none focus:outline-none focus:ring-2 focus:ring-red-900 block md:inline-block">
                    Login
                  </button>
                </Link>
                <Link to="/signup" onClick={closeMobileMenu} >
                  <button className="text-red-800 hover:underline border border-red-800 transition duration-300 bg-white px-4 py-2 font-normal rounded-none focus:outline-none focus:ring-2 focus:ring-red-900 block md:inline-block">
                    Sign Up
                  </button>
                </Link>
              </div>
            )
          ) : (
            <div className="flex items-center justify-center h-48"> {/* Adjust h-48 as needed */}
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
            // <p>Loading...</p>
          )}
        </div>
      </div>
    </nav>
  );


};

export default Navbar;




