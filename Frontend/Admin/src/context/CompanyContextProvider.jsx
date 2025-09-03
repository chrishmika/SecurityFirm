import PropTypes from "prop-types";
import { useState } from "react";

import { CompanyContext } from "./CompanyContext";

export const CompanyProvider = ({ children }) => {
  let initialCompany = {
    name: "",
    address: "",
    longitude: "",
    latitude: "",
    proposal: "",
    contractPeriod: [],
    companyMobile: "",
    companyEmail: "",
    agent: "",
    agentContact1: "",
    agentContact2: "",
    agentNIC: "",
    agentEmail: "",
    count: [],
  };
  const [company, setCompany] = useState(initialCompany);
  return (
    <CompanyContext.Provider value={{ company, setCompany, initialCompany }}>
      {children}
    </CompanyContext.Provider>
  );
};

CompanyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
