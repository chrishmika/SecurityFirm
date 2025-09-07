import { useState } from "react";
import PropTypes from "prop-types";
import { CiFileOn } from "react-icons/ci";

const ApplicationCard = ({ data, choice }) => {
  const [isSelected, setIsSelected] = useState(false);

  console.log(data);

  return (
    <div>
      <div
        className="m-2 flex flex-col justify-center items-center"
        onClick={() => setIsSelected(true)}>
        <CiFileOn className="text-7xl cursor-pointer" />
        <span className=" cursor-pointer">{data.name.split(" ", 1)}</span>
      </div>

      <div
        className={`${
          isSelected ? "block" : "hidden"
        } fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4`}>
        <div className="relative w-full max-w-3xl bg-red-400 rounded-lg p-6 md:p-10">
          {/* Close Button */}
          <span
            className="absolute top-2 right-2 text-white font-bold cursor-pointer"
            onClick={() => setIsSelected(false)}>
            ✕
          </span>

          {/* Content: view employee application details */}
          <div className="overflow-auto max-h-[80vh] flex flex-col">
            <span>{data?.name}</span>
            <span>{data?.address}</span>
            <span>{data?.contact}</span>
            <span>{data?.sex}</span>
            <span>{data?.cv}</span>
            <span>{data?.NICCopy}</span>
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
