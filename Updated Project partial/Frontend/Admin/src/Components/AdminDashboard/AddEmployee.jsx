import { useState } from "react";
import { Tooltip } from "react-tooltip";
import fileIcon from "../../assets/fileIcon.png";
import { ImCross } from "react-icons/im";
import EmployeeSearch from "./EmployeeSearch";
import { useEmployeeContext } from "../../hooks/useEmployeeContext";

const AddEmployee = () => {
  const { employee, setEmployee } = useEmployeeContext();
  //this part is also need to put into context//////////////////////////
  const [documents, setDocuments] = useState([]); // Store multiple files

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

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files); // Convert FileList to array
    setDocuments((prevFiles) => [...prevFiles, ...selectedFiles]); // Append new files
  };

  const removeFile = (index) => {
    setDocuments(documents.filter((_, i) => i !== index)); // Remove file by index
  };

  const submitHandle = (e) => {
    e.preventDefault();
  };

  return (
    <div className="  flex items-center justify-center ">
      <div className="w-full max-w-max bg-white p-6 rounded-lg shadow-lg">
        <EmployeeSearch />

        <form action="#" className="space-y-2" onSubmit={submitHandle}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <div className="space-y-4">
              <label>Employee ID</label>
              <input
                type="text"
                value={employee.empId}
                onChange={(e) => {
                  setEmployee({ ...employee, empId: e.target.value });
                }}
                name="emp_id"
                placeholder="EMP123456"
                className="border p-2 rounded w-full"
                required
              />

              <label>Full Name</label>
              <input
                type="text"
                value={employee.fullName}
                onChange={(e) => {
                  setEmployee({ ...employee, fullName: e.target.value });
                }}
                name="full_name"
                placeholder="Ushan kavindu Sumanasekara"
                className="border p-2 rounded w-full"
                required
              />

              <label>Name With Initials</label>
              <input
                type="text"
                value={employee.initials}
                onChange={(e) => {
                  setEmployee({ ...employee, initials: e.target.value });
                }}
                name="initials"
                placeholder="U. K. Sumanasekara"
                className="border p-2 rounded w-full"
                required
              />

              <label>Date of Birth:</label>
              <input
                type="date"
                value={employee.DOB}
                onChange={(e) => {
                  setEmployee({ ...employee, DOB: e.target.value });
                }}
                name="dob"
                className="border p-2 rounded w-full"
                required
              />

              <label>Address</label>
              <input
                type="text"
                value={employee.address}
                onChange={(e) => {
                  setEmployee({ ...employee, address: e.target.value });
                }}
                name="address"
                placeholder="No 0000/ X, Street, City, Postal Code"
                className="border p-2 rounded w-full"
                required
              />

              <label>Nationality</label>
              <select
                value={employee.nationality}
                onChange={(e) => {
                  setEmployee({ ...employee, nationality: e.target.value });
                }}
                name="nationality"
                className="border p-2 rounded w-full"
                required
              >
                <option>Select</option>
                <option>Sinhalese</option>
                <option>Tamil</option>
                <option>Burghers</option>
              </select>

              <label>Citizenship</label>
              <select
                value={employee.citizenship}
                onChange={(e) => {
                  setEmployee({ ...employee, citizenship: e.target.value });
                }}
                name="citizenship"
                className="border p-2 rounded w-full"
                required
              >
                <option>Select</option>
                <option>Sri Lankan by Descent</option>
                <option>Sri Lankan by Registration</option>
                <option>Foreign National</option>
              </select>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label htmlFor="contact1">Contact Number 1</label>
                  <input
                    type="tel"
                    value={employee.contact1}
                    onChange={(e) => {
                      setEmployee({ ...employee, contact1: e.target.value });
                    }}
                    name="contact1"
                    pattern="0\d{9}"
                    title="Phone number must be 10 digits and start with 0"
                    placeholder="e.g 0712345678"
                    className="border p-2 rounded w-full"
                    maxLength="10"
                    required
                    onInput={(e) => {
                      let value = e.target.value.replace(/\D/g, "");
                      if (value.length > 10) {
                        value = value.substring(0, 10);
                      }
                      e.target.value = value;
                    }}
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="contact2">Contact Number 2</label>
                  <input
                    type="tel"
                    value={employee.contact2}
                    onChange={(e) => {
                      setEmployee({ ...employee, contact2: e.target.value });
                    }}
                    name="contact2"
                    pattern="0\d{9}"
                    title="Phone number must be 10 digits and start with 0"
                    placeholder="e.g 0712345678"
                    className="border p-2 rounded w-full"
                    maxLength="10"
                    onInput={(e) => {
                      let value = e.target.value.replace(/\D/g, "");
                      if (value.length > 10) {
                        value = value.substring(0, 10);
                      }
                      e.target.value = value;
                    }}
                  />
                </div>
              </div>

              <label>Email</label>
              <input
                type="email"
                value={employee.email}
                onChange={(e) => {
                  setEmployee({ ...employee, email: e.target.value });
                }}
                name="email"
                placeholder="e.g email@example.com"
                className="border p-2 rounded w-full"
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label htmlFor="epf">EPF Number</label>
                  <input
                    type="text"
                    value={employee.EPF}
                    onChange={(e) => {
                      setEmployee({ ...employee, EPF: e.target.value });
                    }}
                    name="epf"
                    placeholder="EPF Number"
                    className="border p-2 rounded w-full"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="etf">ETF Number</label>
                  <input
                    type="text"
                    value={employee.ETF}
                    onChange={(e) => {
                      setEmployee({ ...employee, ETF: e.target.value });
                    }}
                    name="etf"
                    placeholder="ETF Number"
                    className="border p-2 rounded w-full"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label>NIC Number</label>
              <input
                type="text"
                value={employee.NIC}
                onChange={(e) => {
                  setEmployee({ ...employee, NIC: e.target.value });
                }}
                name="NIC"
                maxLength="12"
                pattern="\d{9}[vV]|\d{12}"
                title="NIC must have 10 digits with 'v' or 12 digits"
                placeholder="123456789V or 123456789123"
                className="border p-2 rounded w-full"
                required
              />

              <fieldset className="space-y-2">
                <legend className="font-semibold">Marital Status:</legend>
                <div className="flex space-x-2">
                  <label className="inline-flex items-center space-x-2">
                    <input
                      type="radio"
                      onChange={(e) => {
                        setEmployee({ ...employee, marital: e.target.value });
                      }}
                      name="marital_status"
                      value="Married"
                    />
                    <span>Married</span>
                  </label>

                  <label className="inline-flex items-center space-x-2">
                    <input
                      type="radio"
                      onChange={(e) => {
                        setEmployee({ ...employee, marital: e.target.value });
                      }}
                      name="marital_status"
                      value="Unmarried"
                    />
                    <span>Unmarried</span>
                  </label>
                </div>
              </fieldset>

              <fieldset className="space-y-1">
                <legend className="font-semibold">Gender:</legend>
                <div className="flex space-x-2">
                  <label className="inline-flex items-center space-x-2">
                    <input
                      type="radio"
                      onChange={(e) => {
                        setEmployee({ ...employee, gender: e.target.value });
                      }}
                      name="gender"
                      value="Male"
                    />
                    <span>Male</span>
                  </label>

                  <label className="inline-flex items-center space-x-2">
                    <input
                      type="radio"
                      onChange={(e) => {
                        setEmployee({ ...employee, gender: e.target.value });
                      }}
                      name="gender"
                      value="Female"
                    />
                    <span>Female</span>
                  </label>
                </div>
              </fieldset>

              <label>Number Of Years In Military</label>
              <input
                type="number"
                value={employee.militaryExperience}
                onChange={(e) => {
                  setEmployee({ ...employee, militaryExperience: e.target.value });
                }}
                name="military_years"
                min="0"
                placeholder="e.g 5 years"
                className="border p-2 rounded w-full"
              />

              <fieldset className="space-y-2">
                <legend className="font-semibold">Ability to Handle Guns:</legend>
                <div className="flex space-x-2">
                  <label className="inline-flex items-center space-x-2">
                    <input
                      type="radio"
                      onChange={(e) => {
                        setEmployee({ ...employee, handleGuns: e.target.value });
                      }}
                      name="gun_handling"
                      value="Yes"
                      required
                    />
                    <span>Yes</span>
                  </label>

                  <label className="inline-flex items-center space-x-2">
                    <input
                      type="radio"
                      onChange={(e) => {
                        setEmployee({ ...employee, handleGuns: e.target.value });
                      }}
                      name="gun_handling"
                      value="No"
                    />
                    <span>No</span>
                  </label>
                </div>
              </fieldset>

              <label>Experience</label>
              <textarea
                onChange={(e) => {
                  setEmployee({ ...employee, experience: e.target.value });
                }}
                value={employee.experience}
                name="experience"
                rows="3"
                placeholder="e.g 5 years as a security officer at XYZ Bank"
                className="border p-2 rounded w-full"
              ></textarea>

              <label>Disabilities (Leave empty is not applicable)</label>
              <textarea
                value={employee.disabilities}
                onChange={(e) => {
                  setEmployee({ ...employee, disabilities: e.target.value });
                }}
                name="disabilities"
                rows="2"
                placeholder="e.g Visual impairment, hearing disability, mobility challenges, etc."
                className="border p-2 rounded w-full"
              ></textarea>

              <label>Documents:</label>
              <input type="file" onChange={handleFileChange} name="documents" className="border p-2 rounded w-full" multiple />

              {documents.length > 0 && (
                <div className="mt-2">
                  <ul className="flex gap-10 -my-2 flex-wrap overflow-y-scroll max-h-20">
                    {documents.map((file, index) => (
                      <li key={index} className="flex flex-col items-start w-12 overflow-clip" data-tooltip-id="detailedTooltip">
                        <Tooltip id="detailedTooltip" place="top" effect="solid">
                          {file.name}
                        </Tooltip>
                        <button onClick={() => removeFile(index)} className="text-red-200 hover:text-red-500  cursor-pointer relative top-2 left-8">
                          <ImCross />
                        </button>
                        <button
                          onClick={() => {
                            downloadFile(file);
                          }}
                          className="cursor-pointer"
                        >
                          <img src={fileIcon} alt="My Image" />
                        </button>
                        <span className="flex flex-wrap">{file.name.split(" ")[0]}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="flex space-x-4">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
              Submit
            </button>

            <button type="reset" className="bg-black text-white px-4 py-2 rounded w-full">
              Cancel
            </button>
          </div>
        </form>
        {/*employee.gender}
        {employee.NIC*/}
      </div>
    </div>
  );
};

export default AddEmployee;
