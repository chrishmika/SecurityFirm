import { useState, useEffect } from "react";
import axios from "axios";

import { FaToggleOff, FaToggleOn } from "react-icons/fa6";
import { RiCloseFill } from "react-icons/ri";

import EmployeeDataView from "./Cards/DataViewForms/EmployeeDataView";
import CompanyDataView from "./Cards/DataViewForms/CompanyDataView";
import { toast } from "react-toastify";

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
    const getNames = async () => {
      try {
        const response = await axios(
          `http://localhost:5000/api/${
            choice ? "company/getCompanyList" : "employee/employeeList"
          }`,
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
    };

    getNames();
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

  // take data from database --------------
  const submitHandeler = async (e) => {
    e.preventDefault();
    try {
      setIsDataFetched(false);
      const response = await axios.post(
        `http://localhost:5000/api/${choice ? "company" : "employee"}/${selected}`,
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
          <form className="flex gap-2 flex-wrap  " onSubmit={submitHandeler}>
            <div className="relative w-64">
              {/* Search Input */}
              <input
                onChange={handelSelectedId}
                className="px-3 pr-10 border-2 rounded-2xl focus:outline-none w-full appearance-none no-arrow"
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
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-500 font-bold">
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
            <button className="cursor-pointer border-2 rounded-2xl w-20 ml-2">Search</button>
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
          <span className=""> Search For details</span>
        </div>
      </div>
    </div>
  );
};

export default AddCompany;
