/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";

import { FaArrowLeft } from "react-icons/fa6";

//sample data
import { sampleDuties } from "../samples/dutySample";
import { companylist } from "../samples/companylist";

import NumberLine from "./subComponents/NumberLine";
import { toast } from "react-toastify";
import DutySearchForm from "./subComponents/DutySearchForm";
import SideCalandeBar from "./subComponents/SideCalandeBar";

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
  const [companyId, setCompanyId] = useState("");
  const [selectedYear, setSelectedYear] = useState();
  const [selectedMonth, setSelectedMonth] = useState();

  //for table data filling
  const [dutySet, setDutySet] = useState([]);

  //feels like dosent need this, for select relevent sheet file . ?_?
  const [isReady, setIsReady] = useState(false);

  //i need to use a useEffect to fetch company data and then need to fetch duty list that aligns with year,company id and month, it will resolve the issue that showing details of every month and year

  const changeHandler = (e) => {
    e.preventDefault();
    if (e.target.name == "yearMonth") {
      const year_month = e.target.value.split("-");
      console.log(year_month);

      setSelectedYear(year_month[0]);
      setSelectedMonth(year_month[1]);
    }
    if (e.target.name == "companyName") {
      //currently this take the id change as needed
      const company = JSON.parse(e.target.value);
      console.log(company);

      setCompanyId(company.id);
      setSelectedCompanyName(company.name);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    !selectedCompanyName ? toast.error("Company Name is Required") : SetIsLoading(!isloading); //take data from backend from tables
    console.log(selectedCompanyName);
    console.log(selectedYear);
    console.log(selectedMonth);

    let month;
    switch (selectedMonth) {
      case "01":
        month = "January";
        break;
      case 4:
        month = "April";
        break;
      case "12":
        month = "dec";
        break;
    }

    const { data } = await axios.post(
      "http://localhost:5000/api/duty/viewSheetByDetails/",
      { year: selectedYear, month: month, company: companyId },
      { withCredentials: true }
    );
    console.log(data);
    setDutySet(data);
  };

  return (
    <div className="grid sm:grid-cols-3 grid-cols-1 h-screen gap-4">
      <div className={`col-span-2 ${!showData && !isloading ? "block" : "hidden"}`}>
        <div className="grid grid-cols-2 gap-5 items-center justify-center h-full ">
          <div>
            <h2 className="font-bold">Find By Company Name</h2>
            <DutySearchForm
              submitHandler={submitHandler}
              changeHandler={changeHandler}
              selectedCompanyName={selectedCompanyName}
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
              setSelectedCompanyName("");
              setSelectedDay(null);
            }}
            className=" flex gap-1 items-center cursor-pointer font-bold mb-2">
            <FaArrowLeft /> {" Back"}
          </button>

          <h2 className="text-lg font-bold mb-5">
            {selectedCompanyName} Attendance . {` ${selectedMonth} - ${selectedYear} `}
          </h2>

          <NumberLine
            month="January"
            onSelectDay={(day) => {
              setSelectedDay(day);
            }}
          />
        </div>

        <div className="my-10 overflow-x-auto">
          {Array.isArray(dutySet) &&
            dutySet.map((sheet) => (
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

        <div className="flex gap-2 justify-end">
          <button className="rounded-2xl bg-amber-300 p-3 cursor-pointer">Print</button>
          <button className="rounded-2xl bg-amber-300 p-3 cursor-pointer">Print All</button>
          {/* printing part is need to be done */}
        </div>
      </div>

      {/* right side */}
      <div className={`bg-gray-200  ${showData ? "block" : "hidden"} `}>
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
