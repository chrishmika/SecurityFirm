import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa6";

import { sampleDuties } from "../samples/dutySample"; //sample data
//import { companylist } from "../samples/companylist";
import { employeelist } from "../samples/employeelist";

import NumberLine from "./subComponents/NumberLine";
import DutySearchForm from "./subComponents/DutySearchForm";
import SideCalandeBar from "./subComponents/SideCalandeBar";
import axios from "axios";

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
  const [selectedCompanyName, setSelectedCompanyName] = useState();
  const [selectedCompanyNameForCreateSheet, setSelectedCompanyNameForCreateSheet] = useState();
  const [companyId, setCompanyId] = useState("");
  const [selectedYear, setSelectedYear] = useState();
  const [selectedMonth, setSelectedMonth] = useState();

  //for gather data from table
  const [companylist, setCompanylist] = useState([]);

  //feels like dosent need this, for select relevent sheet file . ?_?
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const response = await axios("http://localhost:5000/api/company/getCompanyList", {
        withCredentials: true,
      });
      console.log(response.data);
      setCompanylist(response.data);
    };
    getData();
  }, []);

  //for 1st searching from
  const changeHandler = (e) => {
    e.preventDefault();
    if (e.target.name == "yearMonth") {
      const year_month = e.target.value.split("-");
      setSelectedYear(year_month[0]);
      setSelectedMonth(year_month[1]);
    }
    if (e.target.name == "companyName") {
      //currently this take the id change as needed
      setCompanyId(companylist.find((company) => company.name == e.target.value)._id);
      setSelectedCompanyName(e.target.value);
    }
  };

  //for table data gathering from
  const formChangeHandler = () => {};

  const submitHandler = async (e) => {
    e.preventDefault();
    !selectedCompanyName ? toast.error("Company Name is Required") : SetIsLoading(!isloading); //take data from backend from tables
    console.log(selectedCompanyName);
    console.log(selectedYear);
    console.log(selectedMonth);
    console.log("1nd is pressed ");
  };

  const submitHandler2 = async (e) => {
    e.preventDefault();
    !selectedCompanyName ? toast.error("Company Name is Required") : SetIsLoading(!isloading); //take data from backend from tables
    console.log(selectedCompanyName);
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
    <div className="grid sm:grid-cols-3 grid-cols-1 gap-4 h-screen">
      <div className={`col-span-2  ${!showData && !isloading ? "box" : "hidden"}`}>
        <div className="grid grid-cols-2 gap-5 items-center justify-center h-full ">
          {/* while these2 are same can reduce them by making it as a function */}
          {/* Find Duty sheet */}
          <div>
            <h2 className="font-bold">Find a Duty sheet</h2>
            <DutySearchForm
              submitHandler={submitHandler}
              changeHandler={changeHandler}
              selectedCompanyName={selectedCompanyName}
              companylist={companylist}
            />
          </div>

          {/* create sheets */}
          <div>
            <h2 className="font-bold">Create a Duty sheet</h2>
            <DutySearchForm
              changeHandler={changeHandler}
              selectedCompanyName={selectedCompanyName}
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
      {/* data is shown here after user enter the company name and submit*/}
      <div className={`col-span-2 bg-red-100 ${showData && !isloading ? "box" : "hidden"} `}>
        <div>
          {/* back button */}
          <button
            onClick={() => {
              setShowData(!showData);
              setSelectedCompanyName("");
              setSelectedDay(null);
            }}
            className=" flex gap-1 items-center cursor-pointer font-bold mb-2">
            <FaArrowLeft /> {" Back"}
          </button>

          <h2 className="text-lg font-bold mb-5">
            {selectedCompanyName} Schedule . {` ${selectedMonth} - ${selectedYear} `}
          </h2>

          <NumberLine
            month="January"
            onSelectDay={(day) => {
              setSelectedDay(day);
            }}
          />

          {/* toggle button */}
        </div>
        <div>{selectedDay}</div> {/* this line is need to be removed later */}
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
                    className={`${duty.day == (selectedDay || 1) ? "box" : "hidden"}
                    `} //this is for attendance viewing area
                  >
                    <td className="p-2 border border-gray-300">
                      <input type="text" name="position" value={duty.employee.position} readOnly />
                    </td>

                    <td className="p-2 border border-gray-300">
                      <select
                        className="bg-blue-100 px-2 w-full"
                        type="text"
                        onChange={formChangeHandler}>
                        <option>Select</option>
                        {employeelist.map((employee) => (
                          <option
                            key={employee._id}
                            value={employee.name}
                            className={`${
                              employee.position == duty.employee.position ? "block" : "hidden"
                            }`}>
                            {employee.name}
                          </option>
                        ))}
                        {/* this above conditions duty.employee.position need to change as the position that ask by company */}
                      </select>
                    </td>

                    <td className="p-2 border border-gray-300">
                      <select
                        className="bg-blue-100 px-2 w-full"
                        type="text"
                        onChange={formChangeHandler}>
                        <option>Select</option>
                        <option value={12}>{"12"}</option>
                        <option value={24}>{"24"}</option>
                      </select>
                    </td>

                    <td className="p-2 border border-gray-300">
                      <select
                        className="bg-blue-100 px-2 w-full"
                        type="text"
                        onChange={formChangeHandler}>
                        <option>Select</option>
                        <option value={12}>8am</option>
                        <option value={24}>6pm</option>
                      </select>
                    </td>

                    <td className="p-2 border border-gray-300">
                      <input
                        className="bg-blue-100 px-2 w-full"
                        type="text"
                        value={duty.remark}
                        onChange={formChangeHandler}
                      />
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
      <div className={`bg-gray-200 ${showData ? "block" : "hidden"} `}>
        <SideCalandeBar
          showData={showData}
          companylist={companylist}
          selectedCompanyName={selectedCompanyName}
          setDateValue={setDateValue}
          dateValue={dateValue}
        />
      </div>
    </div>
  );
};

export default Schedule;

//to get list of companies and employees to choose them on list to assign
//http://localhost:5000/api/company/getCompanyList
//http://localhost:5000/api/employee/employeeList
//need to print the schedule
