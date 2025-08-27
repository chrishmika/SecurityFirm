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
  const [specificData, setSpecificData] = useState();
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

  console.log("list of name list", namesData);

  const handelSelectedId = (e) => {
    e.preventDefault();
    const name = e.target.value;
    const employee = namesData.find((emp) => emp.name == name);
    setSelected(employee._id);
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
      console.log("selected id 2", selected);

      const response = await axios.post(
        `http://localhost:5000/api/${choice ? "company" : "employee"}/${selected}`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log("specific data", response.data);

      if (choice) {
        setSpecificData(response.data.company);
        console.log("copany");
      } else {
        setSpecificData(response.data.employee);
        console.log("employe");
      }
    } catch (error) {
      console.log(error);
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
            }}>
            {choice ? <FaToggleOn /> : <FaToggleOff />}
          </span>

          {choice ? `Company` : `Employee`}
        </div>

        <div className="pr-4 ">
          <form className="flex gap-2 flex-wrap  " onSubmit={submitHandeler}>
            <input
              onChange={handelSelectedId}
              className={`px-3 border-2 rounded-2xl focus:outline-none`}
              list="searchList"
              placeholder={choice ? " Company Name" : " Employee Name"}
              name={choice ? "Company" : "Employee"}
            />
            <datalist
              id="searchList"
              // onChange={choice ? handelChangeCompany : handelChangeEmployee}
              // onChange={handelSelectedId}
              value={choice ? company : employee}>
              {namesData?.map((names) => (
                <option value={names.name} key={names._id} />
              ))}
            </datalist>

            <button className="cursor-pointer border-2 rounded-2xl w-20">Search</button>
          </form>
        </div>
      </div>

      {/* data viewing area */}

      <div>
        {/* need to add company view sheet */}
        {choice ? (
          <CompanyDataView data={specificData} />
        ) : (
          <EmployeeDataView data={specificData} />
        )}
      </div>
    </div>
  );
};

export default AddCompany;
