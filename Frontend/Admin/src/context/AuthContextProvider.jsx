import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";

export const AuthContexProvider = ({ children }) => {
  const [status, setStatus] = useState("");
  const [user, setUser] = useState();
  const [isLoading, SetLoading] = useState(true);
  const [authError, setAuthError] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("/api/auth/me", { withCredentials: true });
        console.log(res.data);

        setUser(res.data);
      } catch (error) {
        console.error(`User not logged in ${error}`);
      } finally {
        SetLoading(false);
      }
    })();
  }, []);

  return (
    <AuthContext.Provider
      value={{ status, setStatus, user, setUser, isLoading, SetLoading, setAuthError, authError }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthContexProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
