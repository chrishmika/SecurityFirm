import { useEffect, useState } from "react";
import axios from "axios";

import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";

import NumberLine from "./subComponents/NumberLine";
import DutySearchForm from "./subComponents/DutySearchForm";
import SideCalandeBar from "./subComponents/SideCalandeBar";
import LoadingScreen from "./subComponents/LoadingScreen";
import MonthInName from "./subComponents/MonthInName";

const Schedule = () => {
  const [dataCollection, setDataCollection] = useState([]);

  //for calender
  const [dateValue, setDateValue] = useState(new Date());

  //from date number line
  const [showData, setShowData] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);

  //for view the selected company
  const [companyId, setCompanyId] = useState("");
  const [selectedYear, setSelectedYear] = useState();
  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedCompanyName, setSelectedCompanyName] = useState();

  //for gather data from table
  const [dutySet, setDutySet] = useState([]);
  const [companylist, setCompanylist] = useState([]);
  const [employeelist, setEmployeelist] = useState([]);

  //for loading screen
  const [loading, SetLoading] = useState(false);

  //take a name list of companies
  //need to take the names of employees and positions with this
  useEffect(() => {
    //get the company list
    (async () => {
      let response = await axios("http://localhost:5000/api/company/getCompanyList", {
        withCredentials: true,
      });
      setCompanylist(response.data);
    })();

    //get the employee list
    (async () => {
      const response = await axios("http://localhost:5000/api/employee/employeeList", {
        withCredentials: true,
      });
      setEmployeelist(response.data);
    })();
  }, []);

  //selection form data submit handler
  const selectionSubmitHandler = async (e) => {
    e.preventDefault();

    if (!selectedCompanyName) {
      toast.error("Company Name is Required");
    } else {
      SetLoading(true);

      try {
        const data = { year: selectedYear, month: MonthInName(selectedMonth), company: companyId };

        const response = await axios.post(
          "http://localhost:5000/api/duty/viewSheetByDetails/",
          data,
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

  const changeHandler = (e) => {
    e.preventDefault();
    if (e.target.name == "yearMonth") {
      const year_month = e.target.value.split("-");
      setSelectedYear(year_month[0]); //year
      setSelectedMonth(year_month[1]); //month
    }

    if (e.target.name == "companyName") {
      //currently this take the id change as needed
      setCompanyId(companylist.find((company) => company.name == e.target.value)._id);
      setSelectedCompanyName(e.target.value); //this says name but it take _id
    }
  };

  console.log("data - Collection of table values(newly added: )", dataCollection);

  //for table data gathering from
  //add data to a object
  const formChangeHandler = (index, field, value, duty) => {
    setDataCollection((prev) => {
      const existing = [...prev];
      const rowIndex = existing.findIndex((r) => r._id === duty._id);

      // let updatedField = { [field]: value };
      // if (field === "employeeName") {
      //   const selectedEmp = employeelist.find((emp) => emp.name === value);

      //   updatedField = {
      //     employeeName: value,
      //     employeeId: selectedEmp?._id || null,
      //   };
      // }

      if (rowIndex !== -1) {
        // update existing row
        existing[rowIndex] = { ...existing[rowIndex], [field]: value };
        if (existing[rowIndex].employeeName === "") {
          existing.splice(rowIndex, 1); //remove the row it it has no name
        }
      } else {
        // add new row with default values from duty
        existing.push({
          _id: duty._id,
          day: duty.day,
          employeeName: value,
          employee: employeelist.find((emp) => emp.name === value)?._id || null,
          position: duty.position || "",
          start: duty.start || "",
          shift: duty.shift || "",
          remark: duty.remark || "",
          [field]: value,
        });
      }
      return existing;
    });
  };

  const formDataSubmitHandle = async (e) => {
    e.preventDefault();
    if (dataCollection.length == 0) {
      toast.error("no data added");
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:5000/api/duty/addDuty/${dutySet[0]._id}`,
        dataCollection,
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success("data added to database");
      }
    } catch (error) {
      toast.error("duty addition fails"), console.log(error.message);
    }
  };

  // const handleAdd = (duty) => {
  //   setDataCollection((prev) => {
  //     const existing = [...prev];
  //     const rowIndex = existing.findIndex((r) => r._id === duty._id);

  //     if (rowIndex === -1) {
  //       existing.push({
  //         _id: duty._id,
  //         day: duty.day,
  //         employee: duty.employee?.name || "",
  //         position: duty.position || "",
  //         start: duty.start || "",
  //         shift: duty.shift || "",
  //         remark: duty.remark || "",
  //       });
  //     }
  //     return existing;
  //   });

  //   toast.success("Row added/updated successfully!");
  // };

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
            submitHandler={selectionSubmitHandler}
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
          <form onSubmit={formDataSubmitHandle}>
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

                  {/* {console.log(sheet.duties)} */}

                  {/* from here data need to be in input form an data is need to be filtered and on-arrow neet to be used for datalist */}
                  <tbody>
                    {/* this pard works after fetching the relevant sheet */}
                    {sheet.duties.map((duty, dindex) => {
                      const currentRow = dataCollection.find((r) => r._id === duty._id) || duty;
                      // const currentRow = duty;

                      return (
                        <tr
                          key={duty._id}
                          className={`${duty?.day == (selectedDay || 1) ? "box" : "hidden"}`}>
                          {/* Position */}
                          <td className="p-2 border border-gray-300">
                            <input type="text" value={currentRow.position || "-"} readOnly />
                          </td>

                          {/* Employee */}
                          <td className="p-2 border border-gray-300">
                            <input
                              list={`dataScheduleNames-${dindex}`}
                              value={
                                currentRow?.employeeName || duty.employee?.name || "Not Assinged"
                              }
                              onChange={(e) =>
                                formChangeHandler(dindex, "employeeName", e.target.value, duty)
                              }
                              className="bg-blue-100 px-2 w-full no-arrow"
                            />
                            <datalist id={`dataScheduleNames-${dindex}`}>
                              {employeelist
                                .filter((employee) => employee?.position == duty?.position)
                                .map((employee) => (
                                  <option key={employee._id} value={employee.name} />
                                ))}
                            </datalist>
                          </td>

                          {/* Start */}
                          <td className="p-2 border border-gray-300">
                            <select
                              value={currentRow.start || duty.time}
                              onChange={(e) =>
                                formChangeHandler(dindex, "start", e.target.value, duty)
                              }
                              className="bg-blue-100 px-2 w-full">
                              <option>Select</option>
                              <option value="8am">8am</option>
                              <option value="6pm">6pm</option>
                            </select>
                          </td>

                          {/* Shift */}
                          <td className="p-2 border border-gray-300">
                            <select
                              value={currentRow.shift || ""}
                              onChange={(e) =>
                                formChangeHandler(dindex, "shift", e.target.value, duty)
                              }
                              className="bg-blue-100 px-2 w-full">
                              <option>Select</option>
                              <option value="12">12</option>
                              <option value="24">24</option>
                            </select>
                          </td>

                          {/* Remark */}
                          <td className="p-2 border border-gray-300">
                            <input
                              type="text"
                              value={currentRow.remark || ""}
                              onChange={(e) =>
                                formChangeHandler(dindex, "remark", e.target.value, duty)
                              }
                              className="bg-blue-100 px-2 w-full"
                            />
                          </td>

                          {/* Add Button  remove this button and use it for another work  like delete row data*/}
                          {/* <td className="p-2 border border-gray-300">
                          <button
                            className="bg-green-300 p-1 w-full cursor-pointer"
                            onClick={() => handleAdd(duty)}>
                            Add
                          </button>
                        </td> */}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ))}
            <button>Submit button</button>
          </form>
        </div>
      </div>

      {/* right side */}
      <div className={`bg-gray-100 ${showData ? "block" : "hidden"} `}>
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

// go and fix fix look data base and see the issues
