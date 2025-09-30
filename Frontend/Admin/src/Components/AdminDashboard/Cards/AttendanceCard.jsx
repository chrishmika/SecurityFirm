import React, { useState } from "react";

const inputFieldStyle = "border-1 rounded-md px-4 border-[#D9D9D9] placeholder:text-[#D9D9D9]";
//need to change values when it taken from database
const AttendanceCard = () => {
  const [startDate, setStartDate] = useState(new Date().toISOString().split("T")[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split("T")[0]);
  const [startTime, setStartTime] = useState(new Date().toISOString().split("T")[1].split(".")[0]);
  const [endTime, setEndTime] = useState(new Date().toISOString().split("T")[1].split(".")[0]);
  const [company, setCompany] = useState("White House PLC");
  const [employee, setEmployee] = useState("Shehan Chrishmika");
  const [id, setId] = useState("200101540452");

  const [editInterface, setEditInterface] = useState(false);
  const editHandeler = () => {
    setEditInterface(!editInterface);
    console.log("edit interface");
  };
  return (
    <React.Fragment>
      <div
        className={`flex md:justify-between justify-normal my-1.5 flex-col md:flex-row hover:bg-[#e9e9e9] hover:cursor-pointer p-2`}
        onClick={editHandeler}>
        <div className="flex flex-col pr-10">
          <span className="font-bold">{`Name`}</span>
          <span className="text-[#b9b9b9]">{`Place`}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold">{`Check In`}</span>
          <span className="flex gap-10 md:pr-10 text-[#b9b9b9] pl-1.5">
            <span>{`03-05-2025`}</span>
            <span>{startTime}</span>
          </span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold">{`Check Out`}</span>
          <span className="flex gap-10 md:pr-10 text-[#b9b9b9] pl-1.5">
            <span>{`03-05-2025`}</span>
            <span>{`08.00am`}</span>
          </span>
        </div>
      </div>
      <hr />
      {/**edit screen */}
      <div
        className={`fixed inset-0  bg-none backdrop-blur-xs ${editInterface ? "flex" : "hidden"}`}>
        <div
          className={`p-8 flex flex-col fixed inset-0 bg-white bg-opacity-50 items-center justify-center rounded-2xl text-black shadow-xl w-fit h-fit mx-auto my-auto ${
            editInterface ? "flex" : "hidden"
          }`}>
          <div className="flex flex-row gap-10 justify-self-start items-center">
            <span className="md:block hidden h-26 w-26 bg-amber-500 rounded-full"></span>
            <div className="flex flex-col">
              <span>
                <input
                  type="text"
                  className={`border-1 rounded-md px-2 my-1 border-[#ffffff22]`}
                  value={employee}
                  onChange={(e) => setEmployee(e.target.value)}
                />
              </span>
              <span>
                <input
                  type="text"
                  className={`border-1 rounded-md px-2 my-1 border-[#ffffff22]`}
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                />
              </span>
              <span>
                <input
                  type="text"
                  className={`border-1 rounded-md px-2 my-1 border-[#ffffff22]`}
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </span>
            </div>
          </div>
          <div className="flex gap-8 flex-col md:flex-row">
            <div className="flex flex-col gap-5 mt-5">
              <span>Check in -</span>
              <span>
                Date:{" "}
                <input
                  type="date"
                  className={inputFieldStyle}
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </span>
              <span>
                Time:{" "}
                <input
                  type="time"
                  className={inputFieldStyle}
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </span>
            </div>
            <div className="flex flex-col  gap-5 mt-5">
              <span>Check Out -</span>
              <span>
                Date:{" "}
                <input
                  type="date"
                  className={inputFieldStyle}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </span>
              <span>
                Time:{" "}
                <input
                  type="time"
                  className={inputFieldStyle}
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-5">
            <button
              onClick={() => {
                // alert("Do You want To Edit");
                setEditInterface(false);
              }}
              className=" text-black font-bold border-1 w-20 hover:bg-[#5932EA] hover:text-white rounded-md mx-auto mt-7 py-2 hover:cursor-pointer">
              Save
            </button>
            <button
              onClick={() => {
                setEditInterface(false);
              }}
              className="border-1 text-black font-bold w-20 hover:bg-[#5932EA] hover:text-white rounded-md mx-auto mt-7 py-2 hover:cursor-pointer">
              Close
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AttendanceCard;
