import { useState } from "react";
import AttendanceCard from "./Cards/AttendanceCard";
import { FaToggleOff, FaToggleOn } from "react-icons/fa6";

const AttendanceView = () => {
  const [choice, setChoice] = useState(false);

  // const [startDate, setStartDate] = useState(new Date().toISOString().split("T")[0]);
  // const [endDate, setEndDate] = useState(new Date().toISOString().split("T")[0]);

  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [company, setCompany] = useState("");
  const [employee, setEmployee] = useState("");

  const handelChangeDate = (e) => {
    setDate(e.target.value);
  };
  const handelChangeCompany = (e) => {
    setCompany(e.target.value);
  };
  const handelChangeEmployee = (e) => {
    setEmployee(e.target.value);
  };

  const submitHandeler = (e) => {
    e.preventDefault();
    try {
      const response = { date, company, employee };
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  //styles
  // const buttonStyle = "border-1 border-[#2C2C2C] rounded-md px-10 hover:cursor-pointer hover:bg-blue-500 hover:border-blue-500 font-medium min-h-8";
  // const inputFieldStyle = "border-1 rounded-md px-4 border-[#D9D9D9] placeholder:text-[#D9D9D9]";

  return (
    <div>
      <div className=" flex justify-between items-center mb-5">
        {/*selector*/}
        <div className="text-xl flex gap-3 items-center">
          <span
            className="text-4xl"
            onClick={() => {
              setChoice(!choice);
              setDate(new Date().toISOString().split("T")[0]);
              setCompany("");
              setEmployee("");
            }}
          >
            {choice ? <FaToggleOn /> : <FaToggleOff />}
          </span>
          {choice ? `Company` : `Employee`}
        </div>
        <div className="pr-4" onSubmit={submitHandeler}>
          <form className="flex gap-2">
            <input type="date" onChange={handelChangeDate} value={date} name="date" className="px-3 border-2 rounded-2xl" />
            <input type="text" onChange={choice ? handelChangeCompany : handelChangeEmployee} value={choice ? company : employee} name={choice ? "Company" : "Employee"} placeholder={choice ? "Enter Company" : "Enter Employee"} className="px-3 border-2 rounded-2xl" />
            <button className="cursor-pointer border-2 rounded-2xl w-20">Search</button>
          </form>
        </div>
      </div>

      <div>
        <div className="border-1 border-[#D9D9D9] rounded-md p-3 flex flex-col">
          <span className="text-[#b9b9b9] text-sm">
            {date}
            {/*{startDate} to {endDate}*/}
          </span>
          <span className="font-bold">Attendance</span> <hr />
          <div>
            <AttendanceCard />
            {/**need to map with real data */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceView;
