import { useState, createContext } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext();

export const AuthContexProvider = ({ children }) => {
  const [status, setStatus] = useState("");
  const [user, setUser] = useState();

  return <AuthContext.Provider value={{ status, setStatus, user, setUser }}>{children}</AuthContext.Provider>;
};

AuthContexProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
