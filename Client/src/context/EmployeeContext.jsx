import { useState, createContext } from "react";
import PropTypes from "prop-types";

export const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [employee, setEmployee] = useState({
    empId: "",
    fullName: "",
    initials: "",
    DOB: "",
    address: "",
    nationality: "",
    citizenship: "",
    contact1: "",
    contact2: "",
    email: "",
    EPF: "",
    ETF: "",
    NIC: "",
    marital: "",
    gender: "",
    militaryExperience: "",
    handleGuns: "",
    experience: "",
    disabilities: "",
    documents: [],
  });
  return <EmployeeContext.Provider value={{ employee, setEmployee }}>{children}</EmployeeContext.Provider>;
};

EmployeeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
