import axios from "axios";
import { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";

const Summary = () => {
  const [employeeCount, setEmployeeCount] = useState();
  const [companyCount, setCompanyCount] = useState();
  const [applicationCount, setApplicationCount] = useState();
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const employee = await axios.post("/api/employee");
      const company = await axios.post("/api/company");
      const application = await axios.post("/api/web/application");

      setFetching(false);

      setEmployeeCount(employee.data.employees.length);
      setCompanyCount(company.data.companies.length);
      setApplicationCount(application.data.length);
    };

    getData();
  }, []);

  return (
    <div className=" h-full gap-5 font-bold p-4 flex justify-around flex-wrap ">
     add new component or remove it
    </div>
  );
};

export default Summary;
