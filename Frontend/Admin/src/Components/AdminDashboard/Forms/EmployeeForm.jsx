/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import axios from "axios";
import { IoCloseSharp } from "react-icons/io5";
import { CiFileOn } from "react-icons/ci";
import { useEmployeeContext } from "../../../hooks/useEmployeeContext";
import { toast } from "react-toastify";
import { forwardRef } from "react";
import LoadingScreen from "../subComponents/LoadingScreen";

const EmployeeForm = () => {
  const { employee, setEmployee, initialState } = useEmployeeContext();
  const [loading, SetLoading] = useState(false);

  const imageRef = useRef(null);
  const cvRef = useRef(null);
  const nicRef = useRef(null);
  const gsRef = useRef(null);

  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () =>
        setEmployee((prev) => ({ ...prev, [name]: { file, src: reader.result } }));
      reader.readAsDataURL(file);
    }
  };

  const downloadFile = (file) => {
    if (!file?.src) return;

    // Convert Base64 to Blob
    const arr = file.src.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    const blob = new Blob([u8arr], { type: mime });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.file?.name || "document";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const submitHandle = async (e) => {
    e.preventDefault();
    SetLoading(true);
    try {
      const response = await axios.post("/api/admin/createEmployee", employee, {
        withCredentials: true,
      });
      if (response.status === 200) {
        toast.success("Employee added successfully");
        setStep(1);
        setEmployee(initialState);
      }
      SetLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.error || "Something went wrong");
      SetLoading(false);
    }
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const inputFields = [
    // { label: "Employee ID", name: "empId", placeholder: "EMP123456" },
    { label: "Full Name", name: "name", placeholder: "Ushan Kavindu Sumanasekara" },
    { label: "Name With Initials", name: "initials", placeholder: "U. K. Sumanasekara" },
    { label: "Date of Birth", name: "birthday", type: "date" },
    { label: "Address No:", name: "number", placeholder: "00/X" },
    { label: "Street", name: "street", placeholder: "Street, City" },
    { label: "City", name: "city", placeholder: "City" },
  ];

  const documents = [
    ["img", imageRef],
    ["cv", cvRef],
    ["NICCopy", nicRef],
    ["gsCertificate", gsRef],
  ];

  return (
    <div className="flex justify-center p-6 bg-gray-100 min-h-screen">
      <div className={`col-span-full ${loading ? "block" : "hidden"}`}>
        <LoadingScreen />
      </div>

      <form
        onSubmit={submitHandle}
        className={`${
          !loading ? "block" : "hidden"
        } w-full max-w-5xl bg-white p-6 rounded-lg shadow space-y-6 }`}>
        {/* Step 1: Personal Details */}
        {step === 1 && (
          <StepSection title="Personal Details">
            {inputFields.map(({ label, name, placeholder = "", type = "text" }) => (
              <Input
                key={name}
                label={label}
                name={name}
                placeholder={placeholder}
                value={employee[name]}
                onChange={handleChange}
                type={type}
                required
              />
            ))}

            <Select
              label="Nationality"
              name="nationality"
              value={employee.nationality}
              onChange={handleChange}
              options={["Sinhalese", "Tamil", "Burghers"]}
            />
            <div className="flex gap-10">
              <RadioGroup
                label="Marital Status"
                name="marital"
                options={["Yes", "No"]}
                onChange={handleChange}
              />

              <RadioGroup
                label="Gender"
                name="sex"
                options={["Male", "Female"]}
                onChange={handleChange}
              />
            </div>
            <Select
              label="Citizenship"
              name="citizenship"
              value={employee.citizenship}
              onChange={handleChange}
              options={["Sri Lankan by Descent", "Sri Lankan by Registration", "Foreign National"]}
            />
            <StepButtons next={nextStep} />
          </StepSection>
        )}

        {/* Step 2: Contact Details */}
        {step === 2 && (
          <StepSection title="Contact Details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["contact1", "contact2"].map((field, i) => (
                <Input
                  key={field}
                  label={`Contact Number ${i + 1}`}
                  name={field}
                  value={employee[field]}
                  placeholder="e.g. 0712345678"
                  maxLength={10}
                  pattern="0\d{9}"
                  onChange={handleChange}
                />
              ))}
            </div>
            <Input
              label="Email"
              name="email"
              value={employee.email}
              onChange={handleChange}
              type="email"
              required
            />
            <StepButtons next={nextStep} back={prevStep} />
          </StepSection>
        )}

        {/* Step 3: Job Details */}
        {step === 3 && (
          <StepSection title="Job Details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="EPF Number" name="EPF" value={employee.EPF} onChange={handleChange} />
              <Input label="ETF Number" name="ETF" value={employee.ETF} onChange={handleChange} />
              <Select
                label="Position"
                name="position"
                value={employee.position}
                onChange={handleChange}
                options={["LSO", "JSO", "OIC", "SO"]}
              />
            </div>
            <StepButtons next={nextStep} back={prevStep} />
          </StepSection>
        )}

        {/* Step 4: Emergency & Extra Details */}
        {step === 4 && (
          <StepSection title="Emergency Details & Specialities">
            <Input
              label="Basic Salary"
              name="basicSalary"
              value={employee.basicSalary}
              onChange={handleChange}
            />
            <Input
              label="NIC Number"
              name="NIC"
              value={employee.NIC}
              onChange={handleChange}
              maxLength={12}
              required
            />
            <RadioGroup
              label="Military Experience"
              name="militaryStatus"
              options={["Yes", "No"]}
              onChange={handleChange}
            />
            <Textarea
              label="Experience"
              name="experience"
              value={employee.experience}
              onChange={handleChange}
            />
            <Textarea
              label="Special Abilities"
              name="specialAbilities"
              value={employee.specialAbilities}
              onChange={handleChange}
            />
            <RadioGroup
              label="Handling Guns?"
              name="gunHandling"
              options={["Yes", "No"]}
              onChange={handleChange}
              inputProps={{ "data-gramm": "false" }}
            />
            <Textarea
              label="Disabilities"
              name="disabilities"
              value={employee.disabilities}
              onChange={handleChange}
            />
            <StepButtons next={nextStep} back={prevStep} />
          </StepSection>
        )}

        {/* Step 5: Documents */}
        {step === 5 && (
          <StepSection title="Document Upload">
            <div className="flex flex-wrap gap-4">
              {documents.map(([name, ref]) => (
                <FileUpload
                  key={name}
                  label={name.toUpperCase()}
                  file={employee[name]}
                  name={name}
                  onChange={handleFileChange}
                  clear={() => {
                    setEmployee((prev) => ({ ...prev, [name]: null }));
                    ref.current.value = null;
                  }}
                  ref={ref}
                  onDownload={() => downloadFile(employee[name])}
                />
              ))}
            </div>
            <StepButtons back={prevStep} isFinal />
          </StepSection>
        )}
      </form>
    </div>
  );
};

