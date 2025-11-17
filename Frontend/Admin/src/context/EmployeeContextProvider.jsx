import { useState } from "react";
import PropTypes from "prop-types";
import { EmployeeContext } from "./EmployeeContext";

export const EmployeeProvider = ({ children }) => {
  let initialState = {
    name: "",
    initials: "",
    NIC: "",
    sex: "",
    birthday: "",
    password: "",
    number: "",
    street: "",
    city: "",
    nationality: "",
    citizenship: "",
    contact1: "",
    contact2: "",
    email: "",
    position: "",
    emerganceyName: "",
    emerganceyAddress: "",
    emerganceyContact: "",
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
  };

  const [employee, setEmployee] = useState(initialState);
  return (
    <EmployeeContext.Provider value={{ employee, setEmployee, initialState }}>
      {children}
    </EmployeeContext.Provider>
  );
};

EmployeeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
