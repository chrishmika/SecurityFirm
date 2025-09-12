import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa6";

//import { companylist } from "../samples/companylist";
// import { sampleDuties } from "../samples/dutySample"; //sample data
// import { employeelist } from "../samples/employeelist";

import NumberLine from "./subComponents/NumberLine";
import DutySearchForm from "./subComponents/DutySearchForm";
import SideCalandeBar from "./subComponents/SideCalandeBar";

import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import LoadingScreen from "./subComponents/LoadingScreen";
import MonthInName from "./subComponents/MonthInName";
import { FaSearch } from "react-icons/fa";

const Schedule = () => {
  //for calender
  const [dateValue, setDateValue] = useState(new Date());

  //from date number line
  const [selectedDay, setSelectedDay] = useState(null);
  const [showData, setShowData] = useState(false);

  //for view the selected company
  const [selectedCompanyName, setSelectedCompanyName] = useState();
  const [selectedCompanyNameForCreateSheet, setSelectedCompanyNameForCreateSheet] = useState();
  const [companyId, setCompanyId] = useState("");
  const [selectedYear, setSelectedYear] = useState();
  const [selectedMonth, setSelectedMonth] = useState();

  //for gather data from table
  const [companylist, setCompanylist] = useState([]);
  const [employeelist, setEmployeelist] = useState([]);
  const [dutySet, setDutySet] = useState([]);

  //feels like dosent need this, for select relevent sheet file . ?_?
  const [isReady, setIsReady] = useState(false);

  //for loading screen
  const [loading, SetLoading] = useState(false);

  //take a name list of companies
  //need to take the names of employees and positions with this
  useEffect(() => {
    const getData = async () => {
      let response = await axios("http://localhost:5000/api/company/getCompanyList", {
        withCredentials: true,
      });
      console.log(response.data);
      setCompanylist(response.data);

      response = await axios("http://localhost:5000/api/employee/employeeList", {
        withCredentials: true,
      });
      setEmployeelist(response.data);
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
    console.log("1st is clicked");

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

  console.log("duty set", dutySet);

  const dataCollectionArray = [];

  //method to update data is need to be implimented here
  //this to send schedules of employees need to impliment
  const dataCollection = ({ day, employee, start, shift, remark }) => {
    const data = { day, employee, start, shift, remark };
    dataCollectionArray.push(data);
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
              Create Sheets For Duties
            </span>
          </h2>
          <DutySearchForm
            changeHandler={changeHandler}
            selectedCompanyName={selectedCompanyName}
            companylist={companylist}
            submitHandler={submitHandler}
          />
        </div>
      </div>

      {/* loading screen */}
      <div className={`col-span-full ${loading ? "block" : "hidden"}`}>
        <LoadingScreen />
      </div>

      {/* data is shown here after user enter the company name and submit*/}
      <div className={`col-span-2 bg-red-100 ${showData && !loading ? "block" : "hidden"} `}>
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

          {/* schedule title */}
          <h2 className="text-lg font-bold mb-5">
            {selectedCompanyName} Schedule . {` ${selectedMonth} - ${selectedYear} `}
          </h2>

          <NumberLine
            year={selectedYear}
            month={selectedMonth}
            onSelectDay={(day) => {
              setSelectedDay(day);
            }}
          />
        </div>

        {/* from here data need to be in input form an data is need to be filtered and on-arrow neet to be used for datalist */}
        {/* toggle button */}
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

                {/* from here data need to be in input form an data is need to be filtered and on-arrow neet to be used for datalist */}
                <tbody>
                  {/* this pard works after fetching the relevant sheet */}
                  {sheet.duties.map((duty, dindex) => (
                    <tr
                      key={dindex}
                      className={`${duty?.day == (selectedDay || 1) ? "box" : "hidden"}
                    `} //this is for attendance viewing area
                    >
                      {console.log("xxxx", duty.position)}

                      <td className="p-2 border border-gray-300">
                        <input
                          key={duty._id}
                          type="text"
                          name="position"
                          value={duty?.position || "-"}
                          readOnly
                        />
                      </td>

                      {/* employee */}
                      <td className="p-2 border border-gray-300">
                        <input
                          list={`dataScheduleNames-${dindex}`} // unique per row
                          onChange={formChangeHandler}
                          value={duty?.employee?.name || ""}
                          className="bg-blue-100 px-2 w-full no-arrow"
                        />

                        {console.log("positions", employeelist, duty?.position)}
                        <datalist id={`dataScheduleNames-${dindex}`}>
                          {employeelist
                            .filter((employee) => employee?.position == duty?.position)
                            .map((employee) => (
                              <>
                                <option key={employee._id} value={employee.name} />
                              </>
                            ))}
                        </datalist>
                      </td>
                      {/* start */}
                      {/* neet fix values in here in propper way */}
                      <td className="p-2 border border-gray-300">
                        <select
                          className="bg-blue-100 px-2 w-full"
                          type="text"
                          value={duty?.shift}
                          onChange={formChangeHandler}>
                          <option>Select</option>
                          <option value={12}>8am</option>
                          <option value={24}>6pm</option>
                        </select>
                      </td>

                      {/* shift */}
                      {/* neet fix values in here in propper way */}
                      <td className="p-2 border border-gray-300">
                        <select
                          className="bg-blue-100 px-2 w-full"
                          type="text"
                          value={`${duty?.start} hours`} //previous value
                          onChange={formChangeHandler}>
                          <option>Select</option>
                          <option value={12}>{"12"}</option>
                          <option value={24}>{"24"}</option>
                        </select>
                      </td>

                      {/* remark */}
                      <td className="p-2 border border-gray-300">
                        <input
                          className="bg-blue-100 px-2 w-full"
                          type="text"
                          value={duty?.remark || ""}
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
