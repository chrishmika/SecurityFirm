/* eslint-disable react/prop-types */
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { sampleDuties } from "../samples/dutySample"; //sample data

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

  const dataCollectionArray = [];
  const dataCollection = ({ day, employee, start, shift, remark }) => {
    const data = { day, employee, start, shift, remark };
    dataCollectionArray.push(data);
  };

  return (
    <div className="grid sm:grid-cols-3 grid-cols-1 gap-4">
      <div className="col-span-2 bg-red-100 ">
        <div>
          <NumberLine
            month="January"
            onSelectDay={(day) => {
              setSelectedDay(day);
            }}
          />
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
                  <th className="p-2 border border-gray-300">hi</th>
                </tr>
              </thead>
              <tbody>
                {sheet.duties.map((duty, dindex) => (
                  <tr key={dindex}>
                    <td className="p-2 border border-gray-300">
                      <input type="text" name="position" value={`OIC1`} />
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
                      <button className="bg-green-300 p-1 w-full">Add</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ))}
        </div>

        {/* <div>
          {sampleDuties.map((dutySet) => (
            <div key={dutySet._} className="mb-8">
              <table className="table-auto w-full border-collapse border border-gray-400 mt-4">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="p-2 border">Day</th>
                    <th className="p-2 border">Employee</th>
                    <th className="p-2 border">Shift</th>
                    <th className="p-2 border">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {dutySet.duties.map((d, i) => (
                    <tr key={i}>
                      <td className="p-2 border">{d.day}</td>
                      <td className="p-2 border">{d.employee}</td>
                      <td className="p-2 border">{d.shift}</td>
                      <td className="p-2 border">{d.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>

        <div className="flex gap-4 justify-end mx-5">
          <button className="bg-amber-500 p-3 rounded-full">Submit</button>
          <button className="bg-amber-500 p-3 rounded-full">Clear</button>
        </div>
        */}
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
