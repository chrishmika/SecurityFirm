import React from "react";

const AdminWindow02 = () => {
  return (
    <div className="bg-green-200 h-full rounded-2xl font-bold p-4 flex justify-around">
      <div className="flex flex-col justify-center items-center">
        <span className=" text-3xl">{`20`}</span>
        <span className=" text-xl">No of Employess</span>
      </div>

      <div className="flex flex-col justify-center items-center">
        <span className=" text-3xl">{`120`}</span>
        <span className=" text-xl">No of Companies</span>
      </div>

      <div className="flex flex-col justify-center items-center">
        <span className=" text-3xl">{`10`}</span>
        <span className=" text-xl">No of Applications</span>
      </div>
    </div>
  );
};

export default AdminWindow02;