// -------- REUSABLE COMPONENTS --------

const StepSection = ({ title, children }) => (
  <section className="space-y-6">
    <h2 className="text-xl font-bold border-b pb-2">{title}</h2>
    {children}
  </section>
);

const Input = ({ label, ...props }) => (
  <div className="flex flex-col">
    <label className="font-medium text-sm">{label}</label>
    <input className="border-b-2 p-2 rounded w-full" {...props} />
  </div>
);

const Textarea = ({ label, ...props }) => (
  <div className="flex flex-col">
    <label className="font-medium text-sm">{label}</label>
    <textarea className="border p-2 rounded w-full" rows="3" {...props}></textarea>
  </div>
);

const Select = ({ label, options, ...props }) => (
  <div className="flex flex-col">
    <label className="font-medium text-sm">{label}</label>
    <select className="border p-2 rounded w-full" {...props}>
      <option value="">Select</option>
      {options.map((opt) => (
        <option key={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

const RadioGroup = ({ label, name, options, onChange }) => (
  <fieldset className="space-y-1">
    <legend className="font-semibold">{label}</legend>
    <div className="flex gap-4">
      {options.map((opt) => (
        <label key={opt} className="inline-flex items-center gap-2">
          <input
            type="radio"
            name={name}
            value={opt.toUpperCase() === "YES" ? true : opt.toUpperCase() === "NO" ? false : opt}
            onChange={onChange}
          />
          <span>{opt}</span>
        </label>
      ))}
    </div>
  </fieldset>
);

const FileUpload = forwardRef(({ label, file, name, onChange, clear, onDownload }, ref) => (
  <div className="flex flex-col items-center w-[120px]">
    {file ? (
      <div className="relative w-full">
        <IoCloseSharp
          onClick={clear}
          className="absolute -top-2 -right-2 text-white bg-red-500 rounded-full cursor-pointer w-5 h-5"
        />
        {file.file.type.startsWith("image/") ? (
          <img
            src={file.src}
            alt={label}
            className="rounded-md cursor-pointer w-32 h-32"
            onClick={onDownload}
          />
        ) : file.file.type === "application/pdf" ? (
          <object data={file.src} type="application/pdf" className="w-40 h-32 rounded-md" />
        ) : (
          <span>Unsupported file</span>
        )}
        {/* <img src={file} alt={label} className="rounded-md cursor-pointer" onClick={onDownload} /> */}
      </div>
    ) : (
      <label className="flex flex-col items-center cursor-pointer">
        <CiFileOn className="text-5xl text-gray-400" />
        <span className="text-sm mt-2">{label}</span>
        <input
          type="file"
          accept="image/*,application/pdf"
          name={name}
          onChange={onChange}
          hidden
          ref={ref}
        />
      </label>
    )}
  </div>
));

FileUpload.displayName = "FileUpload";

const StepButtons = ({ next, back, isFinal = false }) => (
  <div className="flex justify-between gap-4 pt-6">
    {back && (
      <button
        type="button"
        onClick={back}
        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded w-full">
        Back
      </button>
    )}
    {isFinal ? (
      <button
        type="submit"
        className="bg-[#2c2c2c] hover:bg-[#716acd] text-white px-4 py-2 rounded w-full">
        Submit
      </button>
    ) : (
      <button
        type="button"
        onClick={next}
        className="bg-[#2c2c2c] hover:bg-[#716acd] text-white px-4 py-2 rounded w-full">
        Next
      </button>
    )}
  </div>
);

export default EmployeeForm;
