import React from "react";
import DashboardCard from "./DashboardCard";

const AdminDashboard = () => {
  return (
    <>
      <div className=" md:mx-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 justify-items-center  ">
        <DashboardCard key={1} name={`Present`} data={25} />
        <DashboardCard key={2} name={`Off`} data={2} />
        <DashboardCard key={3} name={`Late`} data={5} />
        <DashboardCard key={5} name={`Working`} data={125} />
        <DashboardCard key={6} name={`Clients`} data={12} />
      </div>
    </>
  );
};

export default AdminDashboard;
