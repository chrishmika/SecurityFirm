/* eslint-disable react/prop-types */
import React from "react";

const ClientCard = ({ client, index }) => {
  return (
    <div
      className="flex flex-col bg-indigo-100 shadow-lg rounded-lg text-center p-4 transition-transform duration-300 hover:scale-103 justify-center items-center h-50"
      key={index}>
      {/* <div className="flex justify-center items-center mb-4 "> */}
        <img className="w-50 h-auto" src={client?.logo} alt={client.alt} />
      {/* </div> */}

    </div>
  );
};

export default ClientCard;
