import { useState } from "react";
import Calendar from "react-calendar";

import "react-calendar/dist/Calendar.css";
import { toast } from "react-toastify";

function Schedule() {
  const [value, setValue] = useState(new Date());
  const [schedule, setSchedule] = useState({});

  const year = value.getFullYear();
  const month = value.getMonth(); // 0-based (Jan = 0)
  const day = value.getDate();

  const handelChange = (e) => {
    e.preventDefault();
    setSchedule((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandeler = (e) => {
    e.preventDefault();

    // if (e.target.value == null) {
    //   toast.error("All Fields Must Be Filled");
    //   return;
    // }

    console.log(" year: ", year, " month: ", month, " day: ", day);
    console.log("schedule :", schedule);
  };

  const shift = [8, 12, 24];
  const Employees = [
    { _id: 1, name: "gayan" },
    { _id: 2, name: "niro" },
    { _id: 3, name: "saha" },
  ];
  const Companies = [
    { _id: 1, name: "Abans" },
    { _id: 2, name: "Singer" },
    { _id: 3, name: "Cocacola" },
  ];

  const style = `border-1 rounded-md px-4 md:w-[250px]`;

  return (
    <div className="flex flex-col lg:flex-row gap-7 md:justify-evenly items-center h-screen">
      <div className="text-2xl scale-[0.9] lg:scale-[1.3] md:scale-[1.1] sm:scale-[1] ">
        <Calendar onChange={setValue} value={value} />
      </div>

      <div className="w-px h-100 bg-gray-400 lg:block hidden"></div>

      <div className="flex gap-4 text-2xl  rounded-md">
        <form className="flex gap-7 flex-wrap flex-col" onSubmit={submitHandeler}>
          <div className="flex gap-10 justify-between">
            <span className="font-bold">Company</span>

            <select name="Company" className={style} onChange={handelChange} required>
              <option>Select</option>
              {Companies.map((company) => {
                return (
                  <option key={company._id} value={company.name}>
                    {company.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex gap-10 justify-between">
            <span className="font-bold">Security</span>
            <select name="Employee" className={style} onChange={handelChange} required>
              <option>Select</option>
              {Employees.map((employee) => {
                return (
                  <option key={employee._id} value={employee.name}>
                    {employee.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex gap-10 justify-between">
            <span className="font-bold">Start Time</span>
            <select name="Time" className={style} onChange={handelChange} required>
              <option>Select</option>
              <option value="8.00 am">8.00 am</option>
              <option value="6.00 pm">6.00 pm</option>
            </select>
          </div>

          <div className="flex gap-10 justify-between">
            <span className="font-bold">Shift</span>
            <select name="Shift" className={style} onChange={handelChange} required>
              <option>Select</option>
              {shift.map((period) => {
                return (
                  <option key={period} value={period}>
                    {period}
                  </option>
                );
              })}
            </select>
          </div>

          <button className=" bg-[#2c2c2c]  hover:bg-[#716acd] p-2 rounded-md md:w-auto w-full text-white font-bold cursor-pointer">Submit</button>
        </form>
      </div>
      {console.log(year)}
      {console.log(month)}
      {console.log(day)}
    </div>
  );
}

export default Schedule;

//backend is need to be implimented
