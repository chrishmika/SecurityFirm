import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "react-toastify";

import { IoMdClose } from "react-icons/io";
import { CiFileOn } from "react-icons/ci";
import { FaBirthdayCake, FaBuilding, FaClock, FaHome, FaPhoneAlt, FaUser } from "react-icons/fa";
import { BiMaleFemale } from "react-icons/bi";
import {
  MdDateRange,
  MdDescription,
  MdEmail,
  MdOutlineDataset,
  MdOutlineDateRange,
} from "react-icons/md";
import { RiProgress8Line } from "react-icons/ri";
import { motion, AnimatePresence } from "motion/react";
import { IoCloseSharp } from "react-icons/io5";

const DocumentThumbnail = ({ url, label }) => {
  if (!url) return null;
  const isImg = url.match(/\.(jpg|jpeg|png|gif|webp)$/i);
  const isPDF = url.match(/\.pdf$/i);
  const link = url.replace("/upload/", "/upload/fl_attachment/");

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center gap-2 group cursor-pointer">
      <div className="h-16 w-16 rounded-xl overflow-hidden border border-gray-200 shadow-sm group-hover:border-blue-400 group-hover:ring-2 ring-blue-100 transition-all flex items-center justify-center bg-gray-50">
        {isImg ? (
          <img src={url} alt={label} className="h-full w-full object-cover" />
        ) : isPDF ? (
          <span className="text-red-500 font-bold text-xs">PDF</span>
        ) : (
          <CiFileOn className="text-gray-400 text-2xl" />
        )}
      </div>
      <span className="text-xs font-medium text-gray-500 group-hover:text-blue-600">{label}</span>
    </a>
  );
};
DocumentThumbnail.propTypes = { url: PropTypes.string, label: PropTypes.string };

