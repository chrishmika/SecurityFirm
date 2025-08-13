// import { useState } from "react";
// import AttendanceCard from "./Cards/AttendanceCard";
// import { FaToggleOff, FaToggleOn } from "react-icons/fa6";

// const AttendanceView = () => {
//   const [choice, setChoice] = useState(false);

//   // const [startDate, setStartDate] = useState(new Date().toISOString().split("T")[0]);
//   // const [endDate, setEndDate] = useState(new Date().toISOString().split("T")[0]);

//   const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
//   const [company, setCompany] = useState();
//   const [employee, setEmployee] = useState();

//   const handelChangeDate = (e) => {
//     setDate(e.target.value);
//   };
//   const handelChangeCompany = (e) => {
//     setCompany(e.target.value);
//   };
//   const handelChangeEmployee = (e) => {
//     setEmployee(e.target.value);
//   };

//   const submitHandeler = (e) => {
//     e.preventDefault();
//     try {
//       const response = { date, company, employee };
//       console.log(response);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div>
//       <div className=" flex justify-between sm:items-center mb-5 sm:flex-row flex-col gap-3">
//         {/*selector*/}
//         <div className="text-xl flex gap-3 items-center">
//           <span
//             className="text-4xl flex justify-items-start"
//             onClick={() => {
//               setChoice(!choice);
//               setDate(new Date().toISOString().split("T")[0]);
//               setCompany("");
//               setEmployee("");
//             }}>
//             {choice ? <FaToggleOn /> : <FaToggleOff />}
//           </span>
//           {choice ? `Company` : `Employee`}
//         </div>

//         <div className="pr-4 " onSubmit={submitHandeler}>
//           <form className="flex gap-2 flex-wrap  ">
//             <input
//               type="date"
//               onChange={handelChangeDate}
//               value={date}
//               name="date"
//               className="px-3 border-2 rounded-2xl"
//             />
//             <input
//               type="text"
//               onChange={choice ? handelChangeCompany : handelChangeEmployee}
//               value={choice ? company : employee}
//               name={choice ? "Company" : "Employee"}
//               placeholder={choice ? "Enter Company" : "Enter Employee"}
//               className="px-3 border-2 rounded-2xl"
//             />
//             <button className="cursor-pointer border-2 rounded-2xl w-20">Search</button>
//           </form>
//         </div>
//       </div>

//       <div>
//         <div className="border-1 border-[#D9D9D9] rounded-md p-3 flex flex-col">
//           <span className="text-[#b9b9b9] text-sm">
//             {date}
//             {/*{startDate} to {endDate}*/}
//           </span>
//           <span className="font-bold">Attendance</span> <hr />
//           <div>
//             <AttendanceCard />
//             {/**need to map with real data */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AttendanceView;

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
          {/* <div>
            <h2 className="font-bold">Find a Duty sheet</h2>
            <form action="" className="flex flex-col gap-2 border-3 p-4 rounded-2xl">
              <div className="flex gap-3">
                <div className="flex flex-col gap-1">
                  <label>Year and Month</label>
                  <input
                    type="month"
                    name="Year and Month"
                    className="outline-1  rounded-md px-4 h-10"
                    placeholder="Enter Data"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label>Company</label>
                <select
                  name="Company"
                  className="outline-1 w-fill rounded-md px-4 h-10"
                  placeholder="Enter Data">
                  <option>Select</option>
                  {companylist.map((company) => (
                    <option key={company._id}>{company.name}</option>
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
          </div> */}

          {/* ////////////////////////////// */}
          {/* create sheets */}
          <div>
            <h2 className="font-bold">Find By Company Name</h2>
            <form action="" className="flex flex-col gap-2 border-3 p-4 rounded-2xl">
              <div className="flex gap-3">
                <div className="flex flex-col gap-1">
                  <label>Year and Month</label>
                  <input
                    type="month"
                    name="Year and Month"
                    className="outline-1 w-fill rounded-md px-4 h-10"
                    placeholder="Enter Data"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label>Company</label>
                <select
                  name="Company"
                  className="outline-1 w-fill rounded-md px-4 h-10"
                  placeholder="Enter Data">
                  <option>Select</option>
                  <option value={"all"}>All *</option>
                  {companylist.map((company) => (
                    <option key={company._id}>{company.name}</option>
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
        </div>

        {/* toggle button */}
        <button
          onClick={() => {
            SetIsLoading(!isloading);
          }}>
          Click me 1
        </button>
      </div>

      {/* //////////////////////////////////////// */}

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

      {/* //////////////////////////////////////// */}

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

      {/* //////////////////////////////////////// */}

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
                    className={`${
                      duty.status === "absent"
                        ? "bg-red-400"
                        : duty.status === "present"
                        ? "bg-green-400"
                        : duty.status === "late"
                        ? "bg-yellow-400"
                        : "bg-white"
                    }`} //this is for attendance viewing area
                  >
                    <td className="p-2 border border-gray-300">
                      <input type="text" name="position" value={duty.employee.position} />
                    </td>

                    <td className="p-2 border border-gray-300">
                      <input
                        type="text"
                        className="bg-none font-bold px-2 w-full "
                        value={duty.employee.name}
                        readOnly
                      />
                    </td>

                    <td className="p-2 border border-gray-300">
                      <input className="px-2 w-full" type="text" value={duty.time} readOnly />
                    </td>

                    <td className="p-2 border border-gray-300">
                      <input
                        className=" px-2 w-full"
                        type="text"
                        value={`${duty.shift} hours`}
                        readOnly
                      />
                    </td>

                    <td className="p-2 border border-gray-300">
                      <input className="px-2 w-full" type="text" value={duty.remark} readOnly />
                    </td>

                    <td className="p-2 border border-gray-300">
                      <button className="bg-green-500 p-1 w-full cursor-pointer">Change</button>
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
