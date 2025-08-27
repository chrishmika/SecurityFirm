import React from "react";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import uploadImage from "../../Services/AuthServices";

const JobApplyForm = () => {
  //file handle karanna use state
  const [idCard, setIdCard] = useState(null);
  const [cv, setCv] = useState(null);
  // const [gsCertification, setGSCertification] = useState(null);
  // const [hasExperience, setHasExperience] = useState("*");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("*");
  // const [nationality, setNationality] = useState("*");
  // const [citizenship, setCitizenship] = useState("*");
  // const [maritalStatus, setMaritalStatus] = useState("*");
  const [disabilities, setDisabilities] = useState("");
  // const [experience, setExperience] = useState("");
  // const [handlingGuns, setHandlingGuns] = useState("*");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    email: "",
    mobile: "",
    // serviceType: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      email: "",
      mobile: "",
      // serviceType: "",
    };

    if (email && !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }
    if (mobile && !/^\d{10}$/.test(mobile)) {
      newErrors.mobile = "Please enter a valid phone number (format: 000-0000000)";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("dob", dob);
    formData.append("address", address);
    formData.append("gender", gender);
    // formData.append("nationality", nationality);
    // formData.append("citizenship", citizenship);
    // formData.append("maritalStatus", maritalStatus);
    formData.append("disabilities", disabilities);
    // formData.append("hasExperience", hasExperience);
    // formData.append("experience", experience);
    // formData.append("handlingGuns", handlingGuns);
    formData.append("email", email);
    formData.append("mobile", mobile);

    if (idCard) {
      const uploadIdCard = await uploadImage(email, "idCard", idCard);
      formData.append("idCardPath", uploadIdCard);
    }
    if (cv) {
      const uploadCv = await uploadImage(email, "cv", cv);
      formData.append("cvPath", uploadCv);
    }
    // if (gsCertification) {
    //   const uploadGsCertification = await uploadImage(email, "gsCertification", gsCertification);
    //   formData.append("gsCertificationPath", uploadGsCertification);
    // }
    try {
      // console.log(formData);
      const response = await axios.post("http://localhost:4000/api/v1/web/employeeform", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setName("");
      setDob("");
      setAddress("");
      setGender("*");
      // setNationality("*");
      // setCitizenship("*");
      // setMaritalStatus("*");
      setDisabilities("");
      // setExperience("");
      // setHasExperience("0");
      // setHandlingGuns("0");
      setIdCard(null);
      setCv(null);
      // setGSCertification(null);
      setEmail("");
      setMobile("");

      toast.success("Application submitted successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.error(error);
      toast.error("Application submission failed", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
            <h1 className="text-white text-3xl font-bold">Job Application</h1>
            <p className="text-blue-100 mt-2">
              Please fill out all required fields to complete your application
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="p-8">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Personal Information Section */}
                <div className="space-y-6">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h2 className="text-xl font-semibold text-gray-800 mb-1">
                      Personal Information
                    </h2>
                    <p className="text-sm text-gray-600">Basic details about yourself</p>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm placeholder-gray-400"
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        required
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date of Birth <span className="text-red-500">*</span>
                      </label>
                      <input
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                        type="date"
                        onChange={(e) => setDob(e.target.value)}
                        value={dob}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm placeholder-gray-400 resize-none"
                        rows="3"
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                        required
                        placeholder="Enter your complete address"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gender <span className="text-red-500">*</span>
                      </label>
                      <select
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm bg-white"
                        onChange={(e) => setGender(e.target.value)}
                        value={gender}
                        required>
                        <option value="*">Please select your gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="prefer-not-to-say">Prefer not to say</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Accessibility Requirements <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm placeholder-gray-400 resize-none"
                        rows="3"
                        onChange={(e) => setDisabilities(e.target.value)}
                        value={disabilities}
                        required
                        placeholder="Please describe any accessibility accommodations you may need, or write 'None' if not applicable"
                      />
                    </div>
                  </div>
                </div>

                {/* Contact & Documents Section */}
                <div className="space-y-6">
                  {/* Contact Information */}
                  <div>
                    <div className="border-l-4 border-green-500 pl-4 mb-6">
                      <h2 className="text-xl font-semibold text-gray-800 mb-1">
                        Contact Information
                      </h2>
                      <p className="text-sm text-gray-600">How we can reach you</p>
                    </div>

                    <div className="space-y-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          className={`w-full px-4 py-3 border ${
                            errors.email ? "border-red-500 ring-2 ring-red-200" : "border-gray-300"
                          } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm placeholder-gray-400`}
                          type="email"
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (errors.email) setErrors({ ...errors, email: "" });
                          }}
                          value={email}
                          required
                          placeholder="example@email.com"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-xs mt-2 flex items-center">
                            <span className="mr-1">⚠️</span>
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Mobile Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm placeholder-gray-400"
                          type="tel"
                          onChange={(e) => {
                            setMobile(e.target.value);
                            if (errors.mobile) setErrors({ ...errors, mobile: "" });
                          }}
                          value={mobile}
                          required
                          placeholder="+1 (555) 000-0000"
                        />
                        {errors.mobile && (
                          <p className="text-red-500 text-xs mt-2 flex items-center">
                            <span className="mr-1">⚠️</span>
                            {errors.mobile}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Documents Section */}
                  <div>
                    <div className="border-l-4 border-purple-500 pl-4 mb-6">
                      <h2 className="text-xl font-semibold text-gray-800 mb-1">
                        Required Documents
                      </h2>
                      <p className="text-sm text-gray-600">Upload your identification and resume</p>
                    </div>

                    <div className="space-y-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Government-Issued ID <span className="text-red-500">*</span>
                        </label>
                        <p className="text-xs text-gray-500 mb-3">
                          Upload a clear photo of your passport, driver's license, or national ID
                          (JPG, PNG, PDF)
                        </p>
                        <div className="relative">
                          <input
                            className="w-full px-4 py-3 border border-dashed border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            type="file"
                            name="idCard"
                            accept="image/*,.pdf"
                            onChange={(e) => setIdCard(e.target.files[0])}
                            required
                          />
                        </div>
                        {idCard && (
                          <p className="text-xs text-green-600 mt-2 flex items-center">
                            <span className="mr-1">✓</span>File selected: {idCard.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Resume/CV <span className="text-red-500">*</span>
                        </label>
                        <p className="text-xs text-gray-500 mb-3">
                          Upload your current resume in PDF format
                        </p>
                        <div className="relative">
                          <input
                            className="w-full px-4 py-3 border border-dashed border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                            type="file"
                            onChange={(e) => setCv(e.target.files[0])}
                            accept=".pdf"
                            required
                          />
                        </div>
                        {cv && (
                          <p className="text-xs text-green-600 mt-2 flex items-center">
                            <span className="mr-1">✓</span>File selected: {cv.name}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-10 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    <span className="text-red-500">*</span> Required fields
                  </p>
                  <button
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                    type="submit"
                    disabled={loading}>
                    {loading ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting Application...
                      </span>
                    ) : (
                      "Submit Application"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobApplyForm;
