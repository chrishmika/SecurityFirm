import { useRef, useState } from "react";
import axios from "axios";
import getCoordinates from "../../../utils/getCoordinates";

import { IoMdAddCircle } from "react-icons/io";
import { FaCircleMinus } from "react-icons/fa6";
import { IoCloseSharp, IoDocumentAttachSharp } from "react-icons/io5";

import { useCompanyContext } from "../../../hooks/useCompanyContext";

import { toast } from "react-toastify";
import LoadingScreen from "../subComponents/LoadingScreen";

const availablePositions = ["LSO", "SO", "JSO", "OIC"];

const CompanyForm = () => {
  const [loading, SetLoading] = useState(false);

  const { company, setCompany, initialCompany } = useCompanyContext();

  const [currentInputs, setCurrentInputs] = useState({ position: "", amount: "" });
  // const [companyRequirement, setCompanyRequirement] = useState([]);

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
    if ((name == "contractTo") | (name == "contractFrom")) {
      setCompany((prev) => {
        const updatedContract = {
          from: name === "contractFrom" ? value : prev?.contractPeriod[0]?.from || "",
          to: name === "contractTo" ? value : prev?.contractPeriod[0]?.to || "",
        };

        return { ...prev, contractPeriod: [updatedContract] };
      });
    } else {
      setCompany((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCompany((prev) => ({ ...prev, [name]: { file, src: reader.result } }));
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadFile = (file) => {
    const url = URL.createObjectURL(file);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name || "document";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleRequirementInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setCurrentInputs((prev) => ({
      ...prev,
      [name]: name === "count" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const addRequirement = (e) => {
    e.preventDefault();
    console.log(e.target.value);

    // validations
    if (!currentInputs.position || currentInputs.position === "Select Position") {
      toast.error("Please select a position");
      return;
    }
    if (!currentInputs.count || currentInputs.count <= 0) {
      toast.error("Please enter a valid count");
      return;
    }

    // push into company.count
    setCompany((prev) => ({
      ...prev,
      count: [...prev.count, { position: currentInputs.position, amount: currentInputs.count }],
    }));

    // reset local inputs
    setCurrentInputs({ position: "", count: "" });
  };

  console.log("currentInputs", currentInputs);

  const removeRequirement = (index, e) => {
    e.preventDefault();
    setCompany((prev) => ({
      ...prev,
      count: prev.count.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("company,", company);

    try {
      SetLoading(true);
      const response = await axios.post("/api/admin/createCompany", company, {
        withCredentials: true,
      });
      if (response.status === 200) {
        toast.success("Company created successfully");
      }
      setCompany(initialCompany);
      SetLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.error || "Something went wrong");
      SetLoading(false);
    }
  };

  return (
    <div className="flex justify-center p-6 bg-gray-100 min-h-screen">
      <div className={`col-span-full ${loading ? "block" : "hidden"}`}>
        <LoadingScreen />
      </div>

      <form
        onSubmit={handleSubmit}
        className={`${
          !loading ? "block" : "hidden"
        } w-full max-w-5xl bg-white p-6 rounded-lg shadow space-y-6 }`}>
        {/* Company Details */}
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <h2 className="text-xl font-semibold">Company Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex gap-2 items-center">
              <label>Company Name :</label>
              <input
                name="name"
                value={company.name}
                onChange={handleChange}
                placeholder="DVision Security"
                className="input"
                required
              />
            </div>

            <div className="flex gap-2 items-center">
              <label>Address :</label>
              <input
                name="address"
                value={company?.address}
                onChange={handleChange}
                placeholder="Main street, Colombo"
                className="input"
                required
              />

              <button
                type="button"
                onClick={handleGetLocation}
                className="btn mt-2 bg-green-600 px-1.5 py-1 rounded-md text-white  cursor-pointer hover:bg-green-800">
                Fetch Location
              </button>
            </div>

            <div className="flex gap-2 items-center">
              <label>Latitude :</label>
              <input
                value={company?.latitude || ""}
                className="input border-b-2 border-green-600"
                readOnly
                required
              />
            </div>

            <div className="flex gap-2 items-center">
              <label>Longitude :</label>
              <input
                value={company?.longitude || ""}
                className="input border-b-2 border-green-600"
                readOnly
                required
              />
            </div>
          </div>
        </div>

        {/* Contract Period */}
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <h2 className="text-xl font-semibold">Contract Period</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label>From</label>
              <input
                type="date"
                name="contractFrom"
                onChange={handleChange}
                className="input"
                required
              />
            </div>
            <div>
              <label>To</label>
              <input
                type="date"
                name="contractTo"
                onChange={handleChange}
                className="input"
                required
              />
            </div>
          </div>
        </div>

        {/* Agent Details */}
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <h2 className="text-xl font-semibold">Agent Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex gap-2 items-center">
              <label>Agent Name :</label>
              <input
                name="agent"
                value={company.agent}
                placeholder="Agent Name"
                onChange={handleChange}
                className="input"
                required
              />
            </div>

            <div className="flex gap-2 items-center">
              <label>Agent NIC :</label>

              <input
                name="agentNIC"
                value={company.agentNIC}
                maxLength={12}
                placeholder="NIC Number"
                onChange={handleChange}
                className="input"
                required
              />
            </div>

            <div className="flex gap-2 items-center">
              <label>Agent Email :</label>
              <input
                name="agentEmail"
                value={company.agentEmail}
                placeholder="Agent Email"
                onChange={handleChange}
                className="input"
                required
              />
            </div>

            <div className="flex gap-2 items-center">
              <label>Agent Contact 1 :</label>
              <input
                name="agentContact1"
                value={company.agentContact1}
                maxLength={10}
                pattern="0\d{9}"
                placeholder="e.g. 0712345678"
                onChange={handleChange}
                className="input"
                required
              />
            </div>

            <div className="flex gap-2 items-center">
              <label>Agent Contact2 :</label>
              <input
                name="agentContact2"
                value={company.agentContact2}
                maxLength={10}
                pattern="0\d{9}"
                placeholder="e.g. 0712345678"
                onChange={handleChange}
                className="input"
              />
            </div>
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
              className="input"
              required>
              <option>Select Position</option>
              {availablePositions
                .filter((position) => !company?.count?.some((req) => req.position === position))
                .map((position) => (
                  <option key={position} value={position}>
                    {position}
                  </option>
                ))}
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
            <ul className="mt-4 space-y-2">
              {company?.count?.map((req, index) => (
                <li key={index} className="flex gap-4 items-center">
                  <input
                    readOnly
                    value={req.position}
                    className="input w-full outline-0 "
                    required
                  />
                  <input readOnly value={req.amount} className="input w-full outline-0 " required />

                  <button
                    onClick={(e) => removeRequirement(index, e)}
                    className="text-red-600 text-2xl">
                    <FaCircleMinus />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Company Contact */}
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <h2 className="text-xl font-semibold">Company Contact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex gap-2">
              <label>Company Email :</label>
              <input
                name="companyEmail"
                value={company.companyEmail}
                onChange={handleChange}
                placeholder="Company Email"
                className="input"
              />
            </div>

            <div className="flex gap-2 items-center">
              <label>Company Contact :</label>
              <input
                name="companyMobile"
                value={company.companyMobile}
                maxLength={10}
                pattern="0\d{9}"
                placeholder="e.g. 0712345678"
                onChange={handleChange}
                className="input"
                required
              />
            </div>
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
                  {company?.proposal?.file.type.startsWith("image/") ? (
                    <img
                      src={company?.proposal?.src}
                      alt={"proposal"}
                      className="rounded-md cursor-pointer w-32 h-32"
                    />
                  ) : company?.proposal?.file.type === "application/pdf" ? (
                    <object
                      data={company?.proposal?.src}
                      type="application/pdf"
                      className="w-40 h-32 rounded-md overflow-hidden border-0"
                    />
                  ) : (
                    <span>Unsupported file</span>
                  )}
                </div>
              ) : (
                <label className="cursor-pointer">
                  <IoDocumentAttachSharp className="text-5xl text-gray-400 hover:text-black" />
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    name="proposal"
                    ref={proposalRef}
                    onChange={handleFileChange}
                    hidden
                    required
                  />
                  <span>Proposal</span>
                </label>
              )}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-[#2c2c2c] hover:bg-[#716acd] text-white px-4 py-2 rounded w-full">
            Submit
          </button>

          <button
            type="reset"
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded w-full">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompanyForm;
