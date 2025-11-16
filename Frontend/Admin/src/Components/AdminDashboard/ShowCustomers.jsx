import { useState, useEffect } from "react";
import axios from "axios";

import { FaToggleOff, FaToggleOn } from "react-icons/fa6";
import { RiCloseFill } from "react-icons/ri";

import EmployeeDataView from "./Cards/DataViewForms/EmployeeDataView";
import CompanyDataView from "./Cards/DataViewForms/CompanyDataView";
import { toast } from "react-toastify";

// import { icon } from "../../assets/boy1.png";

const AddCompany = () => {
  const [choice, setChoice] = useState(false);
  // const [company, setCompany] = useState();
  // const [employee, setEmployee] = useState();
  const [namesData, setNamesData] = useState();
  const [specificData, setSpecificData] = useState();
  const [selected, setSelected] = useState();
  const [nameToFind, setNameToFind] = useState();
  const [isDataFetched, setIsDataFetched] = useState(false);

  // at start it takes data about employees
  useEffect(() => {
    (async () => {
      try {
        const response = await axios(
          `/api/${choice ? "company/getCompanyList" : "employee/employeeList"}`,
          {
            withCredentials: true,
          }
        );

        if (response.data.employees) {
          setNamesData(response.data);
        } else {
          setNamesData(response.data);
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, [choice]);

  console.log("list of name list", namesData);

  const handelSelectedId = (e) => {
    e.preventDefault();
    try {
      setNameToFind(e.target.value);

      const employee = namesData.find((emp) => emp.name == e.target.value);
      setSelected(employee._id);
    } catch {
      console.log("cannot find id for this");
    }
  };

  const submitHandeler = async (e) => {
    e.preventDefault();
    try {
      setIsDataFetched(false);
      const response = await axios.post(
        `/api/${choice ? "company" : "employee"}/${selected}`,
        {},
        {
          withCredentials: true,
        }
      );

      if (choice) {
        setSpecificData(response.data.company);
      } else {
        setSpecificData(response.data.employee);
      }
      setIsDataFetched(true);
    } catch (error) {
      console.log(error);
      toast.error("No data found");
    }
  };

  return (
    <div>
      {/*  name selection to find data need to impliimented the */}
      <div className=" flex justify-between sm:items-center mb-5 sm:flex-row flex-col gap-3">
        <div className="text-xl flex gap-3 items-center">
          <span
            className="text-4xl flex justify-items-start"
            onClick={() => {
              setChoice(!choice);
              setSpecificData(null);
              setIsDataFetched(false);
              setNameToFind("");
            }}>
            {choice ? <FaToggleOn /> : <FaToggleOff />}
          </span>

          {choice ? `Company` : `Employee`}
        </div>

        <div className="pr-4 ">
          <form className="flex gap-2 flex-wrap" onSubmit={submitHandeler}>
            <div className="relative w-64">
              {/* Search Input */}
              <input
                onChange={handelSelectedId}
                className="px-3 pr-10 border-2 bg-white rounded-2xl focus:outline-none w-full appearance-none hover:border-gray-900 no-arrow"
                list="searchList"
                placeholder={choice ? " Company Name" : " Employee Name"}
                name={choice ? "Company" : "Employee"}
                value={nameToFind}
              />

              {/* Reset (X) Button Inside Input */}
              {nameToFind && (
                <button
                  type="button"
                  onClick={() => {
                    setNameToFind("");
                    setSelected(null);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 hover:text-red-500 font-bold">
                  <RiCloseFill />
                </button>
              )}

              {/* Datalist */}
              <datalist id="searchList">
                {namesData?.map((names) => (
                  <option value={names.name} key={names._id} />
                ))}
              </datalist>
            </div>

            {/* Search Button */}
            <button className="cursor-pointer border-2 rounded-2xl w-20 ml-2 bg-whit hover:font-bold bg-white">
              Search
            </button>
          </form>
        </div>
      </div>

      {/* data viewing area */}
      <div>
        <div className={isDataFetched ? "" : "hidden"}>
          {/* need to add company view sheet */}
          {choice ? (
            <CompanyDataView data={specificData} />
          ) : (
            <EmployeeDataView data={specificData} />
          )}
        </div>

        <div
          className={`flex justify-center items-center h-[70vh] w-full overflow-hidden ${
            !isDataFetched ? "" : "hidden"
          }`}>
          {/* <div className="outline-1 w-20 h-20 rounded-full cursor-pointer relative -left-4 overflow-hidden flex justify-center items-center">
            <img src={namesData[-1]?.img || `../../assets/boy1.png`} />
          </div>
          <div className="outline-1 w-20 h-20 rounded-full cursor-pointer relative -left-1 overflow-hidden flex justify-center items-center">
            <img src={namesData[-2]?.img || "icon"} />
          </div>
          <div className="outline-1 w-20 h-20 rounded-full cursor-pointer relative left-1 overflow-hidden flex justify-center items-center">
            <img src={namesData[-3]?.img || "icon"} />
          </div>
          <div className="outline-1 w-20 h-20 rounded-full cursor-pointer relative left-4 overflow-hidden flex justify-center items-center">
            <img src={namesData[-4]?.img || "icon"} />
          </div> */}

          <span className=""> Search For details</span>
        </div>
      </div>
    </div>
  );
};

export default AddCompany;
