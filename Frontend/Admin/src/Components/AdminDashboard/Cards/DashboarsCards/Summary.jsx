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
    <div className=" h-full  font-bold p-4 flex justify-around flex-wrap ">
      <div className="flex flex-col justify-center items-center drop-shadow-  rounded-2xl">
        {fetching ? <div className="flex justify-center items-center  ">{<PuffLoader />}</div> : ""}
        <span className=" text-3xl">{employeeCount}</span>
        <span className=" text-xl">No of Employess</span>
      </div>

      <div className="flex flex-col justify-center items-center drop-shadow-  rounded-2xl">
        {fetching ? <div className="flex justify-center items-center  ">{<PuffLoader />}</div> : ""}
        <span className=" text-3xl">{companyCount}</span>
        <span className=" text-xl">No of Companies</span>
      </div>

      <div className="flex flex-col justify-center items-center drop-shadow-  rounded-2xl">
        {fetching ? <div className="flex justify-center items-center  ">{<PuffLoader />}</div> : ""}
        <span className=" text-3xl">{applicationCount}</span>
        <span className=" text-xl">New of Applications</span>
      </div>
    </div>
  );
};

export default Summary;
