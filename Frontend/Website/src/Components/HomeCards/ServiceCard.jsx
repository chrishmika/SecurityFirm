/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaWindowClose } from "react-icons/fa";

const ServicesCard = ({ service, index }) => {
  const [popup, setPopup] = useState(false);

  const popupHandler = () => {
    setPopup(!popup);
  };

  return (
    <>
      {/* Service Card */}
      <div
        onClick={popupHandler}
        className="bg-blue-100 shadow-lg rounded-lg p-2 text-center flex flex-col transition-transform duration-300 hover:scale-105 cursor-pointer"
        key={index}
      >
        <div className="bg-white rounded-xl shadow-md flex flex-col flex-1">
          <div className="p-4 flex flex-col flex-1">
            <div className="mb-6">
              <h3 className="text-xl font-bold">{service.title}</h3>
            </div>
            <div className="mb-5 flex-1">{service.description}</div>
          </div>
        </div>
      </div>

      {/* Popup Modal */}
      {popup && (
        <div
          className="fixed inset-0 flex items-center justify-center backdrop-blur-xs bg-opacity-50 z-50"
          onClick={popupHandler} // close when clicking outside
        >
          <div
            className=" bg-blue-50   p-6 rounded-2xl shadow-2xl max-w-2xl h-2/3 w-full relative"
            onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
          >
            <button
              className="absolute top-2 right-2 text-red-400 cursor-pointer hover:text-red-500"
              onClick={popupHandler}
            >
              <FaWindowClose />
            </button>
            <h2 className="text-2xl font-bold mb-4">{service.title}</h2>
            <p className="text-gray-700 ">{service.moreDescription}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ServicesCard;
