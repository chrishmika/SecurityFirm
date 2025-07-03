import React, { useState } from "react";
import ApplicationCard from "./Cards/ApplicationCards/ApplicationCard";
import { FaToggleOff, FaToggleOn } from "react-icons/fa6";

// const buttonStyle = "border-1 border-[#2C2C2C] rounded-md px-9 md:px-15 hover:cursor-pointer hover:bg-[#5932EA] hover:border-[#5932EA] hover:text-white font-medium min-h-8";
const ApplicationsView = () => {
  const [choice, setChoice] = useState(false);

  return (
    <React.Fragment>
      {/*selector*/}
      <div className="text-xl flex gap-3 items-center">
        <span className="text-4xl" onClick={() => setChoice(!choice)}>
          {choice ? <FaToggleOn /> : <FaToggleOff />}
        </span>
        {choice ? `Company` : `Employee`}
      </div>

      <div className={` flex md:justify-between border-1 border-[#D9D9D9] rounded-2xl w-full justify-normal my-1.5 flex-col md:flex-row hover:cursor-pointer p-2`}>
        <div className="border-b-1 border-[#D9D9D9] w-full m-2">
          <h1 className="font-bold">Applications</h1>
          <div className="mx-2">
            <ApplicationCard />
            <ApplicationCard />
            <ApplicationCard />
            <ApplicationCard />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ApplicationsView;
