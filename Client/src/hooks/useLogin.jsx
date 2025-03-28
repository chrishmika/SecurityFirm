import { useState } from "react";
import axios from "axios";
import { Notify } from "../Components/AdminDashboard/Notifications/Notification";
import { useAuthContext } from "./useAuthContext";

const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { setStatus, setUser } = useAuthContext();

  const Login = async (nic, password) => {
    setError(null);
    setIsLoading(true);
    const loginData = { nic, password };
    const response = await axios.post("http://localhost:4000/api/v1/user/signin", loginData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.status === 200) {
      Notify(response.data.message); //message from backend
      return;
    }

    localStorage.setItem("user", JSON.stringify(response.data));
    console.log(response.data);

    //update the authContext
    setStatus("LOGIN");
    setUser(response.data);

    return;
  };
  return { Login, error, isLoading };
};

export default useLogin;
