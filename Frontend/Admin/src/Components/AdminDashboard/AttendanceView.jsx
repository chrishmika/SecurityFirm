/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa6";

import SideCalandeBar from "./subComponents/SideCalandeBar";
import NumberLine from "./subComponents/NumberLine";
import DutySearchForm from "./subComponents/DutySearchForm";

import axios from "axios";

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
  const [companylist, setCompanylist] = useState([]);

  //const { isLoading,SetLoading } = useAuthContext();  //used in feature at last

  //i need to use a useEffect to fetch company data and then need to fetch duty list that aligns with year,company id and month, it will resolve the issue that showing details of every month and year

  useEffect(() => {
    const getData = async () => {
      const response = await axios("http://localhost:5000/api/company/getCompanyList", {
        withCredentials: true,
      });
      if (!response) {
        return toast.error("Error on server");
      }
      setCompanylist(response.data);
    };
    getData();
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
      SetIsLoading(true);

      let month;
      switch (selectedMonth) {
        case "01":
          month = "January";
          break;
        case "02":
          month = "February";
          break;
        case "03":
          month = "March";
          break;
        case "04":
          month = "April";
          break;
        case "05":
          month = "May";
          break;
        case "06":
          month = "June";
          break;
        case "07":
          month = "July";
          break;
        case "08":
          month = "August";
          break;
        case "09":
          month = "September";
          break;
        case "10":
          month = "Octomber";
          break;
        case "11":
          month = "November";
          break;
        case "12":
          month = "December";
          break;
      }
      try {
        const response = await axios.post(
          "http://localhost:5000/api/duty/viewSheetByDetails/",
          { year: selectedYear, month: month, company: companyId },
          { withCredentials: true }
        );
        setDutySet(response.data);
        SetIsLoading(false);
        setShowData(true);
      } catch (error) {
        SetIsLoading(false);
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="grid sm:grid-cols-3 grid-cols-1 h-screen gap-4">
      <div className={`col-span-2 ${!showData && !isloading ? "block" : "hidden"}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center justify-center h-full ">
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

      {/* loading screen */}
      <div className={`col-span-2 bg-red-100 ${isloading ? "block" : "hidden"}`}>
        {/* toggle button */}
        {`Loading....`}
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
                          value={duty.employee?.position}
                          className="outline-0"
                          readOnly
                        />
                        {console.log("duty,", duty)}
                      </td>

                      <td className="p-2 border border-gray-300">
                        <input
                          type="text"
                          className="bg-none font-bold px-2 w-full outline-0"
                          value={duty.employee?.name}
                          readOnly
                        />
                      </td>

                      {/* neet fix values in here in propper way */}
                      <td className="p-2 border border-gray-300">
                        <input
                          className="px-2 w-full outline-0"
                          type="text"
                          value={duty.time}
                          readOnly
                        />
                      </td>

                      {/* neet fix values in here in propper way */}
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
