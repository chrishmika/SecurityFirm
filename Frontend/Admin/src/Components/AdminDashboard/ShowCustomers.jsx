import { useState, useEffect, isValidElement } from "react";
import axios from "axios";

import { FaToggleOff, FaToggleOn } from "react-icons/fa6";

import EmployeeDataView from "./Cards/DataViewForms/EmployeeDataView";
import CompanyDataView from "./Cards/DataViewForms/CompanyDataView";

const AddCompany = () => {
  const [choice, setChoice] = useState(false);
  const [company, setCompany] = useState();
  const [employee, setEmployee] = useState();
  const [namesData, setNamesData] = useState();
  const [specifiicData, setSpecificData] = useState();
  const [selected, setSelected] = useState();

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

  console.log("data1", namesData);

  const handelSelectedId = (e) => {
    e.preventDefault();
    setSelected(e.target.value);
    console.log("sellected");
    console.log(selected, "sellected");
  };

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
      console.log("selected id", selected);

      const response = await axios.post(
        `http://localhost:5000/api/${choice ? "company" : "employee"}/${selected}`,
        {},
        {
          withCredentials: true,
        }
      );

      if (!choice) {
        setSpecificData(response.data.employees);
      } else {
        setSpecificData(response.data.company);
      }
    } catch (error) {
      console.log(error);
    }
    // console.log("specific", specifiicData); //remove this
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
            }}>
            {choice ? <FaToggleOn /> : <FaToggleOff />}
          </span>

          {choice ? `Company` : `Employee`}
        </div>

        <div className="pr-4 ">
          <form className="flex gap-2 flex-wrap  " onSubmit={submitHandeler}>
            {/* <input
              type="text"
              onChange={choice ? handelChangeCompany : handelChangeEmployee}
              value={choice ? company : employee}
              name={choice ? "Company" : "Employee"}
              placeholder={choice ? "Enter Company" : "Enter Employee"}
              className="px-3 border-2 rounded-2xl"
            /> */}
            {/* typing suggestns are the best in here */}

            <select
              type="text"
              // onChange={choice ? handelChangeCompany : handelChangeEmployee}
              onChange={handelSelectedId}
              value={choice ? company : employee}
              name={choice ? "Company" : "Employee"}
              placeholder={choice ? "Enter Company" : "Enter Employee"}
              className="px-3 border-2 rounded-2xl">
              {namesData?.map((names) => (
                <option value={names._id} key={names._id}>
                  {names.name}
                </option>
              ))}
            </select>

            <button className="cursor-pointer border-2 rounded-2xl w-20">Search</button>
          </form>
        </div>
      </div>

      {/* data viewing area */}

      <div>
        {/* need to add company view sheet */}
        {choice ? (
          <CompanyDataView data={specifiicData} />
        ) : (
          <EmployeeDataView data={specifiicData} />
        )}
      </div>
    </div>
  );
};

export default AddCompany;
