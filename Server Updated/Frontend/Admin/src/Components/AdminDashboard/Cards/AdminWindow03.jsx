import React from "react";
import { PuffLoader } from "react-spinners";

const AdminWindow03 = () => {
  return (
    <div className="bg-sky-300 h-full rounded-2xl">
      <div className="flex justify-center pt-2">AdminWindow03</div>
      <div className="flex justify-center items-center    ">{<PuffLoader />}</div>
    </div>
  );
};

export default AdminWindow03;
