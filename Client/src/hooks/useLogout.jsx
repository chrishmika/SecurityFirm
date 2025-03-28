import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { setStatus, setUser } = useAuthContext();

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setStatus("LOGOUT");
  };
  return { logout };
};
