import { Outlet } from "react-router-dom";
import Navigation from "../../Components/AdminDashboard/Navigation";

const Admin = () => {
  return (
    <div className="">
      <div className="grid h-screen grid-cols-[auto_1fr] bg-[#FAFBFF]">
        {/* Sidebar */}
        <aside className="w-auto grid md:relative absolute">
          <Navigation />
        </aside>

        {/* Main Content */}
        <main
          className="flex flex-col flex-1 py-10 md:pl-10 pl-18 pr-3 overflow-y-auto justify-start mx-0 my-1 overflow-auto
        "
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Admin;

// http://localhost:5173/dashboard/admindashboard
