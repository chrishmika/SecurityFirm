import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "react-toastify";

import { IoMdClose } from "react-icons/io";
import { CiFileOn } from "react-icons/ci";
import {
  FaBirthdayCake,
  FaBuilding,
  FaClock,
  FaFileInvoice,
  FaHome,
  FaPhoneAlt,
  FaUser,
} from "react-icons/fa";
import { BiMaleFemale } from "react-icons/bi";
import { MdDateRange, MdDescription, MdEmail, MdOutlineDataset } from "react-icons/md";
import { RiProgress8Line } from "react-icons/ri";
import { FaRegFileLines } from "react-icons/fa6";

const ApplicationCard = ({ data, choice }) => {
  console.log(data);
  const [isSelected, setIsSelected] = useState(false);
  const [isDeleted, setIsDelete] = useState(false);

  const isImage = data?.cv?.match(/\.(jpg|jpeg|png|gif|webp)$/i);
  const isPdf = data?.cv?.match(/\.pdf$/i);

  const isImagei = data?.cv?.match(/\.(jpg|jpeg|png|gif|webp)$/i);
  const isPdfi = data?.cv?.match(/\.pdf$/i);

  const deleteFileHandler = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/req/${choice ? "companyDel" : "employeeDel"}/${data?._id}`,
        { withCredentials: true }
      );
      setIsDelete(true);
      toast.success("Deleted");
      //remove or hide certain data
    } catch (error) {
      toast.error(error.message || "Delete Fail");
    }
  };

  return (
    <div className={`${isDeleted ? "hidden" : ""}`}>
      <div className="m-2 flex flex-col justify-center items-center relative">
        <FaRegFileLines
          className="text-7xl cursor-pointer hover:text-indigo-700"
          onClick={() => setIsSelected(true)}
        />
        <button className="absolute top-0 right-0  hover:text-red-500" onClick={deleteFileHandler}>
          <IoMdClose />
        </button>
        <span className=" cursor-pointer">{data?.name.split(" ", 1)}</span>
      </div>

      <div
        className={`${
          isSelected ? "block" : "hidden"
        } fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4`}>
        <div className="relative w-full max-w-3xl bg-white rounded-lg p-6 md:p-10">
          {/* Close Button */}
          <span
            className="absolute top-2 right-2 text-black hover:text-red-500 font-bold cursor-pointer"
            onClick={() => setIsSelected(false)}>
            ✕
          </span>

          {/* Content: view employee application details */}
          <div className="overflow-auto max-h-[80vh] flex flex-col gap-4">
            {/* top layer */}
            <div className="flex justify-between w-full">
              <span className={`flex items-center gap-2 `}>
                <FaClock />
                <span className="font-bold">{"Created at : "}</span>
                {data?.createdAt?.split("T")[0]}
              </span>

              <span
                className={`flex items-center gap-4 ${
                  data?.status == "waiting"
                    ? "text-blue-500"
                    : data?.status == "reject"
                    ? "text-red-500"
                    : "text-green-500"
                }
              `}>
                <RiProgress8Line />
                {data?.status}
              </span>
            </div>

            {/* middle layer */}
            <span className="flex items-center gap-4 text-2xl font-bold mb-3">
              {!choice && <FaUser />}
              {choice && <FaBuilding />}
              {data?.name}
            </span>

            <div className="mx-5">
              <span className="flex items-center gap-4">
                <MdEmail />
                {data?.email}
              </span>

              <span className="flex items-center gap-4">
                <FaHome />
                {data?.address}
              </span>

              <span className="flex items-center gap-4">
                <FaPhoneAlt />
                {data?.contact}
              </span>

              <span className={`flex items-center gap-4 ${choice ? "hidden" : ""}`}>
                <FaBirthdayCake />
                {data?.dob}
              </span>

              <span className={`flex items-center gap-4 ${choice ? "hidden" : ""}`}>
                <BiMaleFemale />
                {data?.sex}
              </span>

              <div className={`flex gap-5 ${choice ? "hidden" : ""}`}>
                <a
                  href={data?.cv ? data?.cv.replace("/upload/", "/upload/fl_attachment/") : "#"}
                  download={"cv"}
                  className="flex flex-col items-center text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer">
                  {isImage ? (
                    <img src={data.cv} alt={"cv"} className="h-20 w-20 object-cover rounded mb-2" />
                  ) : isPdf ? (
                    <div className="h-20 w-20 flex items-center justify-center bg-red-100 text-red-600 font-bold rounded mb-2">
                      PDF
                    </div>
                  ) : (
                    <div className="h-20 w-20 flex items-center justify-center bg-gray-200 text-gray-600 font-bold rounded mb-2">
                      FILE
                    </div>
                  )}
                  {"cv"}
                </a>

                <a
                  href={
                    data?.NICCopy
                      ? data?.NICCopy.replace("/upload/", "/upload/fl_attachment/")
                      : "#"
                  }
                  download={"cv"}
                  className="flex flex-col items-center text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer">
                  {isImagei ? (
                    <img
                      src={data.NICCopy}
                      alt={"NICCopy"}
                      className="h-20 w-20 object-cover rounded mb-2"
                    />
                  ) : isPdfi ? (
                    <div className="h-20 w-20 flex items-center justify-center bg-red-100 text-red-600 font-bold rounded mb-2">
                      PDF
                    </div>
                  ) : (
                    <div className="h-20 w-20 flex items-center justify-center bg-gray-200 text-gray-600 font-bold rounded mb-2">
                      FILE
                    </div>
                  )}
                  {"NICCopy"}
                </a>
              </div>

              {/* conpany only data is need to be added */}
              {choice && (
                <div>
                  <span className={`flex items-center gap-4 ${choice ? "" : "hidden"}`}>
                    <MdDescription />
                    {data?.description}
                  </span>

                  <span className={`flex items-center gap-4 ${choice ? "" : "hidden"}`}>
                    <MdDescription />
                    {data?.date}
                  </span>

                  <span className={`flex items-center gap-4 ${choice ? "" : "hidden"}`}>
                    <MdDateRange />
                    {`${data?.period || "Contract "} days`}
                  </span>

                  <span className={`flex items-center gap-4 ${choice ? "" : "hidden"}`}>
                    <MdOutlineDataset />
                    {data?.type}
                  </span>
                </div>
              )}
            </div>
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
