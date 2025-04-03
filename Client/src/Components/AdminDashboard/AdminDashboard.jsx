import React from "react";
import AdminWindow01 from "./Cards/AdminWindow01";
import AdminWindow02 from "./Cards/AdminWindow02";
import AdminWindow03 from "./Cards/AdminWindow03";
import AdminWindow04 from "./Cards/AdminWindow04";

const AdminDashboard = () => {
  return (
    <React.Fragment>
      <div className="grid grid-cols-4 grid-rows-4 sm:grid-rows-3 gap-5 w-full h-screen">
        <div className="col-span-4 md:col-span-1 sm:row-span-3 row-span-2 overflow-hidden shadow-md rounded-2xl pb-5">
          <AdminWindow01 />
        </div>
        <div className="col-span-2 sm:col-span-3 row-span-1 shadow-md rounded-2xl">
          <AdminWindow02 />
        </div>
        <div className="sm:col-span-1 col-span-2 sm:row-span-2 row-span-3 shadow-md rounded-2xl">
          <AdminWindow03 />
        </div>
        <div className="sm:col-span-1 col-span-2 row-span-2 shadow-md rounded-2xl">
          <AdminWindow04 />
        </div>
        <div className="col-span-1 row-span-2 sm:block hidden shadow-md rounded-2xl">
          <AdminWindow02 />
        </div>
      </div>
    </React.Fragment>
  );
};

export default AdminDashboard;
