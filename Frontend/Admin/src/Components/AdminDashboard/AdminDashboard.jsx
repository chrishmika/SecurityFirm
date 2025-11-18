import React from "react";
import PieChart from "./Cards/DashboarsCards/PieChart";
import Summary from "./Cards/DashboarsCards/Summary";
import AdminWindow03 from "./Cards/DashboarsCards/AdminWindow03";
import MiniNotificationWindow from "./Cards/DashboarsCards/MiniNotificationWindow";
import AdminWindow05 from "./Cards/DashboarsCards/AdminWindow05";

const AdminDashboard = () => {
  return (
    <React.Fragment>
      <div className="grid grid-cols-1 lg:grid-cols-9 gap-4 p-4 auto-rows-auto lg:grid-rows-4 max-h-screen ">
        {/* PieChart – 3 cols on lg */}
        <div className="col-span-1 lg:col-span-3 lg:row-span-2 bg-white rounded-2xl shadow-md p-4">
          <PieChart />
        </div>

        {/* Summary – 6 cols on lg */}
        <div className="col-span-1 lg:col-span-6 lg:row-span-1 bg-white rounded-2xl shadow-md p-4">
          <Summary />
        </div>

        {/* AdminWindow05 – bottom row, 3 cols on lg */}
        <div className="col-span-1 lg:col-span-3 lg:row-span-3 bg-white rounded-2xl shadow-md p-4">
          <AdminWindow05 />
        </div>

        {/* MiniNotificationWindow – bottom row, 3 cols on lg */}
        <div className="col-span-1 lg:col-span-3 lg:row-span-3 bg-white rounded-2xl shadow-md p-4 ">
          <MiniNotificationWindow />
        </div>

        {/* AdminWindow03 – bottom row, 3 cols on lg */}
        <div className="col-span-1 lg:col-span-3 lg:row-span-2 bg-white rounded-2xl shadow-md p-4">
          <AdminWindow03 />
        </div>
      </div>
    </React.Fragment>
  );
};

export default AdminDashboard;
