import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../assets/logo-01.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white text-gray-900 shadow-xl backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and brand */}
          <div className="flex-shrink-0 flex items-center group">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                  isActive 
                    ? 'bg-gradient-to-r from-600 to-700 text-white' 
                    : 'text-gray-700 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200 hover:text-gray-900 hover:shadow-md'
                }`
              }
            >
            <div className="flex-shrink-0 flex items-center group">
            <img 
              src={Logo} 
              alt="Company Logo" 
              className="h-10 w-auto transition-all duration-300 hover:scale-110 hover:drop-shadow-lg filter brightness-110" 
            />
            {/* <span className="ml-3 text-xl font-bold hidden sm:block bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent tracking-wide">
              D-Vision
            </span> */}
            </div> 
            </NavLink>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                  isActive 
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25 ring-2 ring-blue-400/50' 
                    : 'text-gray-700 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200 hover:text-gray-900 hover:shadow-md'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/services"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                  isActive 
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25 ring-2 ring-blue-400/50' 
                    : 'text-gray-700 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200 hover:text-gray-900 hover:shadow-md'
                }`
              }
            >
              Services
            </NavLink>
            <NavLink
              to="/clients"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                  isActive 
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25 ring-2 ring-blue-400/50' 
                    : 'text-gray-700 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200 hover:text-gray-900 hover:shadow-md'
                }`
              }
            >
              Clients
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                  isActive 
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25 ring-2 ring-blue-400/50' 
                    : 'text-gray-700 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200 hover:text-gray-900 hover:shadow-md'
                }`
              }
            >
              About Us
            </NavLink>
            <div className="border-l border-gray-400 h-8 mx-3 opacity-50"></div>
            <NavLink
              to="/joinus"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                  isActive 
                    ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg shadow-green-500/25 ring-2 ring-green-400/50' 
                    : 'text-gray-700 hover:bg-gradient-to-r hover:from-emerald-100 hover:to-green-100 hover:text-green-800 hover:shadow-md hover:shadow-green-500/20'
                }`
              }
            >
              Join Us
            </NavLink>
            <NavLink
              to="/gethired"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                  isActive 
                    ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg shadow-green-500/25 ring-2 ring-green-400/50' 
                    : 'text-gray-700 hover:bg-gradient-to-r hover:from-emerald-100 hover:to-green-100 hover:text-green-800 hover:shadow-md hover:shadow-green-500/20'
                }`
              }
            >
              Get Hired
            </NavLink>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-400 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg 
                className={`h-6 w-6 transition-all duration-300 ${isMenuOpen ? 'hidden rotate-90' : 'block'}`} 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg 
                className={`h-6 w-6 transition-all duration-300 ${isMenuOpen ? 'block rotate-90' : 'hidden'}`} 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-500 ease-in-out backdrop-blur-md ${isMenuOpen ? 'opacity-100 max-h-screen' : 'opacity-0 max-h-0 overflow-hidden'}`}>
        <div className="px-4 pt-3 pb-4 space-y-2 sm:px-6 bg-gradient-to-b from-gray-50/95 to-white/95 border-t border-gray-200/50">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg text-base font-semibold transition-all duration-300 transform hover:scale-105 ${
                isActive 
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25 ring-1 ring-blue-400/50' 
                  : 'text-gray-700 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200 hover:text-gray-900 hover:shadow-md'
              }`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/services"
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg text-base font-semibold transition-all duration-300 transform hover:scale-105 ${
                isActive 
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25 ring-1 ring-blue-400/50' 
                  : 'text-gray-700 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200 hover:text-gray-900 hover:shadow-md'
              }`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Services
          </NavLink>
          <NavLink
            to="/clients"
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg text-base font-semibold transition-all duration-300 transform hover:scale-105 ${
                isActive 
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25 ring-1 ring-blue-400/50' 
                  : 'text-gray-700 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200 hover:text-gray-900 hover:shadow-md'
              }`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Clients
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg text-base font-semibold transition-all duration-300 transform hover:scale-105 ${
                isActive 
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25 ring-1 ring-blue-400/50' 
                  : 'text-gray-700 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200 hover:text-gray-900 hover:shadow-md'
              }`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            About Us
          </NavLink>
          <div className="border-t border-gray-300/50 my-2"></div>
          <NavLink
            to="/joinus"
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg text-base font-semibold transition-all duration-300 transform hover:scale-105 ${
                isActive 
                  ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg shadow-green-500/25 ring-1 ring-green-400/50' 
                  : 'text-gray-700 hover:bg-gradient-to-r hover:from-emerald-100 hover:to-green-100 hover:text-green-800 hover:shadow-md hover:shadow-green-500/20'
              }`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Join Us
          </NavLink>
          <NavLink
            to="/gethired"
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg text-base font-semibold transition-all duration-300 transform hover:scale-105 ${
                isActive 
                  ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg shadow-green-500/25 ring-1 ring-green-400/50' 
                  : 'text-gray-700 hover:bg-gradient-to-r hover:from-emerald-100 hover:to-green-100 hover:text-green-800 hover:shadow-md hover:shadow-green-500/20'
              }`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Get Hired
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Header;