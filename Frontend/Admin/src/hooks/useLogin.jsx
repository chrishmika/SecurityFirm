import { useState } from "react";
// import { Notify } from "../Components/AdminDashboard/Notifications/Notification";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";
// import "react-toastify/dist/ReactToastify.css";

const useLogin = () => {
  const [error, setError] = useState(null);
  const { setStatus, setUser, SetLoading, setAuthError } = useAuthContext();

  const Login = async (NIC, password) => {
    setError(null);

    const loginData = { NIC, password };
    try {
      SetLoading(true);
      const response = await axios.post("/api/auth/login", loginData, { withCredentials: true });

      setStatus("LOGIN");
      setUser(response.data);
      SetLoading(false);
    } catch (error) {
      SetLoading(false);

      const errMsg = error.response?.data?.error || "Login failed";

      return;
    }

    return;
  };
  return { Login, error };
};

export default useLogin;
