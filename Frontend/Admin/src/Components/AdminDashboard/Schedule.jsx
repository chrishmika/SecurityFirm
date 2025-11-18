import { useEffect, useState } from "react";
import axios from "axios";

import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";

import NumberLine from "../../utils/NumberLine";
import DutySearchForm from "./Forum/DutySearchForm";
import SideCalandeBar from "../../utils/SideCalandeBar";
import LoadingScreen from "../../utils/LoadingScreen";
import MonthInName from "../../utils/MonthInName";
import PrintEmployeeData from "../../utils/PrintSchedule";

//styles
import { adminStyles as styles } from "../styles/adminStyles";

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
      let response = await axios("/api/company/getCompanyList", {
        withCredentials: true,
      });
      setCompanylist(response.data);
    })();

    //get the employee list
    (async () => {
      const response = await axios("/api/employee/employeeList", {
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

        const response = await axios.post("/api/duty/viewSheetByDetails/", data, {
          withCredentials: true,
        });
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

  //for table data gathering from
  //add data to a object
  const formChangeHandler = (index, field, value, duty) => {
    setDataCollection((prev) => {
      const existing = [...prev];

      const rowIndex = existing.findIndex((r) => r._id === duty._id);
      console.log("existing", existing);

      let updatedRow = rowIndex !== -1 ? { ...existing[rowIndex] } : { ...duty };
      console.log("updatedRow", updatedRow);

      // special case for employee
      if (field === "employeeName") {
        const selectedEmp = employeelist.find((emp) => emp.name === value);
        updatedRow.employeeName = value;
        updatedRow.employee = selectedEmp?._id || null;
      } else {
        updatedRow[field] = value;
      }

      if (rowIndex !== -1) {
        existing[rowIndex] = updatedRow; // update existing row
      } else {
        existing.push(updatedRow); // add new row
      }

      return existing;
    });
  };

  const formDataSubmitHandle = async (e) => {
    e.preventDefault();

    // if the fields have no edits
    if (dataCollection.length === 0) {
      toast.error("No changes to submit");
      return;
    }

    // const printHandler = () =>{ <PrintEmployeeData updated={updated}/ >}

    try {
      const response = await axios.post(`/api/duty/addDuty/${dutySet[0]._id}`, dataCollection, {
        withCredentials: true,
      });

      if (response.status === 200) {
        toast.success("Duty data saved successfully!");

        // refresh the dutySet with latest from backend
        const updated = await axios.post(
          "/api/duty/viewSheetByDetails/",
          { year: selectedYear, month: MonthInName(selectedMonth), company: companyId },
          { withCredentials: true }
        );

        setDutySet(updated.data);
        setDataCollection([]); // reset local edits
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Duty update failed");
      console.log(error.message);
    }
  };

  return (
    <div className={styles.container}>
      {!showData && !loading && (
        <div className={styles.searchArea}>
          {/* Find Duty sheet */}
          <div className="md:w-1/3 w-70">
            <h2 className={styles.searchAreaTitle}>
              <span className={styles.searchAreaTitleText}>
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
      )}

      {/* loading screen */}
      {loading && (
        <div className={`col-span-full `}>
          <LoadingScreen />
        </div>
      )}

      {/* data is shown here after user enter the company name and submit*/}
      {showData && !loading && (
        <div className={`col-span-2`}>
          <div>
            {/* back button */}
            <button
              onClick={() => {
                setShowData(!showData);
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
          <div className={styles.tablePosition}>
            <form onSubmit={formDataSubmitHandle}>
              {Array.isArray(dutySet) &&
                dutySet.map((sheet, index) => (
                  <div
                    key={sheet._id || index}
                    className="overflow-y-scroll max-h-screen container">
                    <table className={styles.tableStyles}>
                      <thead className="bg-gray-200">
                        <tr>
                          <th className={styles.tableTitle}>Position</th>
                          <th className={styles.tableTitle}>Employee</th>
                          <th className={styles.tableTitle}>Start/time</th>
                          <th className={styles.tableTitle}>Shift</th>
                          <th className={styles.tableTitle}>Remark</th>
                          {/* <th className={styles.tableData}></th> */}
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
                              <td className={styles.tableData}>
                                <input
                                  value={currentRow.position || "-"}
                                  className="outline-0"
                                  readOnly
                                />
                              </td>

                              {/* Employee */}
                              <td className={styles.tableData}>
                                <input
                                  list={`dataScheduleNames-${dindex}`}
                                  value={currentRow?.employeeName || duty.employee?.name || ""}
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

                              {/* Start /known as time */}
                              <td className={styles.tableData}>
                                <select
                                  value={currentRow?.time}
                                  onChange={(e) =>
                                    formChangeHandler(dindex, "time", e.target.value, duty)
                                  }
                                  className="bg-blue-100 px-2 w-full">
                                  <option>Select</option>
                                  <option value="8am">8am</option>
                                  <option value="6pm">6pm</option>
                                </select>
                              </td>

                              {/* Shift */}
                              <td className={styles.tableData}>
                                <select
                                  value={currentRow?.shift || ""}
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
                              <td className={styles.tableData}>
                                <input
                                  value={currentRow?.remark || ""}
                                  onChange={(e) =>
                                    formChangeHandler(dindex, "remark", e.target.value, duty)
                                  }
                                  className="bg-blue-100 px-2 w-full"
                                />
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ))}

              <div className="flex w- justify-end gap-5">
                <button className="p-3.5 bg-green-400 hover:bg-green-500 cursor-pointer mt-4 rounded-3xl  text-white">
                  Add Schedule
                </button>
                <PrintEmployeeData dutydata={dutySet} />
              </div>
            </form>
          </div>
        </div>
      )}
      {console.log(dutySet)}
      {/* right side */}
      {showData && (
        <div>
          <SideCalandeBar
            showData={showData}
            companylist={companylist}
            selectedCompanyName={selectedCompanyName}
            setDateValue={setDateValue}
            dateValue={dateValue}
          />
        </div>
      )}
    </div>
  );
};

export default Schedule;
