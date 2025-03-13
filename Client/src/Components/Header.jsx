import React from 'react';
import { NavLink,Link } from 'react-router-dom';
import Logo from '../assets/logo.png';

const Header = () => {
  return (
    <nav className="bg-gray-800 text-white">
      <div className="flex flex-row justify-between items-center p-4">
        <div>
          <img src="{Logo}" alt="logo" />
        </div>
        <div className="flex flex-row space-x-4">
          <NavLink 
            to="/" 
            className={({ isActive }) =>
              isActive ? 'text-blue-400' : 'text-white hover:text-blue-400 transition duration-300'}
          >
            Home
          </NavLink>
          
          <NavLink 
            to="services" 
            className={({ isActive }) =>
              isActive ? 'text-blue-400' : 'text-white hover:text-blue-400 transition duration-300'}
          >
            Services
          </NavLink>
          <NavLink 
            to="clients" 
            className={({ isActive }) =>
              isActive ? 'text-blue-400' : 'text-white hover:text-blue-400 transition duration-300'}
          >
            Clients
          </NavLink>
          <NavLink 
            to="about" 
            className={({ isActive }) =>
              isActive ? 'text-blue-400' : 'text-white hover:text-blue-400 transition duration-300'}
          >
            About Us
          </NavLink>
          <NavLink 
            to="joinus" 
            className={({ isActive }) =>
              isActive ? 'text-blue-400' : 'text-white hover:text-blue-400 transition duration-300'}
          >
            Join Us
          </NavLink>

          <NavLink 
            to="gethired" 
            className={({ isActive }) =>
              isActive ? 'text-blue-400' : 'text-white hover:text-blue-400 transition duration-300'}
          >
            Get Hired
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Header;
