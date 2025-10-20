import React from "react";
import PropTypes from "prop-types";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import { ClipLoader } from "react-spinners";
import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

//admin import
import LayoutAdmin from "./Layout/LayoutAdmin";
import Admin from "./Pages/admin/Admin";
import AttendanceView from "./Components/AdminDashboard/AttendanceView";
import ShowCustomers from "./Components/AdminDashboard/ShowCustomers";
import AddUsers from "./Components/AdminDashboard/AddUsers";
import AdminDashboard from "./Components/AdminDashboard/AdminDashboard";
import ApplicationsView from "./Components/AdminDashboard/ApplicationsView";
import Schedule from "./Components/AdminDashboard/Schedule.jsx";
import Web from "./Components/AdminDashboard/Web";

//login import
import Login from "./Pages/auth/Login";

import NotFound from "./Pages/error/NotFound.jsx";
import Notifications from "./Components/AdminDashboard/Notifications";
import { styles1 as styles } from "./Components/styles/loginStyles.js";

//conditional routings
const SignInRedirect = () => {
  const { user } = useAuthContext();
  return user ? <Navigate to="/" /> : <Login />;
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
        path="/"
        element={
          <NotSignInRedirect>
            <LayoutAdmin />
          </NotSignInRedirect>
        }>
        <Route path="/" element={<Admin />}>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="attendance" element={<AttendanceView />} />
          <Route path="customers" element={<ShowCustomers />} />
          <Route path="addUsers" element={<AddUsers />} />
          <Route path="applications" element={<ApplicationsView />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="web" element={<Web />} />
        </Route>
      </Route>
      {/* add user Routes which irusha is creating on mobile app sides on deploying*/}
      <Route path="*" element={<NotFound />} />
    </React.Fragment>
  )
);

const App = () => {
  const { isLoading } = useAuthContext();

  if (isLoading) {
    return (
      <div className={`flex justify-center items-center h-screen`} style={styles.loginBackground}>
        <ClipLoader />
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
