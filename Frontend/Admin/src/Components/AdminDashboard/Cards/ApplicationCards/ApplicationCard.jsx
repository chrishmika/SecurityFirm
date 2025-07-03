import React from "react";
import { PuffLoader } from "react-spinners";

const ApplicationCard = () => {
  return (
    <div className="border-b-1 my-2  w-screen">
      <div>ApplicationCard</div>
      <div className="flex justify-center items-center  ">{<PuffLoader />}</div>
    </div>
  );
};

export default ApplicationCard;
