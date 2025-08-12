/* eslint-disable react/prop-types */
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { sampleDuties } from "../samples/dutySample"; //sample data
import { companylist } from "../samples/companylist";
import { employeelist } from "../samples/employeelist";

// console.log(sampleDuties);

const NumberLine = ({ month, onSelectDay }) => {
  const [clicked, setClicked] = useState(1);
  const [select, setSelect] = useState([]); //no idea why i put this

  let days =
    month === "February"
      ? 28
      : ["January", "March", "May", "July", "August", "October", "December"].includes(month)
      ? 31
      : 30;

  let boxes = [];

  for (let day = 1; day <= days; day++) {
    boxes.push(
      <div
        className={`flex justify-center px-3 ${
          clicked == day ? "bg-blue-300" : "bg-gray-300"
        } hover:bg-blue-100 cursor-pointer`}
        key={day}
        title={day}
        onClick={() => {
          console.log(day);
          setClicked(day);
          onSelectDay(day);
        }}>
        {day}
      </div>
    );
  }
  return (
    <div className="">
      <h2 className="text-lg font-bold mb-5">
        Company Duty Schedule – {month.toUpperCase()} {2025}
      </h2>
      <div className="flex gap-3 flex-wrap ">{boxes}</div>
    </div>
  );
};

