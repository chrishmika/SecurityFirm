import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../../Components/AdminDashboard/Navigation";

const Admin = () => {
  return (
    <div className="grid h-[100vh] grid-cols-[auto_1fr]  bg-[#00000005]">
      {/* Sidebar */}
      <div className="w-auto grid md:relative absolute">
        <Navigation />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 md:pl-10 pl-20 overflow-y-auto flex flex-col items-start justify-start">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;

// http://localhost:5173/dashboard/admindashboard
