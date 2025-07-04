import React, { useEffect, useState } from "react";
import ApplicationCard from "./Cards/ApplicationCards/ApplicationCard";
import { FaToggleOff, FaToggleOn } from "react-icons/fa6";
import axios from "axios";
import { PuffLoader } from "react-spinners";

// const buttonStyle = "border-1 border-[#2C2C2C] rounded-md px-9 md:px-15 hover:cursor-pointer hover:bg-[#5932EA] hover:border-[#5932EA] hover:text-white font-medium min-h-8";
const ApplicationsView = () => {
  const [choice, setChoice] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [allData, setData] = useState([]);
  // const [companyData, setCompanyData] = useState(true);
  // const [companyData, setCompanyData] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsloading(true);
      const Url = choice ? "http://localhost:5000/api/web/application" : "http://localhost:5000/api/web/CompanyApplications";
      const response = await axios.post(Url, {}, { withCredentials: true });
      console.log(response);
      setIsloading(false);
      setData(response.data);
    };
    fetchData();
  }, [choice]);

  return (
    <React.Fragment>
      {/*selector*/}
      <div className="text-xl flex gap-3 items-center">
        <span className="text-4xl" onClick={() => setChoice(!choice)}>
          {choice ? <FaToggleOn /> : <FaToggleOff />}
        </span>
        {choice ? `Company` : `Employee`}
      </div>

      <div className={` flex md:justify-between border-1 border-[#D9D9D9] rounded-2xl w-full h-screen justify-normal my-1.5 flex-col md:flex-row hover:cursor-pointer p-2`}>
        {!isLoading ? (
          <div className="border-b-1 border-[#D9D9D9] w-full m-2">
            <h1 className="font-bold">{!choice ? "Employee Applications" : "Company Applications"}</h1>
            <div className="mx-2 flex flex-wrap gap-5">
              {allData.map((data) => {
                return <ApplicationCard data={data} key={data._id} choice={choice} />;
              })}
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center  w-full ">{<PuffLoader />}</div>
        )}
      </div>
    </React.Fragment>
  );
};

export default ApplicationsView;
