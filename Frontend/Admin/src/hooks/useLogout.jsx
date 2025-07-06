import axios from "axios";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { setStatus, setUser } = useAuthContext();

  const logout = async () => {
    // localStorage.removeItem("user");
    const deleteToken = await axios.post("/api/auth/logout", {}, { withCredentials: true }); //hope this will fix the logout
    console.log(deleteToken);

    setUser(null);
    setStatus("LOGOUT");
  };
  return { logout };
};
