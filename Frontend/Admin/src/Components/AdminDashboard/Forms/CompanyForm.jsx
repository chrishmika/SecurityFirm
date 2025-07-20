import { useRef, useState } from "react";
import axios from "axios";
import getCoordinates from "../../../utils/getCoordinates";

import { IoMdAddCircle } from "react-icons/io";
import { FaCircleMinus } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { CiFileOn } from "react-icons/ci";

import { useCompanyContext } from "../../../hooks/useCompanyContext";

import { toast } from "react-toastify";

const CompanyForm = () => {
  const { company, setCompany } = useCompanyContext();

  const [currentInputs, setCurrentInputs] = useState({ position: "", count: "" });
  const [companyRequirement, setCompanyRequirement] = useState([]);

  const proposalRef = useRef(null);

  const handleGetLocation = async () => {
    if (company?.address) {
      const coordinates = await getCoordinates(company.address);
      if (coordinates.lat === null) {
        toast.error("Use Address Correctly");
        return;
      }
      setCompany((prev) => ({
        ...prev,
        longitude: coordinates.lng,
        latitude: coordinates.lat,
      }));
    } else {
      toast.error("Please enter an Address");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompany((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCompany((prev) => ({ ...prev, [name]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRequirementInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentInputs((prev) => ({
      ...prev,
      [name]: name === "count" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const addRequirement = (e) => {
    e.preventDefault();
    if (currentInputs.position.trim() === "" || currentInputs.position === "Select Position") {
      toast.error("Please select a position");
      return;
    }
    if (!currentInputs.count || currentInputs.count <= 0) {
      toast.error("Please enter a valid count");
      return;
    }
    setCompanyRequirement((prev) => [...prev, currentInputs]);
    setCurrentInputs({ position: "", count: "" });
  };

  const removeRequirement = (index, e) => {
    e.preventDefault();
    setCompanyRequirement((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/admin/createCompany", company, {
        withCredentials: true,
      });
      if (response.status === 200) {
        toast.success("Company created successfully");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Something went wrong");
    }
  };

  const downloadFile = (file) => {
    const url = URL.createObjectURL(file);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Company Details */}
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <h2 className="text-xl font-semibold">Company Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label>Company Name</label>
              <input
                name="name"
                onChange={handleChange}
                placeholder="DVision Security"
                className="input"
              />
            </div>
            <div>
              <label>Address</label>
              <input
                name="address"
                value={company?.address}
                onChange={handleChange}
                placeholder="Main street, Colombo"
                className="input"
              />
              <button type="button" onClick={handleGetLocation} className="btn mt-2">
                Get Location
              </button>
            </div>
            <div>
              <label>Latitude</label>
              <input value={company?.latitude || ""} readOnly className="input" />
            </div>
            <div>
              <label>Longitude</label>
              <input value={company?.longitude || ""} readOnly className="input" />
            </div>
          </div>
        </div>

        {/* Contract Period */}
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <h2 className="text-xl font-semibold">Contract Period</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label>From</label>
              <input type="date" name="contractFrom" onChange={handleChange} className="input" />
            </div>
            <div>
              <label>To</label>
              <input type="date" name="contractTo" onChange={handleChange} className="input" />
            </div>
          </div>
        </div>

        {/* Agent Details */}
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <h2 className="text-xl font-semibold">Agent Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="agent"
              value={company.agent}
              placeholder="Agent Name"
              onChange={handleChange}
              className="input"
            />
            <input
              name="agentNIC"
              value={company.agentNIC}
              placeholder="NIC Number"
              onChange={handleChange}
              className="input"
            />
            <input
              name="agentEmail"
              value={company.agentEmail}
              placeholder="Agent Email"
              onChange={handleChange}
              className="input"
            />
            <input
              name="agentContact1"
              value={company.agentContact1}
              placeholder="Contact 1"
              onChange={handleChange}
              className="input"
            />
            <input
              name="agentContact2"
              value={company.agentContact2}
              placeholder="Contact 2"
              onChange={handleChange}
              className="input"
            />
          </div>
        </div>

        {/* Employment Requirements */}
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <h2 className="text-xl font-semibold">Employment Requirements</h2>
          <div className="flex gap-4 items-end">
            <select
              name="position"
              value={currentInputs.position}
              onChange={handleRequirementInputChange}
              className="input">
              <option>Select Position</option>
              <option>LSO</option>
              <option>JSO</option>
              <option>MSO</option>
            </select>
            <input
              name="count"
              type="number"
              min="1"
              value={currentInputs.count}
              onChange={handleRequirementInputChange}
              className="input"
              placeholder="Count"
            />
            <button onClick={addRequirement} className="text-green-600 text-3xl">
              <IoMdAddCircle />
            </button>
          </div>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {companyRequirement.map((item, index) => (
              <div key={index} className="flex gap-4 items-center">
                <input readOnly value={item.position} className="input w-full" />
                <input readOnly value={item.count} className="input w-full" />
                <button
                  onClick={(e) => removeRequirement(index, e)}
                  className="text-red-600 text-2xl">
                  <FaCircleMinus />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Company Contact */}
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <h2 className="text-xl font-semibold">Company Contact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="companyEmail"
              value={company.companyEmail}
              onChange={handleChange}
              placeholder="Company Email"
              className="input"
            />
            <input
              name="companyMobile"
              value={company.companyMobile}
              onChange={handleChange}
              placeholder="Company Contact"
              className="input"
            />
          </div>
        </div>

        {/* Documents */}
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <h2 className="text-xl font-semibold">Documents</h2>
          <div className="flex gap-6">
            <div>
              {company?.proposal ? (
                <div className="relative">
                  <IoCloseSharp
                    onClick={() => setCompany((prev) => ({ ...prev, proposal: null }))}
                    className="absolute right-1 top-1 cursor-pointer text-red-500"
                  />
                  <img
                    src={company.proposal}
                    alt="Proposal"
                    className="w-24 h-auto rounded"
                    onClick={() => downloadFile(company.proposal)}
                  />
                </div>
              ) : (
                <label className="cursor-pointer">
                  <CiFileOn className="text-5xl" />
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    name="proposal"
                    ref={proposalRef}
                    onChange={handleFileChange}
                  />
                  <span>Proposal</span>
                </label>
              )}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button type="submit" className="btn">
            Submit
          </button>
          <button type="reset" className="btn bg-gray-300 text-black hover:bg-gray-400">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompanyForm;
