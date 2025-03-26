import { useState } from "react";
import { Tooltip } from "react-tooltip";
import fileIcon from "../../assets/fileIcon.png";
import { ImCross } from "react-icons/im";

const AddEmployee = () => {
  const [searchEmp, setSearchEmp] = useState("");
  const [searchEmpName, setSearchEmpName] = useState("");
  const [empId, setEmpId] = useState("");
  const [fullName, setFullName] = useState("");
  const [initials, setInitials] = useState("");
  const [DOB, setDOB] = useState("");
  const [address, setAddress] = useState("");
  const [nationality, setNationality] = useState("");
  const [citizenship, setCitizenship] = useState("");
  const [contact1, setContact1] = useState("");
  const [contact2, setContact2] = useState("");
  const [email, setEmail] = useState("");
  const [EPF, setEPF] = useState(null);
  const [ETF, setETF] = useState(null);
  const [NIC, setNIC] = useState(null);
  const [marital, setMarital] = useState("");
  const [gender, setGender] = useState("");
  const [militaryExperience, setMilitaryExperience] = useState(null);
  const [handleGuns, setHandleGuns] = useState(null);
  const [experience, setExperience] = useState("");
  const [disabilities, setDisabilities] = useState("");
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

  const searchHandle = (e) => {
    e.preventDefault();
  };

  const submitHandle = (e) => {
    e.preventDefault();
  };

  return (
    <div className="  flex items-center justify-center ">
      <div className="w-full max-w-max bg-white p-6 rounded-lg shadow-lg">
        {/*<h2 className="text-2xl font-bold mb-4">Employee Form</h2>*/}
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
              <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded">
                Search
              </button>
            </div>
          </form>
          <hr className="mt-5 shadow-2xl" />
        </div>

        <form action="#" className="space-y-2" onSubmit={submitHandle}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <div className="space-y-4">
              <label>Employee ID</label>
              <input
                type="text"
                value={empId}
                onChange={(e) => {
                  setEmpId(e.target.value);
                }}
                name="emp_id"
                placeholder="EMP123456"
                className="border p-2 rounded w-full"
                required
              />
              <label>Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
                name="full_name"
                placeholder="John Doe"
                className="border p-2 rounded w-full"
                required
              />
              <label>Name With Initials</label>
              <input
                type="text"
                value={initials}
                onChange={(e) => {
                  setInitials(e.target.value);
                }}
                name="initials"
                placeholder="J. D. Perera"
                className="border p-2 rounded w-full"
                required
              />
              <label>Date of Birth:</label>
              <input
                type="date"
                value={DOB}
                onChange={(e) => {
                  setDOB(e.target.value);
                }}
                name="dob"
                className="border p-2 rounded w-full"
                required
              />
              <label>Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                name="address"
                placeholder="No 0000/ X, Street, City, Postal Code"
                className="border p-2 rounded w-full"
                required
              />
              <label>Nationality</label>
              <select
                value={nationality}
                onChange={(e) => {
                  setNationality(e.target.value);
                }}
                name="nationality"
                className="border p-2 rounded w-full"
                required
              >
                <option>Sinhalese</option>
                <option>Tamil</option>
                <option>Moors</option>
                <option>Burghers</option>
                <option>Malays</option>
                <option>Vedda</option>
              </select>
              <label>Citizenship</label>
              <select
                value={citizenship}
                onChange={(e) => {
                  setCitizenship(e.target.value);
                }}
                name="citizenship"
                className="border p-2 rounded w-full"
                required
              >
                <option>Sri Lankan by Descent</option>
                <option>Sri Lankan by Registration</option>
                <option>Foreign National</option>
              </select>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label htmlFor="contact1">Contact Number 1</label>
                  <input
                    type="tel"
                    value={contact1}
                    onChange={(e) => {
                      setContact1(e.target.value);
                    }}
                    name="contact1"
                    pattern="0\d{9}"
                    title="Phone number must be 10 digits and start with 0"
                    placeholder="eg., 0712345678"
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
                    value={contact2}
                    onChange={(e) => {
                      setContact2(e.target.value);
                    }}
                    name="contact2"
                    pattern="0\d{9}"
                    title="Phone number must be 10 digits and start with 0"
                    placeholder="eg., 0712345678"
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
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                name="email"
                placeholder="e.g., john.doe@example.com"
                className="border p-2 rounded w-full"
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label htmlFor="epf">EPF Number</label>
                  <input
                    type="text"
                    value={EPF}
                    onChange={(e) => {
                      setEPF(e.target.value);
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
                    value={ETF}
                    onChange={(e) => {
                      setETF(e.target.value);
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
                value={NIC}
                onChange={(e) => {
                  setNIC(e.target.value);
                }}
                name="nic"
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
                        setMarital(e.target.value);
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
                        setMarital(e.target.value);
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
                        setGender(e.target.value);
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
                        setGender(e.target.value);
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
                value={militaryExperience}
                onChange={(e) => {
                  setMilitaryExperience(e.target.value);
                }}
                name="military_years"
                min="0"
                placeholder="e.g., 5 years"
                className="border p-2 rounded w-full"
              />

              <fieldset className="space-y-2">
                <legend className="font-semibold">Ability to Handle Guns:</legend>
                <div className="flex space-x-2">
                  <label className="inline-flex items-center space-x-2">
                    <input
                      type="radio"
                      onChange={(e) => {
                        setHandleGuns(e.target.value);
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
                        setHandleGuns(e.target.value);
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
                  setExperience(e.target.value);
                }}
                value={experience}
                name="experience"
                rows="3"
                placeholder="e.g., 5 years as a security officer at XYZ Bank"
                className="border p-2 rounded w-full"
              ></textarea>

              <label>Disabilities (Leave empty is not applicable)</label>
              <textarea
                value={disabilities}
                onChange={(e) => {
                  setDisabilities(e.target.value);
                }}
                name="disabilities"
                rows="2"
                placeholder="e.g., Visual impairment, hearing disability, mobility challenges, etc."
                className="border p-2 rounded w-full"
              ></textarea>

              <label>Documents:</label>
              <input type="file" onChange={handleFileChange} name="documents" className="border p-2 rounded w-full" multiple />

              {documents.length > 0 && (
                <div className="mt-2">
                  <ul className="flex gap-10 my-3 flex-wrap overflow-y-scroll max-h-20">
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
      </div>
    </div>
  );
};

export default AddEmployee;
