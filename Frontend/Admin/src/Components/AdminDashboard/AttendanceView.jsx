/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";

import SideCalandeBar from "./subComponents/SideCalandeBar";
import NumberLine from "./subComponents/NumberLine";
import DutySearchForm from "./subComponents/DutySearchForm";

import axios from "axios";
import LoadingScreen from "./subComponents/LoadingScreen";
import MonthInName from "./subComponents/MonthInName";

const Schedule = () => {
  //for calender
  const [dateValue, setDateValue] = useState(new Date());

  //from date number line
  const [selectedDay, setSelectedDay] = useState(null);
  const [showData, setShowData] = useState(false);

  //for loading screen
  const [loading, SetLoading] = useState(false);

  //for view the selected company
  const [selectedCompanyName, setSelectedCompanyName] = useState();
  const [companyId, setCompanyId] = useState("");
  const [selectedYear, setSelectedYear] = useState();
  const [selectedMonth, setSelectedMonth] = useState();

  //for table data filling
  const [dutySet, setDutySet] = useState([]);
  const [companylist, setCompanylist] = useState([]);

  //i need to use a useEffect to fetch company data and then need to fetch duty list that aligns with year,company id and month, it will resolve the issue that showing details of every month and year

  useEffect(() => {
    (async () => {
      const response = await axios("http://localhost:5000/api/company/getCompanyList", {
        withCredentials: true,
      });
      if (!response) {
        return toast.error("Error on server");
      }
      setCompanylist(response.data);
    })();
  }, []);

  const changeHandler = (e) => {
    e.preventDefault();
    if (e.target.name == "yearMonth") {
      const year_month = e.target.value.split("-");
      console.log(year_month);

      setSelectedYear(year_month[0]);
      setSelectedMonth(year_month[1]);
    }

    if (e.target.name == "companyName") {
      const company = e.target.value;
      setCompanyId(companylist.find((company) => company.name == e.target.value)._id);
      setSelectedCompanyName(company);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!selectedCompanyName) {
      toast.error("Company Name is Required");
    } else {
      SetLoading(true);

      try {
        const response = await axios.post(
          "http://localhost:5000/api/duty/viewSheetByDetails/",
          { year: selectedYear, month: MonthInName(selectedMonth), company: companyId },
          { withCredentials: true }
        );
        setDutySet(response.data);
        SetLoading(false);
        setShowData(true);
      } catch (error) {
        SetLoading(false);
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className=" flex justify-center items-center gap-4 h-screen">
      <div
        className={`flex gap-5 items-center justify-center h-full ${
          !showData && !loading ? "block" : "hidden"
        }`}>
        {/* Find Duty sheet */}
        <div className="w-2/3 ">
          <h2 className="p-4 border-b-0 bg-gray-500  rounded-t-2xl">
            <span className="text-white items-center font-bold flex gap-3">
              <FaSearch />
              Find By Company Name
            </span>
          </h2>
          <DutySearchForm
            submitHandler={submitHandler}
            changeHandler={changeHandler}
            selectedCompanyName={selectedCompanyName}
            companylist={companylist}
          />
        </div>
      </div>

      {/* loading screen */}
      <div className={`col-span-full ${loading ? "block" : "hidden"}`}>
        <LoadingScreen />
      </div>

      {/* //////////////////////////////////////// */}
      {/* data is shown here after user enter the company name */}
      <div className={`col-span-2  ${showData && !loading ? "block" : "hidden"} `}>
        <div>
          {/* back button */}
          <button
            onClick={() => {
              setShowData(!showData);
              // setSelectedCompanyName("");
              setSelectedDay(null);
            }}
            className=" flex gap-1 items-center cursor-pointer font-bold mb-2">
            <FaArrowLeft /> {" Back"}
          </button>

          <h2 className="text-lg font-bold mb-5">
            {selectedCompanyName} Attendance . {` ${selectedMonth} - ${selectedYear} `}
          </h2>

          <NumberLine
            year={selectedYear}
            month={selectedMonth}
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
                <thead className="bg-gray-200 cursor-default">
                  <tr>
                    <th className="p-2 border border-gray-300">Position</th>
                    <th className="p-2 border border-gray-300">Employee</th>
                    <th className="p-2 border border-gray-300">Start</th>
                    <th className="p-2 border border-gray-300">Shift</th>
                    <th className="p-2 border border-gray-300">Check In</th>
                    <th className="p-2 border border-gray-300">Check Out</th>
                    <th className="p-2 border border-gray-300">Remark</th>
                    <th className="p-2 border border-gray-300"></th>
                  </tr>
                </thead>

                <tbody>
                  {sheet.duties.map((duty, dindex) => (
                    <tr
                      key={dindex}
                      className={` ${
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
                      <td className="p-2 border border-gray-300 ">
                        <input
                          type="text"
                          name="position"
                          value={duty.employee?.position}
                          className="outline-0 cursor-default"
                          readOnly
                        />
                        {console.log("duty,", duty)}
                      </td>

                      <td className="p-2 border border-gray-300">
                        <input
                          type="text"
                          className="bg-none font-bold px-2 w-full outline-0 cursor-default"
                          value={duty.employee?.name || "Not Assinged"}
                          readOnly
                        />
                      </td>

                      {/* neet fix values in here in propper way */}
                      <td className="p-2 border border-gray-300">
                        <input
                          className="px-2 w-full outline-0 cursor-default"
                          type="text"
                          value={duty.time || "-"}
                          readOnly
                        />
                      </td>

                      {/* neet fix values in here in propper way */}
                      <td className="p-2 border border-gray-300">
                        <input
                          className=" px-2 w-full outline-0 cursor-default"
                          type="text"
                          value={`${duty.shift || "-"} hours`}
                          readOnly
                        />
                      </td>

                      <td className="p-2 border border-gray-300">
                        <input
                          className="px-2 w-full outline-0 cursor-default"
                          type="text"
                          value={duty.checkIn?.split("T")[1]?.substring(0, 5) || "-"}
                          readOnly
                        />
                      </td>
                      <td className="p-2 border border-gray-300">
                        <input
                          className="px-2 w-full outline-0 cursor-default"
                          type="text"
                          value={duty.checkOut?.split("T")[1]?.substring(0, 5) || "Not Yet"}
                          readOnly
                        />
                      </td>
                      <td className="p-2 border border-gray-300">
                        <input
                          className="px-2 w-full outline-0 cursor-default"
                          type="text"
                          value={duty.remark || "-"}
                          readOnly
                        />
                      </td>

                      <td className="p-2 border border-gray-300">
                        {duty.status == "present" ? (
                          <button className={`bg-red-500 p-1 w-full cursor-pointer font-bold`}>
                            Absent
                          </button>
                        ) : (
                          <button className={`bg-green-500 p-1 w-full cursor-pointer font-bold`}>
                            Present
                          </button>
                        )}
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
      <div className={`bg-gray-200  ${showData ? "block" : "hidden"}`}>
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
