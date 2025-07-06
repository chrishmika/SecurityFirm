import React, { useEffect, useState } from "react";
import { EmployeeContext } from "../../context/EmployeeContext";
import { useContext } from "react";

const EmployeeSearch = () => {
  const { employee, setEmployee } = useContext(EmployeeContext);

  const [searchEmp, setSearchEmp] = useState("");
  const [searchEmpName, setSearchEmpName] = useState("");

  useEffect(() => {
    // setEmployee((prevEmployee) => ({ ...prevEmployee, gender: "trans" }));
    // setEmployee((prevEmployee) => ({ ...prevEmployee, NIC: 8964654654654 }));
  }, [setEmployee]);

  const searchHandle = (e) => {
    e.preventDefault();
  };

  return (
    <React.Fragment>
      <div>
        <form action="#" onSubmit={searchHandle} className="space-y-4">
          <div className="flex space-x-2">
            <input
              type="text"
              onChange={(e) => {
                setSearchEmp(e.target.value);
              }}
              value={searchEmp}
              name="search_emp_id"
              placeholder="Employee ID"
              className="border p-2 rounded w-full"
            />
            <input
              type="text"
              onChange={(e) => {
                setSearchEmpName(e.target.value);
              }}
              value={searchEmpName}
              name="search_emp_name"
              placeholder="Employee Name"
              className="border p-2 rounded w-full"
            />
            <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
              Search
            </button>
          </div>
        </form>
        <hr className="mt-5 shadow-2xl" />
      </div>
    </React.Fragment>
  );
};

export default EmployeeSearch;
