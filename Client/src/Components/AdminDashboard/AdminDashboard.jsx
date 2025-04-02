import React from "react";
import DashboardCard from "./Cards/DashboardCard";
import AdminWindow01 from "./Cards/AdminWindow01";

const AdminDashboard = () => {
  return (
    <React.Fragment>
      <div className="not-md:gap-4 gap-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 justify-items-center mb-5 mx-0">
        <DashboardCard key={4} name={`Working`} data={125} />
        <DashboardCard key={5} name={`Clients`} data={12} />
        <DashboardCard key={1} name={`Present`} data={25} />
        <DashboardCard key={2} name={`Off`} data={2} />
        <DashboardCard key={3} name={`Late`} data={5} />
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        <AdminWindow01 />
        <AdminWindow01 />
      </div>
    </React.Fragment>
  );
};

export default AdminDashboard;
