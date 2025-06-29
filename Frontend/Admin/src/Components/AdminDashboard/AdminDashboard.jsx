import React from "react";
import PieChart from "./Cards/DashboarsCards/PieChart";
import Summary from "./Cards/DashboarsCards/Summary";
import AdminWindow03 from "./Cards/DashboarsCards/AdminWindow03";
import MiniNotificationWindow from "./Cards/DashboarsCards/MiniNotificationWindow";
import AdminWindow05 from "./Cards/DashboarsCards/AdminWindow05";

const AdminDashboard = () => {
  return (
    <React.Fragment>
      <div className="grid grid-cols-6 grid-rows-10 sm:grid-rows-6 sm:grid-cols-9 gap-5 w-full h-screen">
        <div className="col-span-6 row-span-4 sm:col-span-3 sm:row-span-3 overflow-hidden shadow-md rounded-2xl pb-5">
          <PieChart />
        </div>

        <div className="col-span-6 row-span-2 sm:col-span-6 sm:row-span-2 shadow-md rounded-2xl">
          <Summary />
        </div>

        <div className="col-span-2 row-span-4 sm:col-span-3  sm:row-span-4  shadow-md rounded-2xl">
          <AdminWindow03 />
        </div>

        <div className=" col-span-2 row-span-4 sm:col-span-3 sm:row-span-4 shadow-md rounded-2xl">
          <MiniNotificationWindow />
        </div>

        <div className="col-span-2 row-span-4 sm:col-span-3 sm:row-span-3 shadow-md rounded-2xl">
          <AdminWindow05 />
        </div>
      </div>
    </React.Fragment>
  );
};

export default AdminDashboard;
