import React from "react";
import PropTypes from "prop-types";
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import { PuffLoader } from "react-spinners";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//admin import
import LayoutAdmin from "./Layout/LayoutAdmin";
import Admin from "./Pages/admin/Admin";
import AttendanceView from "./Components/AdminDashboard/AttendanceView";
import AddCompany from "./Components/AdminDashboard/AddCompany";
import AddEmployee from "./Components/AdminDashboard/AddEmployee";
import AdminDashboard from "./Components/AdminDashboard/AdminDashboard";
import ApplicationsView from "./Components/AdminDashboard/ApplicationsView";
import Web from "./Components/AdminDashboard/Web";
import User from "./Pages/user/User";

//login import
import Login from "./Pages/auth/Login";

import NotFound from "./Pages/notFound/NotFound";
import { useEffect } from "react";
import Notifications from "./Components/AdminDashboard/Notifications";

//conditional routings
const SignInRedirect = () => {
  const { user } = useAuthContext();
  return user ? <Navigate to="/dashboard/admin/dashboard" /> : <Login />;
};

//conditional routings
const NotSignInRedirect = ({ children }) => {
  const { user } = useAuthContext();
  return user ? children : <Navigate to="/login" />;
};

//prop validation for children
NotSignInRedirect.propTypes = {
  children: PropTypes.node.isRequired,
};

//routings that related with website
const webRouter = createBrowserRouter(
  createRoutesFromElements(
    <React.Fragment>
      <Route path="/login" element={<SignInRedirect />} />
      <Route
        path="/dashboard"
        element={
          <NotSignInRedirect>
            <LayoutAdmin />
          </NotSignInRedirect>
        }
      >
        <Route path="admin" element={<Admin />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="attendance" element={<AttendanceView />} />
          <Route path="customers" element={<AddCompany />} />
          <Route path="employees" element={<AddEmployee />} />
          <Route path="applications" element={<ApplicationsView />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="web" element={<Web />} />
        </Route>
      </Route>
      <Route path="/user" element={<User />} /> {/* user Routes irusha is creating on mobile app sides*/}
      <Route path="*" element={<NotFound />} />
    </React.Fragment>
  )
);

const App = () => {
  const { isLoading } = useAuthContext();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <PuffLoader />
      </div>
    );
  }

  return (
    <>
      {<ToastContainer position="top-right" autoClose={3000} />}
      <RouterProvider router={webRouter} />
    </>
  );
};

export default App;
