import { useState } from "react";
import { FaToggleOff, FaToggleOn } from "react-icons/fa6";

const AddCompany = () => {
  const [choice, setChoice] = useState(false);
  return (
    <div>
      <div className="text-xl flex gap-3 items-center">
        <span className="text-4xl" onClick={() => setChoice(!choice)}>
          {choice ? <FaToggleOn /> : <FaToggleOff />}
        </span>
        {choice ? `Company` : `Employee`}
      </div>
    </div>
  );
};

export default AddCompany;
