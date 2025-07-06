import PropTypes from "prop-types";
import { useState } from "react";

import { CompanyContext } from "./CompanyContext";

export const CompanyProvider = ({ children }) => {
  const [company, setCompany] = useState({
    name: "",
    address: "",
    longitude: "",
    latitude: "",
    proposal: "",
    contractPeriod: { from: "", to: "" },
    companyMobile: "",
    companyEmail: "",
    Agent: "",
    agentContact1: "",
    agentContact2: "",
    agentNIC: "",
    agentEmail: "",
    count: null,
  });
  return <CompanyContext.Provider value={{ company, setCompany }}>{children}</CompanyContext.Provider>;
};

CompanyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
