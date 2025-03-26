import React, { useState } from "react";
import ApplicationCard from "./ApplicationCard";

const buttonStyle = "border-1 border-[#2C2C2C] rounded-md px-10 hover:cursor-pointer hover:bg-blue-500 hover:border-blue-500 hover:text-white font-medium min-h-8";
const ApplicationsView = () => {
  return (
    <React.Fragment>
      <div className="flex flex-col gap-5 w-full mx-auto shadow-md rounded-2xl pb-5 ">
        <div className="flex flex-wrap gap-5 justify-center">
          <button className={buttonStyle}>Recrute</button>
          <button className={buttonStyle}>Client</button>
        </div>
        <div className="flex flex-wrap gap-5 justify-center">
          <div className="flex flex-wrap gap-5">
            <button className={buttonStyle}>New</button>
            <button className={buttonStyle}>Viewed</button>
          </div>
          <div className="flex flex-wrap gap-5">
            <button className={buttonStyle}>Approve</button>
            <button className={buttonStyle}>Reject</button>
          </div>
        </div>
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
