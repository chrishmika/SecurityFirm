import { useState } from "react";
import AttendanceCard from "./AttendanceCard";

const AttendanceView = () => {
  const [startDate, setStartDate] = useState(new Date().toISOString().split("T")[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split("T")[0]);

  const [company, setCompany] = useState("");
  const [employee, setEmployee] = useState("");

  const submitHandeler = (e) => {
    e.preventDefault();
    try {
      const response = "d";
    } catch (error) {
      console.log(error);
    }
  };

  //styles
  const buttonStyle = "border-1 border-[#2C2C2C] rounded-md px-10 hover:cursor-pointer hover:bg-blue-500 hover:border-blue-500";
  const inputFieldStyle = "border-1 rounded-md px-4 border-[#D9D9D9] placeholder:text-[#D9D9D9]";

  return (
    <div>
      <div className="shadow-md px-2 mb-3">
        <form onSubmit={submitHandeler}>
          <div className="flex md:gap-8 gap-2 flex-wrap justify-between w-full sm:items-center ">
            <div className="flex md:flex-row flex-col gap-1">
              <label>Date Start : </label>
              <input
                type="date"
                name="startDate"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                }}
                className={inputFieldStyle}
              />
            </div>
            <div className="flex md:flex-row flex-col gap-1">
              <label>Date End : </label>
              <input
                type="date"
                name=""
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                }}
                className={inputFieldStyle}
              />
            </div>
            <div className="flex md:flex-row flex-col gap-1">
              <label>Company : </label>
              <input
                type="text"
                name="company"
                value={company}
                onChange={(e) => {
                  setCompany(e.target.value);
                }}
                placeholder="Company"
                className={inputFieldStyle}
              />
            </div>
            <div className="flex md:flex-row flex-col gap-1">
              <label>Employee: </label>
              <input
                type="text"
                name="employee"
                value={employee}
                onChange={(e) => {
                  setEmployee(e.target.value);
                }}
                placeholder="Employee"
                className={inputFieldStyle}
              />
            </div>
          </div>
          <div className="flex gap-4 items-center sm:justify-center py-10">
            <button type="submit" className={` ${buttonStyle} hover:text-white`}>
              Search
            </button>
            <button
              onClick={() => {
                setStartDate(new Date().toISOString().split("T")[0]);
                setEndDate(new Date().toISOString().split("T")[0]);
                setCompany("");
                setEmployee("");
              }}
              className={`${buttonStyle} bg-[#2C2C2C] text-white`}
            >
              Clear
            </button>
          </div>
        </form>
      </div>
      <div>
        <div className="border-1 border-[#D9D9D9] rounded-md p-3 flex flex-col">
          <span className="text-[#b9b9b9] text-sm">
            {startDate} to {endDate}
          </span>
          <span className="font-bold">Attendance</span> <hr />
          <div>
            <AttendanceCard />
            <AttendanceCard />
            {/**need to map with real data */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceView;
