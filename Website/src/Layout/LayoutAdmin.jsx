import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const LayoutAdmin = () => {
  return (
    <React.Fragment>
      <Outlet />
      <ToastContainer />
    </React.Fragment>
  );
};

export default LayoutAdmin;
