import { useState } from "react";
import PropTypes from "prop-types";
import { EmployeeContext } from "./EmployeeContext";

export const EmployeeProvider = ({ children }) => {
  const [employee, setEmployee] = useState({
    empId: "",
    name: "",
    initials: "",
    NIC: "",
    sex: "",
    birthday: "",
    address: "",
    nationality: "",
    citizenship: "",
    contact1: "",
    contact2: "",
    email: "",
    position: "",
    emergancey: [], //need to create correctly
    EPF: "", //need to capitalize both in database
    ETF: "", //need to capitalize
    marital: "",
    basicSalary: "", //new added
    specialAbilities: "",
    militaryExperience: "",
    gunHandling: false,
    experience: "",
    disabilities: "",
    img: null,
    NICCopy: null,
    cv: null,
    gsCertificate: null,
  });
  return <EmployeeContext.Provider value={{ employee, setEmployee }}>{children}</EmployeeContext.Provider>;
};

EmployeeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
