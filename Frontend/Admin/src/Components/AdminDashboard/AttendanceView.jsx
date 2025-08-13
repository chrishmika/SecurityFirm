/* eslint-disable react/prop-types */
import { useState } from "react";

import { FaArrowLeft } from "react-icons/fa6";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

//sample data
import { sampleDuties } from "../samples/dutySample";
import { companylist } from "../samples/companylist";

import NumberLine from "./subComponents/NumberLine";
import { toast } from "react-toastify";
import DutySearchForm from "./subComponents/DutySearchForm";

const Schedule = () => {
  //for calender
  const [dateValue, setDateValue] = useState(new Date());

  //from date number line
  const [selectedDay, setSelectedDay] = useState(null);
  const [showData, setShowData] = useState(false);

  //for loading screen
  const [isloading, SetIsLoading] = useState(false);

  //for view the selected company
  const [selectedCompanyId, setSelectedCompanyId] = useState();
  const [selectedYear, setSelectedYear] = useState();
  const [selectedMonth, setSelectedMonth] = useState();

  //feels like dosent need this, for select relevent sheet file . ?_?
  const [isReady, setIsReady] = useState(false);

  //i need to use a useEffect to fetch company data and then need to fetch duty list that aligns with year,company id and month, it will resolve the issue that showing details of every month and year

  const changeHandler = (e) => {
    e.preventDefault();
    if (e.target.name == "yearMonth") {
      const year_month = e.target.value.split("-");
      setSelectedYear(year_month[0]);
      setSelectedMonth(year_month[1]);
    }
    if (e.target.name == "companyName") {
      //currently this take the id change as needed
      const company = e.target.value;
      setSelectedCompanyId(company);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    !selectedCompanyId ? toast.error("Company Name is Required") : SetIsLoading(!isloading); //take data from backend from tables
    console.log(selectedCompanyId);
    console.log(selectedYear);
    console.log(selectedMonth);
  };

  return (
    <div className="grid sm:grid-cols-3 grid-cols-1 gap-4">
      <div className={`col-span-2 ${!showData && !isloading ? "block" : "hidden"}`}>
        <div className="grid grid-cols-2 gap-5 items-center justify-center h-full ">
          <div>
            <h2 className="font-bold">Find By Company Name</h2>
            <DutySearchForm
              submitHandler={submitHandler}
              changeHandler={changeHandler}
              selectedCompanyId={selectedCompanyId}
              companylist={companylist}
            />
          </div>
        </div>
      </div>

      {/* //////////////////////////////////////// */}
      {/* loading screen */}
      <div className={`col-span-2 bg-red-100 ${isloading ? "block" : "hidden"}`}>
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
      <div className={`col-span-2  ${showData && !isloading ? "block" : "hidden"} `}>
        <div>
          {/* back button */}
          <button
            onClick={() => {
              setShowData(!showData);
              setSelectedCompanyId("");
              setSelectedMonth(null);
              setSelectedDay(null);
            }}
            className=" flex gap-1 items-center cursor-pointer font-bold mb-2">
            <FaArrowLeft /> {" Back"}
          </button>

          <h2 className="text-lg font-bold mb-5">
            {selectedCompanyId} Attendance . {` ${selectedMonth} - ${selectedYear} `}
          </h2>

          <NumberLine
            month="January"
            onSelectDay={(day) => {
              setSelectedDay(day);
            }}
          />
        </div>

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
                    }
                    ${duty.day == (selectedDay || 1) ? "box" : "hidden"}
                    `} //this is for attendance viewing area
                  >
                    <td className="p-2 border border-gray-300">
                      <input
                        type="text"
                        name="position"
                        value={duty.employee.position}
                        className="outline-0"
                        readOnly
                      />
                    </td>

                    <td className="p-2 border border-gray-300">
                      <input
                        type="text"
                        className="bg-none font-bold px-2 w-full outline-0"
                        value={duty.employee.name}
                        readOnly
                      />
                    </td>

                    <td className="p-2 border border-gray-300">
                      <input
                        className="px-2 w-full outline-0"
                        type="text"
                        value={duty.time}
                        readOnly
                      />
                    </td>

                    <td className="p-2 border border-gray-300">
                      <input
                        className=" px-2 w-full outline-0"
                        type="text"
                        value={`${duty.shift} hours`}
                        readOnly
                      />
                    </td>
                    <td className="p-2 border border-gray-300">
                      <input
                        className="px-2 w-full outline-0"
                        type="text"
                        value={duty.remark}
                        readOnly
                      />
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

      <div className="bg-gray-200 h-screen  ">
        <div className={`${showData ? "block" : "hidden"} font-bold ml-5`}>
          <span>Requirement</span>

          <div className="flex flex-col mx-10">
            {companylist.map((company) =>
              company.count.map((requirement) => (
                <span
                  key={requirement._id}
                  className={company.name == selectedCompanyId ? "block" : "hidden"}>
                  {requirement.position} : {requirement.amount}
                </span>
              ))
            )}
          </div>
        </div>

        <div className="text-2xl scale-[0.9] lg:scale-[0.7] md:scale-[0.6] sm:scale-[0.5] ">
          <Calendar onChange={setDateValue} value={dateValue} />
        </div>
      </div>
    </div>
  );
};

export default Schedule;

//to get list of companies and employees to choose them on list to assign
//http://localhost:5000/api/company/getCompanyList
//http://localhost:5000/api/employee/employeeList
