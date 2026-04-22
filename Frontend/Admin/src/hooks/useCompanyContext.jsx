import { useContext } from "react";
import { CompanyContext } from "../Context/CompanyContext";

export const useCompanyContext = () => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw Error("useCompanyContext must be used inside an CompanyContextProvider");
  }
  return context;
};
