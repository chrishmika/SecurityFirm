import React from "react";
import DashboardCard from "./Cards/DashboardCard";
import AdminWindow01 from "./Cards/AdminWindow01";

const AdminDashboard = () => {
  return (
    <React.Fragment>
      <div className="gap-10 grid grid-cols-2 md:grid-cols-5 justify-items-center mb-5">
        <DashboardCard />
        <DashboardCard />
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        <AdminWindow01 />
        <AdminWindow01 />
      </div>
    </React.Fragment>
  );
};

export default AdminDashboard;
