import { Outlet } from "react-router-dom";
import Navigation from "../../Components/AdminDashboard/Navigation";

const Admin = () => {
  return (
    <div className="grid h-screen grid-cols-[auto_1fr]  bg-[#00000005]">
      {/* Sidebar */}
      <aside className="w-auto grid md:relative absolute">
        <Navigation />
      </aside>

      {/* Main Content */}
      <main className="flex-1 py-10 md:pl-10 pl-18 pr-3 overflow-y-auto flex flex-col items-start justify-start">
        <Outlet />
      </main>
    </div>
  );
};

export default Admin;

// http://localhost:5173/dashboard/admindashboard
