/* eslint-disable react/prop-types */
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { sampleDuties } from "../samples/dutySample"; //sample data
import { companylist } from "../samples/companylist";
import { employeelist } from "../samples/employeelist";
import NumberLine from "./subComponents/NumberLine";
import { toast } from "react-toastify";
import DutySearchForm from "./subComponents/DutySearchForm";

// console.log(sampleDuties);

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
    console.log("1nd is pressed ");
  };

  const submitHandler2 = async (e) => {
    e.preventDefault();
    !selectedCompanyId ? toast.error("Company Name is Required") : SetIsLoading(!isloading); //take data from backend from tables
    console.log(selectedCompanyId);
    console.log(selectedYear);
    console.log(selectedMonth);
    console.log("2nd is pressed ");
  };

  const dataCollectionArray = [];

  const dataCollection = ({ day, employee, start, shift, remark }) => {
    const data = { day, employee, start, shift, remark };
    dataCollectionArray.push(data);
  };

  return (
    <div className="grid sm:grid-cols-3 grid-cols-1 gap-4">
      <div className={`col-span-2 bg-red-100 ${!showData && !isloading ? "box" : "hidden"}`}>
        <div className="grid grid-cols-2 gap-5 items-center justify-center h-full ">
          {/* while these2 are same can reduce them by making it as a function */}
          {/* Find Duty sheet */}
          <div>
            <h2 className="font-bold">Find a Duty sheet</h2>
            <DutySearchForm
              submitHandler={submitHandler}
              changeHandler={changeHandler}
              selectedCompanyId={selectedCompanyId}
              companylist={companylist}
              s
            />
          </div>

          {/* create sheets */}
          <div>
            <h2 className="font-bold">Create a Duty sheet</h2>
            <DutySearchForm
              changeHandler={changeHandler}
              selectedCompanyId={selectedCompanyId}
              companylist={companylist}
              submitHandler2={submitHandler2}
            />
          </div>
        </div>
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
