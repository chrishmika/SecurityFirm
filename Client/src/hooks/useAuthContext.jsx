import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { error } from "jquery";

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw error("useAuthcontext must be inside an Authcontextprovider");
  }
  return context;
};
