import { useState } from "react";

import { FaToggleOff, FaToggleOn } from "react-icons/fa6";
import EmployeeForm from "./Forms/EmployeeForm";
import CompanyForm from "./Forms/CompanyForm";

const AddUsers = () => {
  const [choice, setChoice] = useState(false);

  return (
    <div>
      <div className="text-xl flex gap-3 items-center">
        <span className="text-4xl" onClick={() => setChoice(!choice)}>
          {choice ? <FaToggleOn /> : <FaToggleOff />}
        </span>
        {choice ? `Company` : `Employee`}
      </div>

      <div className="flex items-center justify-center ">
        <div className="w-full max-w-5xl bg-white p-6 rounded-lg shadow-lg">
          {/* <EmployeeSearch />*/}
          {!choice ? <EmployeeForm /> : <CompanyForm />}
        </div>
      </div>
    </div>
  );
};

export default AddUsers;
