/* eslint-disable react/prop-types */
import { AnimatePresence } from "motion/react";
import profilePic from "../../../../assets/boy1.png";
import { Info } from "./Components";
import ConfirmationWindow from "../../../../utils/ComfirmationWindowPopUp";
import { toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

const CompanyDataView = ({ data }) => {
  const [confirmation, setConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(data);

  const deleteRecord = async () => {
    try {
      setLoading(true);
      const response = await axios.delete(`/api/company/${data._id}`, { withCredentials: true });
      if (response.status == 200) {
        toast.success(response.message || "Record deleted successfully!");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        toast.error(response.message || "Failed to remove record!");
      }
    } catch (error) {
      toast.error(`something went wrong!`);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const files = [
    { label: "Proposal", url: data?.proposal },
    // { label: "GS", url: data?.gsCertificate },
    // { label: "NIC Copy", url: data?.NICCopy },
  ];

  return (
    <main className="flex sm:flex-row flex-col  justify-center sm:gap-55 p-4 bg-white text-sm text-gray-800 font-medium h-full">
      {/* Left Column */}
      <aside className="flex flex-col items-start p-2 space-y-4 overflow-hidden">
        <div className="w-full max-w-[280px] text-left">
          <img
            src={data?.img || profilePic}
            alt="profile pic"
            className="w-28 h-28 rounded-full object-cover border-2 border-blue-500 shadow mb-4"
          />

          <header>
            <h1 className="text-2xl font-bold text-blue-900">{data?.name || "none"}</h1>
          </header>

          <address className="not-italic space-y-1 mb-4">
            {/* <p>{data?.NIC || "none"}</p> */}
            <p>{data?.companyEmail || "email none"}</p>
          </address>

          <div className="space-y-4 w-full">
            <Info label="Company Number" value={data?.companyMobile || "none"} />
            <Info label="Address" value={data?.address || "none"} />

            <h2 className="text-sm font-semibold mb-2">Coordinates</h2>
            <div className="flex gap-6">
              <Info label="Longitudes" value={data?.longitude || "none"} />
              <Info label="Latitudes" value={data?.latitude || "none"} />
            </div>
            {/* Contract period */}
            <div>
              <h2 className="text-sm font-semibold mb-2">Contract period</h2>
              <div className="flex gap-6">
                <Info label="From" value={data?.contractPeriod[0]?.from || "none"} />
                <Info label="To" value={data?.contractPeriod[0]?.to || "none"} />
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Right Column (Middle + Right Combined) */}
      <section className="flex flex-col p-4 space-y-6 overflow-hidden">
        {/* Requirement Count  */}
        <div>
          <h2 className="text-sm font-semibold mb-2">Requirement Count</h2>
          <div className="flex  gap-10">
            {/* need to map data from array */}
            <table className="">
              <thead className="">
                <tr>
                  <th className="pr-15">Position</th>
                  <th className="pr-15">Amount</th>
                </tr>
              </thead>

              <tbody>
                {data?.count.map((requriment) => (
                  <tr key={requriment._id}>
                    <td>{requriment.position}</td>
                    <td>{`${requriment.amount} Person`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Company Representative */}
        <div>
          <h2 className="text-sm font-semibold">Company Representative</h2>

          <div className="mt-4 space-y-6">
            <Info label="Name" value={data?.agent || "none"} />
            <Info label="NIC" value={data?.agentNIC || "none"} />

            <div className="flex gap-10">
              <Info label="Contacts 1" value={data?.agentContact1 || "none"} />
              <Info label="Contacts 2" value={data?.agentContact2 || "none"} />
            </div>
          </div>
        </div>

        {/* Files */}
        <div>
          <h3 className="text-sm font-semibold mb-4">Files</h3>
          <ul className="flex gap-8 text-gray-700">
            {files.map((file) => {
              const isImage = file?.url?.match(/\.(jpg|jpeg|png|gif|webp)$/i);
              const isPdf = file?.url?.match(/\.pdf$/i);

              return (
                <li key={file?.label} className="flex flex-col items-center">
                  <a
                    href={file?.url ? file.url.replace("/upload/", "/upload/fl_attachment/") : "#"}
                    download={file?.label}
                    className="flex flex-col items-center text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer">
                    {isImage ? (
                      <img
                        src={file.url}
                        alt={file.label}
                        className="h-20 w-20 object-cover rounded mb-2"
                      />
                    ) : isPdf ? (
                      <div className="h-20 w-20 flex items-center justify-center bg-red-100 text-red-600 font-bold rounded mb-2">
                        PDF
                      </div>
                    ) : (
                      <div className="h-20 w-20 flex items-center justify-center bg-gray-200 text-gray-600 font-bold rounded mb-2">
                        FILE
                      </div>
                    )}
                    {file?.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex justify-end mt-4 gap-10">
          <button
            className="rounded-lg text-white hover:cursor-pointer hover:bg-pink-600 py-2 px-4 h-9 bg-pink-400 "
            onClick={() => setConfirmation(!confirmation)}>
            {loading ? <ClipLoader size={15} /> : `Delete`}
          </button>
          <button className="rounded-lg text-white hover:cursor-pointer hover:bg-pink-600 py-2 px-4 bg-pink-400 ">
            Print
          </button>
        </div>
        <AnimatePresence>
          {confirmation && ConfirmationWindow(deleteRecord, setConfirmation, "Delete This Record")}
        </AnimatePresence>
      </section>
    </main>
  );
};

export default CompanyDataView;
