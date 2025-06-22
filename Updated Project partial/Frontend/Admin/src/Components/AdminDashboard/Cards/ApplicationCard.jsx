import React from "react";
import { PuffLoader } from "react-spinners";

const ApplicationCard = () => {
  return (
    <div className="border-b-1 my-2">
      <div>ApplicationCard</div>
      <div className="flex justify-center items-center  ">{<PuffLoader />}</div>
    </div>
  );
};

export default ApplicationCard;
