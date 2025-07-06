import PropTypes from "prop-types";
import { useState } from "react";

import { CompanyContext } from "./CompanyContext";

export const CompanyProvider = ({ children }) => {
  const [company, setCompany] = useState({
    name: "",
    address: "",
    locationX: "",
    locationY: "",
    proposal: "",
    contractPeriod: { from: "", to: "" },
    responsiblePerson: "",
    responsiblePersonContact: "",
    responsiblePersonNIC: "",
    count: { position: "", amount: "" },
  });
  return <CompanyContext.Provider value={{ company, setCompany }}>{children}</CompanyContext.Provider>;
};

CompanyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
