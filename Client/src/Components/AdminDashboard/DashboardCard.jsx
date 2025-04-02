// import React from "react";

const DashboardCard = (props) => {
  // eslint-disable-next-line react/prop-types
  const { key, name, data } = props;
  return (
    <div>
      <div className="bg-white shadow-2xl rounded-2xl m-2 min-w-70 max-w-auto h-50 flex flex-col items-center justify-center" key={key}>
        <span className="font-extrabold text-3xl text-red-700">{data}</span>
        <span className="font-bold text-3xl">{name} </span>
      </div>
    </div>
  );
};

export default DashboardCard;
