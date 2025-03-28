import React from "react";
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

//website imports
import Layout from "./Layout/LayoutWeb";
import AboutUs from "./Pages/AboutUs";
import Clients from "./Pages/Clients";
import Services from "./Pages/Services";
import JoinUs from "./Pages/JoinUs";
import Home from "./Pages/Home";
import GetHired from "./Pages/GetHired";
import JobApplyForm from "./Components/Application Forms/JobApplyForm";
//admin import
import LayoutAdmin from "./Layout/LayoutAdmin";
import Admin from "./Pages/AdminPages/Admin";
import AttendanceView from "./Components/AdminDashboard/AttendanceView";
import AddCompany from "./Components/AdminDashboard/AddCompany";
import AddEmployee from "./Components/AdminDashboard/AddEmployee";
import AdminDashboard from "./Components/AdminDashboard/AdminDashboard";
import ApplicationsView from "./Components/AdminDashboard/ApplicationsView";
import Web from "./Components/AdminDashboard/Web";
import User from "./Pages/UserPages/User";
//signin import
import SignIn from "./Pages/UserPages/SignIn";
import NotFound from "./Pages/AdminPages/NotFound";
import PropTypes from "prop-types";

//conditional routings
const SignInRedirect = () => {
  const { user } = useAuthContext();
  return user ? <Navigate to="/dashboard/admindashboard/dashboard" /> : <SignIn />;
};

//conditional routings
const NotSignInRedirect = ({ children }) => {
  const { user } = useAuthContext();
  return user ? children : <Navigate to="/signin" />;
};

//prop validation for children
NotSignInRedirect.propTypes = {
  children: PropTypes.node.isRequired,
};

//routings that related with website
const webRouter = createBrowserRouter(
  createRoutesFromElements(
    <React.Fragment>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="services" element={<Services />} />
        <Route path="clients" element={<Clients />} />
        <Route path="joinus" element={<JoinUs />}>
          <Route path="jobapply" element={<JobApplyForm />} />
        </Route>
        <Route path="gethired" element={<GetHired />} />
      </Route>
      {/**sign in router*/} {/**this Route is protected with conditional routings */}
      <Route path="/signin" element={<SignInRedirect />} />
      {/*Admin Routes*/}
      {/*this Route is protected with conditional routings */}
      <Route
        path="/dashboard"
        element={
          <NotSignInRedirect>
            <LayoutAdmin />
          </NotSignInRedirect>
        }
      >
        <Route path="admindashboard" element={<Admin />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="attendance" element={<AttendanceView />} />
          <Route path="customers" element={<AddCompany />} />
          <Route path="employees" element={<AddEmployee />} />
          <Route path="applications" element={<ApplicationsView />} />
          <Route path="web" element={<Web />} />
        </Route>
      </Route>
      {/* user Routes irusha is creating on mobile app sides*/}
      <Route path="/user" element={<User />} />
      {/* Fallback Route */}
      <Route path="*" element={<NotFound />} />
    </React.Fragment>
  )
);

const App = () => {
  return <RouterProvider router={webRouter} />;
};

export default App;
