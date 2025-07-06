import { useContext } from "react";
import { EmployeeContext } from "../context/EmployeeContext";

export const useEmployeeContext = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw Error("useWorkoutContext must be used inside an EmployeeContextProvider");
  }
  return context;
};