const ApplicationCard = ({ data, choice }) => {
  const [isSelected, setIsSelected] = useState(false);
  const [isDeleted, setIsDelete] = useState(false);
  const [status, setStatus] = useState(data?.status || "waiting");

  const deleteFileHandler = async (e) => {
    e.stopPropagation();
    try {
      await axios.delete(`/api/req/${choice ? "companyDel" : "employeeDel"}/${data?._id}`, {
        withCredentials: true,
      });
      setIsDelete(true);
      toast.success("Application Deleted");
    } catch (error) {
      toast.error(error.message || "Delete Failed");
    }
  };

  const handleStatusChange = async (newStatus, e) => {
    e?.stopPropagation();
    try {
      const endpoint = choice
        ? newStatus === "accepted"
          ? "acceptCompanyReq"
          : "rejectCompanyReq"
        : newStatus === "accepted"
          ? "acceptEmployeeReq"
          : "rejectEmployeeReq";
      console.log("endpoint", endpoint);
      await axios.put(
        `/api/req/${endpoint}/${data?._id}`,
        {},
        {
          withCredentials: true,
        },
      );
      setStatus(newStatus === "accepted" ? "accepted" : "reject");
      toast.success(`Application ${newStatus}`);
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to update status");
    }
  };

  if (isDeleted) return null;

  return (
    <>
      {/* Closed Card State */}
      <div
        onClick={() => setIsSelected(true)}
        className="relative group bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col items-center gap-3 w-40">
        <button
          onClick={deleteFileHandler}
          className="absolute top-2 right-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-red-50"
          title="Delete Application">
          <IoMdClose size={18} />
        </button>

        <div className="bg-blue-50 p-4 rounded-full text-blue-500">
          {choice ? <FaBuilding size={24} /> : <FaUser size={24} />}
        </div>

        <div className="text-center w-full">
          <h3 className="font-semibold text-gray-700 text-sm truncate w-full">
            {data?.name?.split(" ")[0]}
          </h3>
          <p
            className={`text-[11px] mt-0.5 capitalize font-medium ${
              status === "accepted"
                ? "text-green-500"
                : status === "reject"
                  ? "text-red-500"
                  : "text-blue-500"
            }`}>
            {status}
          </p>
        </div>
      </div>

      {/* Expanded Modal State */}
      <AnimatePresence>
        {isSelected && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSelected(false)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="bg-white p-6 md:p-8 rounded-3xl shadow-xl max-w-lg w-full relative max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setIsSelected(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors">
                <IoCloseSharp size={20} />
              </button>

              <div className="flex items-center gap-4 border-b border-gray-100 pb-5 mb-5 pr-8">
                <div className="bg-blue-50 p-4 rounded-full text-blue-500 shrink-0">
                  {choice ? <FaBuilding size={24} /> : <FaUser size={24} />}
                </div>
                <div className="overflow-hidden">
                  <h2 className="text-xl font-bold text-gray-800 truncate">{data?.name}</h2>
                  <p className="text-sm text-gray-500 flex items-center gap-2 mt-1 truncate">
                    <MdEmail className="shrink-0" /> {data?.email}
                  </p>
                </div>
              </div>

              <div className="space-y-5 text-sm text-gray-600">
                <div className="flex justify-between items-center bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                  <span className="flex items-center gap-2 font-medium">
                    <RiProgress8Line className="text-gray-400" /> Application Status
                  </span>
                  <span
                    className={`font-semibold uppercase tracking-wider text-[10px] px-3 py-1 rounded-full ${
                      status === "waiting"
                        ? "bg-blue-100 text-blue-700"
                        : status === "reject"
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                    }`}>
                    {status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-1">
                  <div className="flex items-center gap-3">
                    <FaPhoneAlt className="text-gray-400 shrink-0" />
                    <span className="truncate">{data?.contact || "-"}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaClock className="text-gray-400 shrink-0" />
                    <span>{data?.createdAt?.split("T")[0] || "-"}</span>
                  </div>
                  <div className="md:col-span-2 flex items-center gap-3">
                    <FaHome className="text-gray-400 shrink-0" />
                    <span className="truncate">{data?.address || "-"}</span>
                  </div>

                  {!choice && (
                    <>
                      <div className="flex items-center gap-3">
                        <FaBirthdayCake className="text-gray-400 shrink-0" />
                        <span>{data?.dob || "-"}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <BiMaleFemale className="text-gray-400 shrink-0" />
                        <span className="capitalize">{data?.sex || "-"}</span>
                      </div>
                    </>
                  )}

                  {choice && (
                    <>
                      <div className="md:col-span-2 flex items-center gap-3">
                        <MdDescription className="text-gray-400 shrink-0" />
                        <span className="truncate">{data?.description || "-"}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MdOutlineDateRange className="text-gray-400 shrink-0" />
                        <span>{data?.date || "-"}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MdDateRange className="text-gray-400 shrink-0" />
                        <span>{data?.period ? `${data.period} days` : "Contract"}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MdOutlineDataset className="text-gray-400 shrink-0" />
                        <span className="capitalize">{data?.type || "-"}</span>
                      </div>
                    </>
                  )}
                </div>

                {/* Documents Section */}
                {!choice && (data?.cv || data?.NICCopy) && (
                  <div className="pt-5 border-t border-gray-100 mt-2">
                    <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-4">
                      Attached Documents
                    </h4>
                    <div className="flex gap-6">
                      <DocumentThumbnail url={data?.cv} label="CV / Resume" />
                      <DocumentThumbnail url={data?.NICCopy} label="NIC Copy" />
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                {status === "waiting" && (
                  <div className="pt-5 border-t border-gray-100 mt-4 flex gap-3">
                    <button
                      onClick={(e) => handleStatusChange("accepted", e)}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-2.5 rounded-xl transition-colors shadow-sm">
                      Accept Application
                    </button>
                    <button
                      onClick={(e) => handleStatusChange("reject", e)}
                      className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 font-medium py-2.5 rounded-xl transition-colors">
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

ApplicationCard.propTypes = {
  data: PropTypes.any,
  choice: PropTypes.any,
};

export default ApplicationCard;
