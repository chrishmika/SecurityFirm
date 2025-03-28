import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthContexProvider = ({ children }) => {
  const [status, setStatus] = useState("");
  const [user, setUser] = useState();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      setStatus("LOGIN");
      setUser(user);
    }
  }, [setUser]);

  return <AuthContext.Provider value={{ status, setStatus, user, setUser }}>{children}</AuthContext.Provider>;
};

AuthContexProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
