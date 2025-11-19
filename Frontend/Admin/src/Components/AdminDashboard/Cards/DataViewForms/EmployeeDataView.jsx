/* eslint-disable react/prop-types */
import { useState } from "react";
import profilePic from "../../../../assets/boy1.png";
import ConfirmationWindow from "../../../../utils/ComfirmationWindowPopUp";
import { Detail, Info } from "./Components";
import { AnimatePresence } from "motion/react";
import axios from "axios";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";
import PrintEmployeeData from "../../../../utils/PrintEmployeeData";

const EmployeeDataView = ({ data }) => {
  const [confirmation, setConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);
  const files = [
    { label: "CV", url: data?.cv },
    { label: "GS", url: data?.gsCertificate },
    { label: "NIC Copy", url: data?.NICCopy },
  ];

  const deleteRecord = async () => {
    try {
      setLoading(true);
      const response = await axios.delete(`/api/employee/${data._id}`, { withCredentials: true });
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex sm:flex-row flex-col justify-around  h-full bg-white p-4 gap-2 text-sm text-gray-800 font-medium">
      {/* Left Column */}
      <aside className=" flex flex-col items-end p-2 space-y-4 overflow-hidden">
        <div className="w-full max-w-[280px] text-left">
          <img
            src={data?.img || profilePic}
            alt={`profile pic`}
            className="w-28 h-28 rounded-full object-cover border-2 border-blue-500 shadow mb-4"
          />

          <address className="not-italic space-y-1 mb-4">
            <p>{data?.NIC || "000000000000"}</p>
            <p>{data?.email || "none@email.com"}</p>
            {/* ?<p>Colombo</p> */}
          </address>

          <div className="space-y-4 w-full">
            <Info label="Employee Number" value={data?.empId || "0000"} />
            <Info label="Full Name" value={data?.name || "none"} />
            <Info label="Name with Initials" value={data?.initials || "none"} />
            <Info label="Address" value={data?.address || "none"} />
            <Info label="Birthday" value={data?.birthday.split("T")[0] || "0000-00-00"} />
            <Info label="Gender" value={data?.sex || "none"} />

            <div className="flex gap-6">
              <Info label="Contact 1" value={data?.contact1 || "000-000-000"} />
              <Info label="Contact 2" value={data?.contact2 || "000-000-000"} />
            </div>

            <div className="flex gap-6">
              <Info label="Citizenship" value={data?.citizenship || "none"} />
              <Info label="Nationality" value={data?.nationality || "none"} />
            </div>

            <Info label="Maritial" value={data?.marital ? "Married" : "Single"} />
          </div>
        </div>
      </aside>

      {/* Middle Column */}
      <section className=" p-4 space-y-6 overflow-hidden">
        <header>
          <h1 className="text-2xl font-bold text-blue-900">{data?.name || "none"}</h1>
          <p className="text-gray-600">{data?.position || "none"}</p>
        </header>

        <div className="flex gap-6">
          <Info label="ETF" value={data?.ETF || "0000"} />
          <Info label="EPF" value={data?.EPF || "0000"} />
        </div>

        <Info label="Basic Salary" value={`Rs.${data?.basicSalary || "000"}`} />

        {/* EXPERIENCE */}
        <section>
          <h2 className="text-sm font-semibold mb-2">EXPERIENCE</h2>
          <Detail title="Military Status" content={data?.militaryStatus ? "Yes" : "No"} />
          <Detail title="Military Details" content={data?.militaryDescription || "none"} />
          <Detail title="Special Abilities" content={data?.specialAbilities || "none"} />
          <Detail title="Gun Handeling" content={data?.gunHandling ? "Yes" : "No"} />
        </section>

        {/* SPECIAL DETAILS */}
        <section>
          <h2 className="text-sm font-semibold mb-2">SPECIAL DETAILS</h2>
          {/* <Detail title="Disabilities" content={data?.disabilities || "none"} /> */}
          <Detail title="Description" content={data?.description || "none"} />
        </section>
      </section>

      {/* Right Column */}
      <aside className=" p-4 overflow-hidden">
        <section className="mt-8">
          <h2 className="text-sm font-semibold">EMERGENCY</h2>
          <div className="mt-4 space-y-6">
            <Info label="Name" value={data?.emerganceyName || "none"} />
            <Info label="Address" value={data?.emerganceyAddress || "none"} />
            <Info label="Contacts" value={data?.emerganceyContact || "none"} />
          </div>
          {/* Uploaded Files Section */}
          <section className="mt-10">
            <h3 className="text-sm font-semibold mb-4">Files</h3>

            <ul className="flex gap-8 text-gray-700">
              {files.map((file) => {
                const isImage = file?.url?.match(/\.(jpg|jpeg|png|gif|webp)$/i);
                const isPdf = file?.url?.match(/\.pdf$/i);

                return (
                  <li key={file?.label} className="flex flex-col items-center">
                    <a
                      href={
                        file?.url ? file.url.replace("/upload/", "/upload/fl_attachment/") : "#"
                      }
                      download={file?.label}
                      className="flex flex-col items-center text-blue-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer">
                      {/* PREVIEW */}
                      {isImage ? (
                        <img
                          src={file?.url}
                          alt={file?.label}
                          className="h-20 w-20 object-cover rounded mb-2"
                        />
                      ) : isPdf ? (
                        <div className=" flex items-center justify-center bg-red-100 text-red-600 font-bold rounded mb-2">
                          <object
                            data={file?.url}
                            type="application/pdf"
                            className="h-32 w-32 rounded border-0">
                            <p>Preview not available Click to download</p>
                          </object>
                        </div>
                      ) : (
                        <div className="h-20 w-20 flex items-center justify-center bg-gray-200 text-gray-600 font-bold rounded mb-2">
                          FILE
                        </div>
                      )}

                      {/* LABEL */}
                      {file?.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </section>

          <div className="relative h-40 bottom-0 left-0 flex justify-end mt-10 gap-10 items-end">
            <button
              className="rounded-lg text-white hover:cursor-pointer hover:bg-red-600 py-2 px-4 h-9 bg-red-400 "
              onClick={() => setConfirmation(!confirmation)}>
              {loading ? <ClipLoader size={15} /> : `Delete`}
            </button>

            <button className="rounded-lg text-white hover:cursor-pointer hover:bg-pink-600 py-2 px-4 bg-pink-400 ">
              <Link to={`/customers/editEmployee/${data?._id}`} state={{ data }}>
                Edit
              </Link>
            </button>

            <PrintEmployeeData data={data} />
          </div>
          <AnimatePresence>
            {confirmation &&
              ConfirmationWindow(deleteRecord, setConfirmation, "Delete This Record")}
          </AnimatePresence>
        </section>
      </aside>
    </main>
  );
};

export default EmployeeDataView;
