import React, { useEffect, useState } from "react";
import ApplicationCard from "./Cards/ApplicationCards/ApplicationCard";
import { FaToggleOff, FaToggleOn } from "react-icons/fa6";
import axios from "axios";
import { PuffLoader } from "react-spinners";

const ApplicationsView = () => {
  const [choice, setChoice] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [allData, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsloading(true);
      const Url = choice ? "/api/web/application" : "/api/web/CompanyApplications";
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

      <div className={`flex flex-col md:justify-between border-1 border-[#D9D9D9] rounded-2xl w-full h-screen justify- my-1.5  md:flex-row cursor-pointer p-2 overflow-hidden`}>
        {!isLoading ? (
          <div className=" border-[#D9D9D9] w-screen m-2">
            <h1 className="font-bold">{!choice ? "Employee Applications" : "Company Applications"}</h1>
            <div className="mx-2 flex flex-wrap gap-5">
              {allData.map((data) => {
                return <ApplicationCard data={data} key={data._id} choice={choice} />;
              })}
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center w-screen ">{<PuffLoader />}</div>
        )}
      </div>
    </React.Fragment>
  );
};

export default ApplicationsView;
