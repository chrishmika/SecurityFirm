import React from "react";
import { useEmployeeContext } from "../../hooks/useEmployeeContext";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import EmployeeDataView from "./Cards/DataViewForms/EmployeeDataView";

const UpdateEmployeeData = () => {
  const { employee, setEmployee, initialState } = useEmployeeContext();

  const { id } = useParams();
  const location = useLocation();

  const previous = location.state ? location.state.data : null;
  setEmployee(previous);

  const updateWithNewData = async () => {
    const response = await axios.put(`api/employee/${id}`, employee, { withCredentials: true });
    console.log(response);
    toast.success("Data updated OK");
  };

  return (
    <div>
      <EmployeeDataView data={employee} />
    </div>
  );
};

export default UpdateEmployeeData;