const Schedule = () => {
  const [value, setValue] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [isloading, SetIsLoading] = useState(false);
  const [showData, setShowData] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const dataCollectionArray = [];

  const dataCollection = ({ day, employee, start, shift, remark }) => {
    const data = { day, employee, start, shift, remark };
    dataCollectionArray.push(data);
  };

  return (
    <div className="grid sm:grid-cols-3 grid-cols-1 gap-4">
      <div className={`col-span-2 bg-red-100 ${!showData && !isloading ? "box" : "hidden"}`}>
        <div className="grid grid-cols-2 gap-5 items-center justify-center h-full ">
          {/* Find Duty sheet */}
          <div>
            <h2 className="font-bold">Find a Duty sheet</h2>
            <form action="" className="flex flex-col gap-2 border-3 p-4 rounded-2xl">
              <div className="flex gap-3">
                <div className="flex flex-col gap-1">
                  <label>Year</label>
                  <input
                    type="number"
                    name="Year"
                    min={2000}
                    className="outline-cyan-900 outline-1 w-fill rounded-md pl-4 h-10"
                    placeholder="Enter Data"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label>Month</label>
                  <input
                    type="text"
                    name="Month"
                    className="outline-1 w-fill rounded-md px-4 h-10"
                    placeholder="Enter Data"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label>Company</label>
                <select
                  name="Company"
                  className="outline-1 w-fill rounded-md px-4 h-10"
                  placeholder="Enter Data">
                  {companylist.map(() => (
                    //////////this is where i need to add company names
                    <option key={id}>df</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-1">
                <input
                  type="submit"
                  value={`submit`}
                  className="bg-green-200 w-md cursor-pointer rounded-md h-10"
                />
                <input
                  type="reset"
                  value={`Clear`}
                  className="bg-red-200 w-2xs cursor-pointer rounded-md h-10"
                />
              </div>
            </form>
          </div>

          {/* create shhets */}
          <div>
            <h2 className="font-bold">Create a Duty sheet</h2>
            <form action="" className="flex flex-col gap-2 border-3 p-4 rounded-2xl">
              <div className="flex gap-3">
                <div className="flex flex-col gap-1">
                  <label>Year</label>
                  <input
                    type="number"
                    name="Year"
                    min={2000}
                    className="outline-cyan-900 outline-1 w-fill rounded-md pl-4 h-10"
                    placeholder="Enter Data"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label>Month</label>
                  <input
                    type="text"
                    name="Month"
                    className="outline-1 w-fill rounded-md px-4 h-10"
                    placeholder="Enter Data"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label>Company</label>
                <input
                  type="text"
                  name="Company"
                  className="outline-1 w-fill rounded-md px-4 h-10"
                  placeholder="Enter Data"
                />
              </div>

              <div className="flex gap-1">
                <input
                  type="submit"
                  value={`submit`}
                  className="bg-green-200 w-md cursor-pointer rounded-md h-10"
                />
                <input
                  type="reset"
                  value={`Clear`}
                  className="bg-red-200 w-2xs cursor-pointer rounded-md h-10"
                />
              </div>
            </form>
          </div>
        </div>

        {/* toggle button */}
        <button
          onClick={() => {
            SetIsLoading(!isloading);
          }}>
          Click me 1
        </button>
      </div>

      {/* ready  screen which shows all sheets and make user select one */}
      {/* <div className={`col-span-2 bg-red-100 ${isReady && !isloading ? "box" : "hidden"}`}> */}
      <div className={`col-span-2 bg-red-100 ${"hidden"}`}>
        {/* toggle button */}
        {`Loading....`}
        <button
          onClick={() => {
            SetIsLoading(!isloading);
            setShowData(!showData);
            setIsReady(!isReady);
          }}>
          Click me is ready
        </button>
      </div>

      {/* loading screen */}
      <div className={`col-span-2 bg-red-100 ${isloading ? "box" : "hidden"}`}>
        {/* toggle button */}
        {`Loading....`}
        <button
          onClick={() => {
            SetIsLoading(!isloading);
            setShowData(!showData);
            setIsReady(!isReady);
          }}>
          Click me 2
        </button>
      </div>

      {/* data is shown here after user enter the company name */}
      <div className={`col-span-2 bg-red-100 ${showData && !isloading ? "box" : "hidden"} `}>
        <div>
          <NumberLine
            month="January"
            onSelectDay={(day) => {
              setSelectedDay(day);
            }}
          />

          {/* toggle button */}
          <button
            onClick={() => {
              setShowData(!showData);
            }}>
            Click me 3
          </button>
        </div>

        <div>{selectedDay}</div>

        <div className="my-10 overflow-x-auto">
          {sampleDuties.map((sheet) => (
            <table
              className="table-auto w-full border-collapse border border-gray-400"
              key={selectedDay}>
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-2 border border-gray-300">Position</th>
                  <th className="p-2 border border-gray-300">Employee</th>
                  <th className="p-2 border border-gray-300">Start</th>
                  <th className="p-2 border border-gray-300">Shift</th>
                  <th className="p-2 border border-gray-300">Remark</th>
                  <th className="p-2 border border-gray-300"></th>
                </tr>
              </thead>

              <tbody>
                {sheet.duties.map((duty, dindex) => (
                  <tr
                    key={dindex}
                    // className={`${
                    //   duty.status === "absent"
                    //     ? "bg-red-400"
                    //     : duty.status === "present"
                    //     ? "bg-green-400"
                    //     : duty.status === "late"
                    //     ? "bg-yellow-400"
                    //     : "bg-white"
                    //}`}   //this is for attendance viewing area
                  >
                    <td className="p-2 border border-gray-300">
                      <input type="text" name="position" value={duty.employee.position} />
                    </td>

                    <td className="p-2 border border-gray-300">
                      <select className="bg-blue-100 px-2 w-full" type="text">
                        <option>Select</option>
                        <option value={duty.employee.name}>{duty.employee.name}</option>
                        <option value={"dd"}>dd</option>
                        <option value={"ee"}>ee</option>
                      </select>
                    </td>

                    <td className="p-2 border border-gray-300">
                      <select className="bg-blue-100 px-2 w-full" type="text">
                        <option>Select</option>
                        <option value={12}>{duty.time}</option>
                        <option value={24}>{duty.time}</option>
                      </select>
                    </td>

                    <td className="p-2 border border-gray-300">
                      <select className="bg-blue-100 px-2 w-full" type="text">
                        <option>Select</option>
                        <option value={12}>{duty.shift}</option>
                        <option value={24}>24h</option>
                      </select>
                    </td>

                    <td className="p-2 border border-gray-300">
                      <input className="bg-blue-100 px-2 w-full" type="text" value={duty.remark} />
                    </td>

                    <td className="p-2 border border-gray-300">
                      <button className="bg-green-300 p-1 w-full cursor-pointer">Add</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ))}
        </div>
      </div>

      {/* right side */}
      <div className="bg-yellow-100 ">
        <div className="">
          <span>Requirement</span>
          <div className="flex flex-col mx-10">
            <span>OSI : {"0 / 4"}</span>
            <span>JSO : {"0 / 2"}</span>
            <span>SO : {"0 / 3"}</span>
          </div>
        </div>

        <div className="text-2xl scale-[0.9] lg:scale-[0.7] md:scale-[0.6] sm:scale-[0.5] ">
          <Calendar onChange={setValue} value={value} />
        </div>
      </div>
    </div>
  );
};

export default Schedule;

//to get list of companies and employees to choose them on list to assign
//http://localhost:5000/api/company/getCompanyList
//http://localhost:5000/api/employee/employeeList
