import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaAlignJustify, FaImagePortrait, FaFileLines, FaAtom, FaBinoculars, FaEarthAmericas, FaBlackTie, FaAlignLeft } from "react-icons/fa6";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";
import { FaCircleUser } from "react-icons/fa6";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const toggleNavigationMenu = () => setIsMenuOpen(!isMenuOpen);
  const handelClick = () => logout();

  ////////add "are you sure you wanna logout" confirmation window
  const Confirmation = () => {
    return <div></div>;
  };

  const navItems = [
    { icon: <FaAtom className="text-2xl" />, path: "dashboard", link: "Dashboard" },
    { icon: <FaBinoculars className="text-2xl" />, path: "attendance", link: "Attendance" },
    { icon: <FaBlackTie className="text-2xl" />, path: "customers", link: "Customers" },
    { icon: <FaImagePortrait className="text-2xl" />, path: "employees", link: "Employees" },
    { icon: <FaFileLines className="text-2xl" />, path: "applications", link: "Applications" },
    { icon: <FaEarthAmericas className="text-2xl" />, path: "web", link: "Web" },
  ];

  return (
    <div className={`bg-white h-[100vh] shadow-2xl transition-all duration-300 ease-in-out ${isMenuOpen ? "w-64" : "w-16"}`}>
      <div className={`p-4 pt-10 transition-all duration-350 ease-in-out ${isMenuOpen ? "w-64" : "w-16"} `}>
        <ul className="flex flex-col gap-8 ">
          {/* Menu Toggle */}
          <li className="cursor-pointer flex items-center gap-4 ml-1.5" onClick={toggleNavigationMenu}>
            {isMenuOpen ? <FaAlignLeft className="text-3xl" /> : <FaAlignJustify className="text-3xl" />}
            {isMenuOpen && <span className="text-2xl font-bold ">Dvison</span>}
          </li>

          {/* Navigation Links */}
          {navItems.map(({ icon, path, link }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) => `flex items-center gap-4 p-2 rounded-md ${isActive ? "bg-blue-400 text-white" : "hover:bg-blue-300 text-[#282828dd]"} ${isMenuOpen ? "justify-between pr-4 " : "pr-8 justify-right"}`}
                onClick={() => screen.width <= 500 && setIsMenuOpen(false)}
              >
                <span>{icon}</span>
                {isMenuOpen && <span>{link}</span>}
              </NavLink>
            </li>
          ))}

          {/* Admin & Logout */}
          <li className={` mt-auto `}>
            <div className={`bg-gray-800 flex flex-col ml-1 p-4 gap-2 ${isMenuOpen ? "block rounded-md" : "w-5 h-5 rounded-full items-center"}  `}>
              <span className={`font-semibold text-white flex items-center gap-3 ${isMenuOpen ? "block" : "hidden"}`}>
                <FaCircleUser className="" />
                {user.nic}
              </span>
              <span className={`font-semibold text-white -my-3 flex items-center justify-center h-8 ${isMenuOpen ? "hidden" : "block"}`}>
                <FaCircleUser />
              </span>
              <button className={`bg-white rounded-xl p-2 hover:bg-gray-200 ${isMenuOpen ? "block" : "hidden"} `} onClick={handelClick}>
                Logout
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
