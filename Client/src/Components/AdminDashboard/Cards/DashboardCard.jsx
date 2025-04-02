import React from "react";

const DashboardCard = (props) => {
  // eslint-disable-next-line react/prop-types
  const { key, name, data } = props;
  return (
    <React.Fragment>
      <div className="bg-white shadow-md rounded-2xl min-w-70 max-w-auto h-50 flex flex-col items-center justify-center hover:z-0 hover:bg-[#eeecec]" key={key}>
        <span className="font-extrabold text-3xl text-red-700">{data}</span>
        <span className="font-bold text-3xl">{name} </span>
      </div>
    </React.Fragment>
  );
};

export default DashboardCard;
