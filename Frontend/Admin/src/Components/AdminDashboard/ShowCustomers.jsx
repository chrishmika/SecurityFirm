import { useState, useEffect } from "react";
import axios from "axios";

import { FaToggleOff, FaToggleOn } from "react-icons/fa6";

import EmployeeDataView from "./Cards/DataViewForms/EmployeeDataView";
import CompanyDataView from "./Cards/DataViewForms/CompanyDataView";

const AddCompany = () => {
  const [choice, setChoice] = useState(false);
  const [company, setCompany] = useState();
  const [employee, setEmployee] = useState();
  const [namesData, setNamesData] = useState();

  // at start it takes data about employees
  useEffect(() => {
    const getNames = async () => {
      try {
        const response = await axios.post(
          `http://localhost:5000/api/${choice ? "company" : "employee"}/`,
          {},
          {
            withCredentials: true,
          }
        );

        if (response.data.employees) {
          setNamesData(response.data.employees);
        } else {
          setNamesData(response.data.companies);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    getNames();
  }, [choice]);

  console.log("data1", namesData);

  const handelChangeCompany = async (e) => {
    setCompany(e.target.value);
  };

  const handelChangeEmployee = (e) => {
    setEmployee(e.target.value);
  };

  // take data from database --------------
  const submitHandeler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5000/api/${choice ? "company" : "employee"}/e.target.id`,
        {
          withCredentials: true,
        }
      );

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/*  name selection to find data*/}
      <div className=" flex justify-between sm:items-center mb-5 sm:flex-row flex-col gap-3">
        <div className="text-xl flex gap-3 items-center">
          <span
            className="text-4xl flex justify-items-start"
            onClick={() => {
              setChoice(!choice);
            }}>
            {choice ? <FaToggleOn /> : <FaToggleOff />}
          </span>

          {choice ? `Company` : `Employee`}
        </div>

        <div className="pr-4 " onSubmit={submitHandeler}>
          <form className="flex gap-2 flex-wrap  ">
            <input
              type="text"
              onChange={choice ? handelChangeCompany : handelChangeEmployee}
              value={choice ? company : employee}
              name={choice ? "Company" : "Employee"}
              placeholder={choice ? "Enter Company" : "Enter Employee"}
              className="px-3 border-2 rounded-2xl"
            />

            <button className="cursor-pointer border-2 rounded-2xl w-20">Search</button>
          </form>
        </div>
      </div>

      {/* data viewing area */}

      <div>
        {/* need to add company view sheet */}
        {choice ? <CompanyDataView data={"hi"} /> : <EmployeeDataView data={"hi"} />}
      </div>
    </div>
  );
};

export default AddCompany;
