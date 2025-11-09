import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";

import SideCalandeBar from "../../utils/SideCalandeBar";
import NumberLine from "../../utils/NumberLine";
import DutySearchForm from "./Forum/DutySearchForm";

import axios from "axios";
import LoadingScreen from "../../utils/LoadingScreen";
import MonthInName from "../../utils/MonthInName";

import { adminStyles as styles } from "../styles/adminStyles";

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
          "/api/duty/viewSheetByDetails/",
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
    <div className={styles.container}>
      {!showData && !loading && (
        <div className={styles.searchArea}>
          {/* Find Duty sheet */}
          <div className="md:w-1/3 w-70 ">
            <h2 className={styles.searchAreaTitle}>
              <span className={styles.searchAreaTitleText}>
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
      )}

      {/* loading screen */}
      {loading && (
        <div className={`col-span-full `}>
          <LoadingScreen />
        </div>
      )}

      {/* //////////////////////////////////////// */}
      {/* data is shown here after user enter the company name */}
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

            <h2 className="text-lg font-bold mb-5">
              {selectedCompanyName} Attendance . {` ${selectedMonth} - ${selectedYear} `}
            </h2>

            <NumberLine
              year={selectedYear}
              month={selectedMonth}
              onSelectDay={(day) => {
                setSelectedDay(day);
              }}
              today={Date().split(" ")[2]}
            />
          </div>

          <div className={styles.tablePosition}>
            {Array.isArray(dutySet) &&
              dutySet.map((sheet) => (
                <div key={selectedDay} className="overflow-y-scroll max-h-screen container">
                  <table className={`${styles.tableStyles} border-l-5`}>
                    <thead className="bg-gray-200 cursor-default">
                      <tr>
                        <th className={styles.tableTitle}>Position</th>
                        <th className={styles.tableTitle}>Employee</th>
                        <th className={styles.tableTitle}>Start</th>
                        <th className={styles.tableTitle}>Shift</th>
                        <th className={styles.tableTitle}>Check In</th>
                        <th className={styles.tableTitle}>Check Out</th>
                        <th className={styles.tableTitle}>Remark</th>
                        <th className={styles.tableTitle}></th>
                      </tr>
                    </thead>

                    <tbody>
                      {sheet.duties.map((duty, dindex) => (
                        <tr
                          key={dindex}
                          className={`border-l-5 ${
                            duty.status === "absent"
                              ? "  border-l-red-400"
                              : duty.status === "present"
                              ? "border-l-green-300"
                              : duty.status === "late"
                              ? "border-l-yellow-300"
                              : "bg-white"
                          }
                    ${duty.day == (selectedDay || 1) ? "box" : "hidden"}
                    `} //this is for attendance viewing area
                        >
                          {/* position */}
                          <td className={styles.tableData}>
                            <input
                              name="position"
                              value={duty.position}
                              className="outline-0 cursor-default"
                              readOnly
                            />
                            {/* {console.log("duty,", duty)} */}
                          </td>

                          {/* employee */}
                          <td className={styles.tableData}>
                            <input
                              className="bg-none font-bold px-2 w-full outline-0 cursor-default"
                              value={duty.employee?.name || "Not Assinged"}
                              readOnly
                            />
                          </td>

                          {/* start */}
                          {/* neet fix values in here in propper way */}
                          <td className={styles.tableData}>
                            <input
                              className={styles.attendanceViewInputField}
                              value={duty.time || ""}
                              readOnly
                            />
                          </td>

                          {/* neet fix values in here in propper way */}
                          <td className={styles.tableData}>
                            <input
                              className={styles.attendanceViewInputField}
                              value={`${duty.shift || "0"} hours`}
                              readOnly
                            />
                          </td>

                          <td className={styles.tableData}>
                            <input
                              className={styles.attendanceViewInputField}
                              value={duty.checkIn?.split("T")[1]?.substring(0, 5) || ""}
                              readOnly
                            />
                          </td>

                          <td className={styles.tableData}>
                            <input
                              className={styles.attendanceViewInputField}
                              value={duty.checkOut?.split("T")[1]?.substring(0, 5) || ""}
                              readOnly
                            />
                          </td>

                          <td className={styles.tableData}>
                            <input
                              className={styles.attendanceViewInputField}
                              value={duty.remark || ""}
                              readOnly
                            />
                          </td>

                          <td className={styles.tableData}>
                            {duty.status == "present" ? (
                              <button
                                className={`bg-red-300 p-1 w-full cursor-pointer font-extralight hover:bg-red-400`}>
                                Absent
                              </button>
                            ) : (
                              <button
                                className={`bg-green-300 p-1 w-full cursor-pointer font-extralight  hover:bg-green-400`}>
                                Present
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
          </div>

          <div className="flex gap-2 justify-end">
            <button className="rounded-2xl bg-amber-300 p-3 cursor-pointer">Print</button>
            <button className="rounded-2xl bg-amber-300 p-3 cursor-pointer">Print All</button>
            {/* printing part is need to be done */}
          </div>
        </div>
      )}

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

//to get list of companies and employees to choose them on list to assign
//http://localhost:5000/api/company/getCompanyList
//http://localhost:5000/api/employee/employeeList
