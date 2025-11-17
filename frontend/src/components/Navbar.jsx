import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const {user, logout} = React.useContext(AuthContext);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition">
            Notes App
          </Link>

          {/* Desktop Menu */}
          <div className="hidden sm:flex space-x-6">

            {user ? (<>
              <Link 
              to="/dashboard" 
              className="bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700 transition font-medium shadow">
              Dashboard
            </Link>
            <Link 
              to="/profile" 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium shadow">
              Profile
            </Link>
            <button 
              onClick={logout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition font-medium shadow">
              Logout
            </button>
            <span className="bg-orange-400 text-black px-4 py-2 rounded-lg hover:bg-orange-500 transition font-medium shadow">
              Welcome {user.username} !
            </span>


            </> ) : ( <>
            <Link 
              to="/login" 
              className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition font-medium shadow">
              Login
            </Link>
            <Link 
              to="/register" 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium shadow">
              Register
            </Link>

            </> )}
            
          </div>


          {/* Mobile Menu Button (Simple Hamburger) */}
            <button 
            className="sm:hidden focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}>
            <div className="space-y-1.5">
                <span className="block h-1 w-6 bg-gray-700"></span>
                <span className="block h-1 w-6 bg-gray-700"></span>
                <span className="block h-1 w-6 bg-gray-700"></span>
            </div>
            </button>
        </div>
      </div>
    
    {/* Mobile Menu Links */}
      {menuOpen && (
        <div className="sm:hidden bg-white shadow-md border-t">

        {user ? (<>
        <Link 
    to="/dashboard" 
    className="block px-4 py-3 text-black hover:bg-gray-200 transition"
    onClick={() => setMenuOpen(false)}>
    Dashboard
    </Link>

    <Link 
    to="/profile" 
    className="block px-4 py-3 text-black hover:bg-gray-200 transition"
    onClick={() => setMenuOpen(false)}>
    Profile
    </Link>

    <button
        onClick={() => {logout(); setMenuOpen(false);}}
        className="block w-full text-left px-4 py-3 text-red-600 hover:bg-red-100 transition">
        Logout
    </button>
    <span className="block px-4 py-3 text-black font-medium bg-orange-400 hover:bg-orange-500 transition">
  Welcome {user.username} !
</span>

    </> ) : ( <>
    <Link 
      to="/login" 
      className="block px-4 py-3 text-black hover:bg-gray-200 transition"
      onClick={() => setMenuOpen(false)}>
      Login
    </Link>

    <Link 
      to="/register" 
      className="block px-4 py-3 text-black hover:bg-gray-200 transition"
      onClick={() => setMenuOpen(false)}>
      Register
    </Link>
    </> )}
  </div>
)}
    </nav>
  );
};
