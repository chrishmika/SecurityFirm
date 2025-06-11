import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../assets/logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo - remains visible at all screen sizes */}
          <div className="flex-shrink-0">
            <img src={Logo} alt="logo" className="h-8 w-auto" />
          </div>
          
          {/* Desktop Navigation - hidden on mobile */}
          <div className="hidden md:flex space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'text-blue-400' : 'text-white hover:text-blue-400 transition duration-300'
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/services"
              className={({ isActive }) =>
                isActive ? 'text-blue-400' : 'text-white hover:text-blue-400 transition duration-300'
              }
            >
              Services
            </NavLink>
            <NavLink
              to="/clients"
              className={({ isActive }) =>
                isActive ? 'text-blue-400' : 'text-white hover:text-blue-400 transition duration-300'
              }
            >
              Clients
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? 'text-blue-400' : 'text-white hover:text-blue-400 transition duration-300'
              }
            >
              About Us
            </NavLink>
            <NavLink
              to="/joinus"
              className={({ isActive }) =>
                isActive ? 'text-blue-400' : 'text-white hover:text-blue-400 transition duration-300'
              }
            >
              Join Us
            </NavLink>
            <NavLink
              to="/gethired"
              className={({ isActive }) =>
                isActive ? 'text-blue-400' : 'text-white hover:text-blue-400 transition duration-300'
              }
            >
              Get Hired
            </NavLink>
          </div>
          
          {/* Mobile Menu Button - only visible on mobile */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              <svg 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                ) : (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 6h16M4 12h16M4 18h16" 
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu - toggles based on isMenuOpen state */}
      {isMenuOpen && (
        <div className="md:hidden px-2 pt-2 pb-4 space-y-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block px-3 py-2 rounded ${isActive ? 'bg-gray-900 text-blue-400' : 'text-white hover:bg-gray-700'}`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/services"
            className={({ isActive }) =>
              `block px-3 py-2 rounded ${isActive ? 'bg-gray-900 text-blue-400' : 'text-white hover:bg-gray-700'}`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Services
          </NavLink>
          <NavLink
            to="/clients"
            className={({ isActive }) =>
              `block px-3 py-2 rounded ${isActive ? 'bg-gray-900 text-blue-400' : 'text-white hover:bg-gray-700'}`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Clients
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `block px-3 py-2 rounded ${isActive ? 'bg-gray-900 text-blue-400' : 'text-white hover:bg-gray-700'}`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            About Us
          </NavLink>
          <NavLink
            to="/joinus"
            className={({ isActive }) =>
              `block px-3 py-2 rounded ${isActive ? 'bg-gray-900 text-blue-400' : 'text-white hover:bg-gray-700'}`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Join Us
          </NavLink>
          <NavLink
            to="/gethired"
            className={({ isActive }) =>
              `block px-3 py-2 rounded ${isActive ? 'bg-gray-900 text-blue-400' : 'text-white hover:bg-gray-700'}`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Get Hired
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Header;