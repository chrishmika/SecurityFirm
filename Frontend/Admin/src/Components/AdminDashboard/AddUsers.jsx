import { useRef, useState } from "react";

// import fileIcon from "../../assets/fileIcon.png";
import { IoCloseSharp } from "react-icons/io5";
import { CiFileOn } from "react-icons/ci";

// import EmployeeSearch from "./EmployeeSearch";
import { useEmployeeContext } from "../../hooks/useEmployeeContext";
import { useCompanyContext } from "../../hooks/useCompanyContext";

import { toast } from "react-toastify";
import axios from "axios";
import { FaToggleOff, FaToggleOn } from "react-icons/fa6";

const AddUsers = () => {
  const { employee, setEmployee } = useEmployeeContext();
  const { company, setCompany } = useCompanyContext();

  const [choice, setChoice] = useState(false);

  const imageRef = useRef(null);
  const cvRef = useRef(null);
  const gsRef = useRef(null);
  const nicRef = useRef(null);

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

  const submitHandle = async (e) => {
    e.preventDefault();
    try {
      const url = !choice ? "/api/admin/createEmployee" : "/api/admin/createCompany";
      const details = !choice ? employee : company;

      const response = await axios.post(url, details, { withCredentials: true });
      if (response.status == 200) {
        toast.success("data added");
        toast.success(response.message);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    {
      !choice ? setEmployee((prev) => ({ ...prev, [name]: value })) : setCompany((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        {
          !choice ? setEmployee((prev) => ({ ...prev, [name]: reader.result })) : setCompany((prev) => ({ ...prev, [name]: reader.result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const fields = [
    { label: "Employee ID", name: "empId", placeholder: "EMP123456 //Needed to assign automatically" },
    { label: "Full Name", name: "name", placeholder: "Ushan kavindu Sumanasekara" },
    { label: "Name With Initials", name: "initials", placeholder: "U. K. Sumanasekara" },
    { label: "Date of Birth", name: "birthday", type: "date" },
    { label: "Address", name: "address", placeholder: "No 0000/ X, Street, City, Postal Code" },
    { label: "position", name: "position", placeholder: "LSO" },
  ];

  return (
    <div>
      <div className="text-xl flex gap-3 items-center">
        <span className="text-4xl" onClick={() => setChoice(!choice)}>
          {choice ? <FaToggleOn /> : <FaToggleOff />}
        </span>
        {choice ? `Company` : `Employee`}
      </div>

      <div className="flex items-center justify-center ">
        <div className="w-full max-w-max bg-white p-6 rounded-lg shadow-lg">
          {/* <EmployeeSearch />*/}

          {!choice ? (
            <form className="space-y-2" onSubmit={submitHandle}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-8">
                {/* LEFT COLUMN */}
                <div className="space-y-4">
                  <span className="text-white bg-black flex px-3 font-medium">Personal Details</span>

                  {fields.map(({ label, name, placeholder = "", type = "text" }) => (
                    <div key={name}>
                      <label>{label}</label>
                      <input type={type} name={name} placeholder={placeholder} value={employee[name]} onChange={handleChange} className="border p-2 rounded w-full" required />
                    </div>
                  ))}

                  <div>
                    <label>Nationality</label>
                    <select name="nationality" value={employee.nationality} onChange={handleChange} className="border p-2 rounded w-full" required>
                      <option value="">Select</option>
                      <option>Sinhalese</option>
                      <option>Tamil</option>
                      <option>Burghers</option>
                    </select>
                  </div>

                  <div>
                    <label>Citizenship</label>
                    <select name="citizenship" value={employee.citizenship} onChange={handleChange} className="border p-2 rounded w-full" required>
                      <option value="">Select</option>
                      <option>Sri Lankan by Descent</option>
                      <option>Sri Lankan by Registration</option>
                      <option>Foreign National</option>
                    </select>
                  </div>
                  <span className="text-white bg-black flex px-3  font-medium">Contact Details</span>

                  {/* Contacts */}
                  <div className="grid grid-cols-2 gap-4">
                    {["contact1", "contact2"].map((field) => (
                      <div key={field} className="flex flex-col">
                        <label>{`Contact Number ${field === "contact1" ? "1" : "2"}`}</label>
                        <input
                          type="tel"
                          name={field}
                          value={employee[field]}
                          pattern="0\d{9}"
                          maxLength="10"
                          placeholder="e.g 0712345678"
                          onChange={handleChange}
                          onInput={(e) => {
                            let value = e.target.value.replace(/\D/g, "").slice(0, 10);
                            e.target.value = value;
                          }}
                          className="border p-2 rounded w-full"
                          required={field === "contact1"}
                        />
                      </div>
                    ))}
                  </div>

                  {/*Email*/}
                  <div>
                    <label>Email</label>
                    <input type="email" name="email" value={employee.email} onChange={handleChange} placeholder="e.g email@example.com" className="border p-2 rounded w-full" required />
                  </div>

                  {/* EPF/ETF */}
                  <div className="grid grid-cols-2 gap-4 ">
                    {["EPF", "ETF"].map((field) => (
                      <div key={field} className="flex flex-col">
                        <label>{`${field} Number`}</label>
                        <input type="text" name={field} value={employee[field]} onChange={handleChange} placeholder={`${field} Number`} className="border p-2 rounded w-full" />
                      </div>
                    ))}
                  </div>

                  <span className="text-white bg-black flex px-3  font-medium">Emergency Details</span>

                  {/*Salary*/}
                  <div>
                    <label>Basic Salary</label>
                    <input type="text" name="basicSalary" value={employee.basicSalary} onChange={handleChange} maxLength="5" placeholder="123456789V or 123456789123" className="border p-2 rounded w-full" />
                  </div>
                </div>

                {/* RIGHT COLUMN */}
                <div className="space-y-4">
                  {/*NIC number */}
                  <div>
                    <label>NIC Number</label>
                    <input type="text" name="NIC" value={employee.NIC} onChange={handleChange} maxLength="12" pattern="\d{9}[vV]|\d{12}" placeholder="123456789V or 123456789123" className="border p-2 rounded w-full" required />
                  </div>

                  {/* Marital Status */}
                  <fieldset className="space-y-2">
                    <legend className="font-semibold">Marital Status:</legend>

                    <label className="inline-flex items-center space-x-2 pr-2">
                      <input type="radio" name="marital" value={true} onChange={handleChange} />
                      <span>Married</span>
                    </label>

                    <label className="inline-flex items-center space-x-2 pr-2">
                      <input type="radio" name="marital" value={false} onChange={handleChange} />
                      <span>Unmarried</span>
                    </label>
                  </fieldset>

                  {/* Gender */}
                  <fieldset className="space-y-2">
                    <legend className="font-semibold">Gender:</legend>
                    {["Male", "Female"].map((gender) => (
                      <label key={gender} className="inline-flex items-center gap-1 space-x-2 pr-2">
                        <input type="radio" name="sex" value={gender} onChange={handleChange} />
                        <span>{gender}</span>
                      </label>
                    ))}
                  </fieldset>

                  <span className="text-white bg-black flex px-3  font-medium">Specialities</span>

                  {/**new added */}
                  {/* Military Experience */}
                  <div className="flex flex-col">
                    <fieldset className="space-y-2">
                      <legend className="font-semibold">Military Experience:</legend>

                      <label className="inline-flex items-center space-x-2 pr-2">
                        <input type="radio" name="militaryStatus" value={true} onChange={handleChange} />
                        <span>Yes</span>
                      </label>

                      <label className="inline-flex items-center space-x-2 pr-2">
                        <input type="radio" name="militaryStatus" value={false} onChange={handleChange} />
                        <span>No</span>
                      </label>
                    </fieldset>
                  </div>

                  {/* Experience */}
                  <div>
                    <label>Experience</label>
                    <textarea name="experience" value={employee.experience} onChange={handleChange} rows="3" placeholder="e.g 5 years as a security officer at XYZ Bank" className="border p-2 rounded w-full"></textarea>
                  </div>

                  {/*specialAbilities*/}
                  <div>
                    <label>Special Abilities</label>
                    <textarea name="specialAbilities" value={employee.specialAbilities} onChange={handleChange} rows="3" placeholder="e.g " className="border p-2 rounded w-full"></textarea>
                  </div>

                  {/**new added */}
                  {/* Handle Guns */}
                  <fieldset className="space-y-2">
                    <legend className="font-semibold">Ability to Handle Guns:</legend>

                    <label className="inline-flex items-center space-x-2 pr-2">
                      <input type="radio" name="gunHandling" value={true} onChange={handleChange} />
                      <span>yes</span>
                    </label>

                    <label className="inline-flex items-center space-x-2 pr-2">
                      <input type="radio" name="gunHandling" value={false} onChange={handleChange} />
                      <span>No</span>
                    </label>
                  </fieldset>

                  {/* Disabilities */}
                  <div>
                    <label>Disabilities (Leave empty if not applicable)</label>
                    <textarea name="disabilities" value={employee.disabilities} onChange={handleChange} rows="2" placeholder="e.g Visual impairment, hearing disability, mobility challenges, etc." className="border p-2 rounded w-full"></textarea>
                  </div>

                  <span className="text-white bg-black flex px-3  font-medium">Documents</span>

                  {/*image uploading part, feel better if i can use drag and drop here 
                image preview is needed to add as well */}
                  <div className="flex gap-3 flex-wrap justify-between">
                    {[
                      ["img", imageRef],
                      ["cv", cvRef],
                      ["NICCopy", gsRef],
                      ["gsCertificate", nicRef],
                    ].map((field) => (
                      <div key={field[0]} className="flex flex-col gap-2">
                        {/*Image preview*/}
                        {employee?.[field[0]] && (
                          <div className="w-full">
                            <span className="flex w-25 justify-end z-10 relative top-2 left-2 ">
                              <IoCloseSharp
                                className=" text-white bg-gray-800 rounded-full h-5 flex cursor-pointer w-5 hover:bg-red-400"
                                onClick={() => {
                                  setEmployee((prev) => ({ ...prev, [field[0]]: null }));
                                  field[1].current.value = null;
                                }}
                              />
                            </span>
                            <img src={employee[field[0]]} className="w-25 h-auto rounded-md" onClick={() => downloadFile(employee[field[0]])} />
                          </div>
                        )}

                        <label className=" items-center flex flex-col space-x-2">
                          {/*upload image */}
                          {!employee[field[0]] && <CiFileOn className="text-7xl my-3 cursor-pointer" />}
                          <span>{field[0].toUpperCase()}</span>

                          <input type="file" accept="image/*" hidden onChange={handleFileChange} ref={field[1]} name={field[0]} className="border p-2 rounded w-full" />
                        </label>
                      </div>
                    ))}
                  </div>

                  {/**Buttons */}
                  <div className="flex gap-3">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
                      Submit
                    </button>

                    <button type="reset" className="bg-black text-white px-4 py-2 rounded w-full">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <form className="space-y-2" onSubmit={submitHandle}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-8 space-y-4">
                {/*col 1*/}
                <div className="space-y-4">
                  <span className="text-white bg-black flex px-3  font-medium">Company Details</span>

                  <label>data</label>
                  <input type="text" onChange={handleChange} className="border p-2 rounded w-full" />
                  <label>data</label>
                  <input type="text" onChange={handleChange} className="border p-2 rounded w-full" />
                  <label>data</label>
                  <input type="text" onChange={handleChange} className="border p-2 rounded w-full" />
                  <label>data</label>
                  <input type="text" onChange={handleChange} className="border p-2 rounded w-full" />
                  <label>data</label>
                  <input type="text" onChange={handleChange} className="border p-2 rounded w-full" />

                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" onChange={handleChange} className="border p-2 rounded w-full" />

                    <input type="text" onChange={handleChange} className="border p-2 rounded w-full" />
                  </div>

                  <span className="text-white bg-black flex px-3  font-medium">Contact Details</span>
                  <label>data</label>
                  <input type="text" onChange={handleChange} className="border p-2 rounded w-full" />
                </div>

                {/*col 2*/}
                <div className="space-y-4">
                  <span className="text-white bg-black flex px-3  font-medium">Contract Details</span>
                  <label>data</label>
                  <input type="text" onChange={handleChange} className="border p-2 rounded w-full" />

                  {/*Email*/}
                  <div>
                    <label>Email</label>
                    <input type="email" name="email" value={company.email} onChange={handleChange} placeholder="e.g email@example.com" className="border p-2 rounded w-full" required />
                  </div>

                  <span className="text-white bg-black flex px-3  font-medium">Documents</span>

                  {/*Buttons */}
                  <div className="flex gap-3">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
                      Submit
                    </button>

                    <button type="reset" className="bg-black text-white px-4 py-2 rounded w-full">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddUsers;
