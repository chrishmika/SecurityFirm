/* eslint-disable react/prop-types */
import  { motion,AnimatePresence } from "motion/react";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUserShield,faShieldHalved,faPeopleGroup,faBuildingShield,faWarehouse,faHouse,faUserTie,faLandmark,faVideo,faCarOn,faHelmetSafety,faTruckRampBox,faCircleXmark} from '@fortawesome/free-solid-svg-icons';

const iconMap = {
  faUserShield: faUserShield,
  faShieldHalved: faShieldHalved,
  faPeopleGroup: faPeopleGroup,
  faBuildingShield: faBuildingShield,
  faWarehouse: faWarehouse,
  faHouse: faHouse,
  faUserTie: faUserTie,
  faLandmark: faLandmark,
  faVideo: faVideo,
  faCarOn: faCarOn,
  faHelmetSafety: faHelmetSafety,
  faTruckRampBox: faTruckRampBox
};

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
            <div className="mb-6 flex flex-col items-center">
              {service.icon && (
                <FontAwesomeIcon 
                  icon={iconMap[service.icon]} 
                  className="text-blue-500 text-4xl mb-3" 
                />
              )}
              <h3 className="text-xl font-semibold">{service.title}</h3>
            </div>

            <div className="mb-5 flex-1">{service.description.substring(0,70)}...<span className="text-sm font-semibold text-blue-500"> see more</span></div>
          </div>
        </div>
      </div>

      {/* Popup Modal */}
      <AnimatePresence>
        {popup && (
        <motion.div
         
          className="fixed inset-0 flex items-center justify-center backdrop-blur-xs bg-opacity-50 z-50 bg-[#0000007c]"
          onClick={popupHandler} // close when clicking outside
        >
          <motion.div
            initial={{opacity:0, scale:0}}
            animate={{opacity:1, scale:1}}
            exit={{opacity:0, scale:0}}
            transition={{duration:0.3}}
            className=" bg-blue-50   p-6 rounded-2xl shadow-2xl max-w-2xl h-2/3 w-full relative"
            onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
          >
            <div
              className="absolute top-[-15px] right-[-15px]  cursor-pointer bg-white rounded-full w-[38px] h-[38px] flex flex-row items-center justify-center"
              onClick={popupHandler}
            >
              <FontAwesomeIcon icon={faCircleXmark} className=" text-red-400 hover:text-red-500 text-[40px] transition-all duration-300"/>
              
            </div>
            <h2 className="text-2xl font-bold mb-4">{service.title}</h2>
            <p className="text-gray-700 ">{service.description}</p>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
      
    </>
  );
};

export default ServicesCard;
