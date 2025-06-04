import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaAlignJustify, FaImagePortrait, FaFileLines, FaAtom, FaBinoculars, FaEarthAmericas, FaBlackTie } from "react-icons/fa6";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";
import { FaCircleUser } from "react-icons/fa6";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const toggleNavigationMenu = () => setIsMenuOpen(!isMenuOpen);
  const handelClick = () => logout();

  // useEffect(() => {
  //   const handleResize = () => {
  //     // 768px is the 'md' breakpoint in Tailwind
  //     if (window.innerWidth < 768) {
  //       setIsMenuOpen(false);
  //     } else {
  //       setIsMenuOpen(true);
  //     }
  //   };

  // handleResize();

  // Add event listener for window resize
  // window.addEventListener("resize", handleResize);

  // Clean up the event listener on unmount
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  ////////add "are you sure you wanna logout" confirmation window

  const Confirmation = () => {
    return <div></div>;
  };

  const navItems = [
    { title: "Dashboard", icon: <FaAtom className="text-xl" />, path: "dashboard", link: "Dashboard" },
    { title: "Attendance", icon: <FaBinoculars className="text-xl" />, path: "attendance", link: "Attendance" },
    { title: "Customers", icon: <FaBlackTie className="text-xl" />, path: "customers", link: "Customers" },
    { title: "Employees", icon: <FaImagePortrait className="text-xl" />, path: "employees", link: "Employees" },
    { title: "Applications", icon: <FaFileLines className="text-xl" />, path: "applications", link: "Applications" },
    { title: "Web", icon: <FaEarthAmericas className="text-xl" />, path: "web", link: "Web" },
  ];

  return (
    <div className={`bg-[#312F2F] text-white shadow-2xl transition-all duration-300 ease-in-out ${isMenuOpen ? "w-50" : "w-14"} z-999 `}>
      <div className={`p-2 pt-5 flex flex-col justify-between h-screen`}>
        <div className="">
          <ul className="flex flex-col gap-4 ">
            {/* Menu Toggle */}
            <li className="cursor-pointer flex items-center gap-4 ml-1.5 " title="menu" onClick={toggleNavigationMenu}>
              {<FaAlignJustify className="text-2xl" />}
              {isMenuOpen && <span className="text-xl font-bold ">Dvison</span>}
            </li>

            {/* Navigation Links */}
            {navItems.map(({ title, icon, path, link }) => (
              <li key={path} title={title}>
                <NavLink to={path} className={({ isActive }) => `flex items-center gap-1 p-2 rounded-md ${isActive ? "bg-[#5932EA] text-white" : "hover:bg-[#5a32ea20] "} ${isMenuOpen ? "justify-between pr-4 " : "pr-8 justify-right"}`} onClick={() => screen.width <= 500 && setIsMenuOpen(false)}>
                  <span>{icon}</span>
                  {isMenuOpen && <span>{link}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Admin & Logout */}
        <div className="mb-5">
          <ul>
            <li className={`mt-auto`} onClick={() => setIsMenuOpen(true)}>
              <div className={`bg-[#5932EA] flex flex-col ml-1 p-4 gap-2 ${isMenuOpen ? "block rounded-md" : "w-4 h-5 rounded-full items-center"}  `}>
                <span className={`font-semibold text-white flex items-center  gap-3 ${isMenuOpen ? "block" : "hidden"} `}>
                  <FaCircleUser />
                  {`${user.nic}`}
                </span>

                <span className={`font-semibold text-white -my-3 flex items-center justify-center h-8 ${isMenuOpen ? "hidden" : "block"}`}>
                  <FaCircleUser />
                </span>

                {/*<button className={`bg-white text-black cursor-pointer rounded-xl p-2 hover:bg-[#5a32eae0] hover:text-white ${isMenuOpen ? "block" : "hidden"} `} onClick={handelClick}>*/}
                <button className={`bg-white text-black cursor-pointer rounded-xl p-2 border-[#5932EA] border-2 hover:border-amber-50 ${isMenuOpen ? "block" : "hidden"} `} onClick={handelClick}>
                  Logout
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
