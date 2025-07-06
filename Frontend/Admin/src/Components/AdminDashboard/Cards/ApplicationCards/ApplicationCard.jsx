import { useState } from "react";
import PropTypes from "prop-types";
import { CiFileOn } from "react-icons/ci";

const ApplicationCard = ({ data, choice }) => {
  const [isSelected, setIsSelected] = useState(false);

  console.log(data);

  return (
    <div>
      <div className="m-2 flex flex-col justify-center items-center" onClick={() => setIsSelected(true)}>
        <CiFileOn className="text-7xl cursor-pointer" />
        <span className=" cursor-pointer">{data.name}</span>
      </div>

      <div className={`${isSelected ? "box" : "hidden"} absolute inset-0 backdrop-blur-sm p-10 z-100 `}>
        <div>
          <div className=" flex absolute md:inset-20 sm:inset-y-50 inset-y-20 inset-x-10 inset bg-red-400 ml-15 sm:mx-50">
            <span onClick={() => setIsSelected(false)}>{"close"}</span>
            {/*view employee aplication details in propper manner */}
          </div>
        </div>
      </div>
    </div>
  );
};

ApplicationCard.propTypes = {
  data: PropTypes.any,
  choice: PropTypes.any,
};

export default ApplicationCard;
