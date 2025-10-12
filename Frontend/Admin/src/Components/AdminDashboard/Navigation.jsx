import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaAlignJustify,
  FaImagePortrait,
  FaFileLines,
  FaAtom,
  FaBinoculars,
  FaEarthAmericas,
  FaBlackTie,
} from "react-icons/fa6";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";
import { FaCircleUser } from "react-icons/fa6";
import { IoNotifications } from "react-icons/io5";
import { GrSchedule } from "react-icons/gr";
import { motion, AnimatePresence } from "motion/react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const toggleNavigationMenu = () => setIsMenuOpen(!isMenuOpen);
  const handelClick = () => logout();

  ////////add "are you sure you wanna logout" confirmation window

  const navItems = [
    {
      title: "Dashboard",
      icon: <FaAtom className="text-xl" />,
      path: "",
      link: "Dashboard",
    },
    {
      title: "Attendance",
      icon: <FaBinoculars className="text-xl" />,
      path: "attendance",
      link: "Attendance",
    },
    {
      title: "Customers",
      icon: <FaBlackTie className="text-xl" />,
      path: "customers",
      link: "Connections",
    },
    {
      title: "Add Users",
      icon: <FaImagePortrait className="text-xl" />,
      path: "addUsers",
      link: "Connect",
    },
    {
      title: "Applications",
      icon: <FaFileLines className="text-xl" />,
      path: "applications",
      link: "Applications",
    },
    {
      title: "Notifications",
      icon: <IoNotifications className="text-xl" />,
      path: "notifications",
      link: "Notifications",
    },
    {
      title: "Schedule",
      icon: <GrSchedule className="text-xl" />,
      path: "schedule",
      link: "Schedule",
    },
    { title: "Web", icon: <FaEarthAmericas className="text-xl" />, path: "web", link: "Web" },
  ];

  return (
    <div
      className={`bg-[#312F2F] text-white shadow-2xl overflow-clips transition-all duration-300 ease-in-out ${
        isMenuOpen ? "w-50" : "w-14"
      } z-999 `}>
      <div className={`p-2 pt-5 flex flex-col justify-between h-screen`}>
        <div className="">
          <ul className="flex flex-col gap-4 ">
            {/* Menu Toggle */}
            <li
              className="cursor-pointer flex items-center gap-4 ml-1.5 "
              title="menu"
              onClick={toggleNavigationMenu}>
              <FaAlignJustify className="text-2xl" />
              {isMenuOpen && <span className="text-xl p-0 m-0 font-bold -my-2">Dvison</span>}
            </li>

            {/* Navigation Links */}
            {navItems.map(({ title, icon, path, link }) => (
              <li key={path} title={title}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `flex items-center gap-1 p-2 rounded-md ${
                      isActive ? "bg-[#5932EA] text-white" : "hover:bg-[#5a32ea20] "
                    } ${isMenuOpen ? "justify-between pr-4 " : "pr-8 justify-right"}`
                  }
                  onClick={() => screen.width <= 500 && setIsMenuOpen(false)}>
                  <span>{icon}</span>
                  {isMenuOpen && <span className=" -my-2">{link}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Admin & Logout */}
        <div className="mb-5">
          <ul>
            <li className={`mt-auto`} onClick={() => setIsMenuOpen(true)}>
              <div
                className={`bg-[#5932EA] overflow-clip flex flex-col ml-1 p-4 gap-2  ${
                  isMenuOpen ? "block rounded-md" : "w-4 h-5 rounded-full items-center"
                }  `}>
                <span
                  className={`font-semibold text-white -my-3 flex items-center justify-center h-8 ${
                    isMenuOpen ? "hidden" : "block"
                  }`}>
                  <FaCircleUser />
                </span>

                {/* expanded view on logout button */}
                <span
                  className={`font-semibold text-white flex items-center gap-3 ${
                    isMenuOpen ? "block" : "hidden"
                  } `}>
                  {/* {`${user?.name}`} */}
                  {/* <FaCircleUser /> */}
                </span>

                <button
                  className={` bg-white font-bold text-black cursor-pointer rounded-xl p-2 border-[#5932EA] border-2 hover:border-amber-50 ${
                    isMenuOpen ? "block" : "hidden"
                  } `}
                  onClick={() => setConfirmation(true)}>
                  Logout
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <AnimatePresence>
        {confirmation && confirmationWindow(handelClick, setConfirmation)}
      </AnimatePresence>
    </div>
  );
};

export default Navigation;

const confirmationWindow = (handelClick, setConfirmation) => {
  return (
    <motion.div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs bg-opacity-50 z-50 bg-[#0000007c]">
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full relative"
        onClick={(e) => e.stopPropagation()}>
        <div className="fixed inset-0 flex items-center justify-center z-[999]">
          <div className="bg-blue-50 text-black p-6 rounded-2xl shadow-2xl w-80 text-center">
            <h2 className="text-lg font-semibold mb-4">Are you sure you want to log out?</h2>

            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                onClick={handelClick}>
                Yes
              </button>

              <button
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                onClick={() => setConfirmation(false)}>
                No
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
