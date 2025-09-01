import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa6";

//import { companylist } from "../samples/companylist";
import { sampleDuties } from "../samples/dutySample"; //sample data
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
  const [dutySet, setDutySet] = useState([]);

  //feels like dosent need this, for select relevent sheet file . ?_?
  const [isReady, setIsReady] = useState(false);

  //take a name list of companies
  //need to take the names of employees and positions with this
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

  const monthInName = (selectedMonth) => {
    switch (selectedMonth) {
      case "01":
        return "January";
      case "02":
        return "February";
      case "03":
        return "March";
      case "04":
        return "April";
      case "05":
        return "May";
      case "06":
        return "June";
      case "07":
        return "July";
      case "08":
        return "August";
      case "09":
        return "September";
      case "10":
        return "Octomber";
      case "11":
        return "November";
      case "12":
        return "December";
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
      SetIsLoading(true);
      const month = monthInName(selectedMonth);

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

  // const submitHandler2 = async (e) => {
  //   console.log("2nd is clicked");

  //   e.preventDefault();
  //   if (!selectedCompanyName) {
  //     toast.error("Company Name is Required");
  //   } else {
  //     SetIsLoading(true);
  //     setSelectedCompanyNameForCreateSheet(selectedCompanyName);
  //     const month = monthInName(selectedMonth);

  //     //in here i need to neet to create an new sheet change the axios endpoint
  //     try {
  //       const response = await axios.post(
  //         "http://localhost:5000/api/duty/viewSheetByDetails/",
  //         { year: selectedYear, month: month, company: companyId },
  //         { withCredentials: true }
  //       );
  //       setDutySet(response.data);
  //       SetIsLoading(false);
  //       setShowData(true);
  //     } catch (error) {
  //       SetIsLoading(false);
  //       toast.error(error.response.data.message);
  //     }
  //   }
  //   console.log(selectedMonth);
  // };
  console.log("duty set", dutySet);

  const dataCollectionArray = [];

  //method to update data is need to be implimented here

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
            <h2 className="font-bold">Create Assign Duties to sheets</h2>
            <DutySearchForm
              changeHandler={changeHandler}
              selectedCompanyName={selectedCompanyName}
              companylist={companylist}
              submitHandler={submitHandler}
            />
          </div>
        </div>
      </div>

      {/* loading screen */}
      <div className={`col-span-2 bg-red-100 ${isloading ? "block" : "hidden"}`}>
        {`Loading....`}
      </div>

      {/* data is shown here after user enter the company name and submit*/}
      <div className={`col-span-2 bg-red-100 ${showData && !isloading ? "block" : "hidden"} `}>
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
                      <td className="p-2 border border-gray-300">
                        <input
                          key={duty._id}
                          type="text"
                          name="position"
                          value={duty?.position}
                          readOnly
                        />
                      </td>

                      <td className="p-2 border border-gray-300">
                        <input
                          list={`dataScheduleNames-${dindex}`} // unique per row
                          onChange={formChangeHandler}
                          value={duty?.employee?.name}
                          className="bg-blue-100 px-2 w-full no-arrow"
                        />

                        <datalist id={`dataScheduleNames-${dindex}`}>
                          {employeelist
                            .filter((employee) => employee?.position === duty.employee?.position)
                            .map((employee) => (
                              <option key={employee._id} value={employee.name} />
                            ))}
                        </datalist>
                      </td>
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

                      <td className="p-2 border border-gray-300">
                        <input
                          className="bg-blue-100 px-2 w-full"
                          type="text"
                          value={duty?.remark}
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
