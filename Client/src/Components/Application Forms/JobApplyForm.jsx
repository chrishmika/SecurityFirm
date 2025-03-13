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
  const [gsCertification, setGSCertification] = useState(null);
  const [hasExperience, setHasExperience] = useState("*");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("*");
  const [nationality, setNationality] = useState("*");
  const [citizenship, setCitizenship] = useState("*");
  const [maritalStatus, setMaritalStatus] = useState("*");
  const [disabilities, setDisabilities] = useState("");
  const [experience, setExperience] = useState("");
  const [handlingGuns, setHandlingGuns] = useState("*");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("dob", dob);
    formData.append("address", address);
    formData.append("gender", gender);
    formData.append("nationality", nationality);
    formData.append("citizenship", citizenship);
    formData.append("maritalStatus", maritalStatus);
    formData.append("disabilities", disabilities);
    formData.append("hasExperience", hasExperience);
    formData.append("experience", experience);
    formData.append("handlingGuns", handlingGuns);
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
    if (gsCertification) {
      const uploadGsCertification = await uploadImage(email, "gsCertification", gsCertification);
      formData.append("gsCertificationPath", uploadGsCertification);
    }
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
      setNationality("*");
      setCitizenship("*");
      setMaritalStatus("*");
      setDisabilities("");
      setExperience("");
      setHasExperience(false);
      setHandlingGuns(false);
      setIdCard(null);
      setCv(null);
      setGSCertification(null);
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
    <div className="bg-white lg:w-[500px] sm:w-full">
      <div className="mb-4">
        <h1 className="text-red-700 text-4xl">Apply</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <div className="bg-red-100 p-4 rounded-lg mb-4">
            <p className="font-medium mb-3">Personal Information</p>
            <div className="mb-5">
              <label className="text-gray-900 text-sm font-medium mb-2">Full Name: </label>
              <input className="bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 p-2.5 w-full" type="text" onChange={(e) => setName(e.target.value)} value={name} required placeholder="Enter your full name" />
            </div>
            <div className="mb-5">
              <label className="text-gray-900 text-sm font-medium mb-2">Date of Birth: </label>
              <input className="bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 p-2.5 w-full" type="date" onChange={(e) => setDob(e.target.value)} value={dob} required placeholder="YYYY-MM-DD" />
            </div>
            <div className="mb-5">
              <label className="text-gray-900 text-sm font-medium mb-2">Address: </label>
              <input className="bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 p-2.5 w-full" type="text" onChange={(e) => setAddress(e.target.value)} value={address} required placeholder="Enter your address" />
            </div>
            <div className="mb-5">
              <label className="text-gray-900 text-sm font-medium mb-2">Gender: </label>
              <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={(e) => setGender(e.target.value)} value={gender} required>
                <option value="*">Please choose</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="mb-5">
              <label className="text-gray-900 text-sm font-medium mb-2">Nationality: </label>
              <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={(e) => setNationality(e.target.value)} value={nationality} required>
                <option value="*">Please choose</option>
                <option value="sinhala">Sinhala</option>
                <option value="tamil">Tamil</option>
                <option value="muslims">Muslim</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="mb-5">
              <label className="text-gray-900 text-sm font-medium mb-2">Citizenship: </label>
              <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={(e) => setCitizenship(e.target.value)} value={citizenship} required>
                <option value="*">Please choose</option>
                <option value="local">Local</option>
                <option value="foreign">Foreign</option>
              </select>
            </div>
            <div className="mb-5">
              <label className="text-gray-900 text-sm font-medium mb-2">Marital Status: </label>
              <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={(e) => setMaritalStatus(e.target.value)} value={maritalStatus} required>
                <option value="*">Please choose</option>
                <option value="married">Married</option>
                <option value="unmarried">Unmarried</option>
                <option value="separated">Separated</option>
              </select>
            </div>
            <div className="mb-5">
              <label className="text-gray-900 text-sm font-medium mb-2">Do you suffer from any Disabilities?: </label>
              <input
                className="bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 p-2.5 w-full"
                type="text"
                onChange={(e) => setDisabilities(e.target.value)}
                value={disabilities}
                required
                placeholder="Please state whether you have any disabilities or not"
              />
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="font-medium mb-3">Previous Work Details</p>
            <div className="mb-5">
              <label className="text-gray-900 text-sm font-medium mb-2">Have you served in the military?</label>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={hasExperience}
                onChange={(e) => setHasExperience(e.target.value === "1")}
                // required
              >
                <option value="*">Select</option>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>
            {hasExperience === true && (
              <React.Fragment>
                <div className="mb-5">
                  <label className="text-gray-900 text-sm font-medium mb-2">Years of service: </label>
                  <input className="bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 p-2.5 w-full" type="number" onChange={(e) => setExperience(e.target.value)} value={experience} required placeholder="Enter years of service" />
                </div>
                <div className="mb-5">
                  <label className="text-gray-900 text-sm font-medium mb-2">Do you have experience in handling firearms or weapons as part of your job? </label>
                  <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={handlingGuns} onChange={(e) => setHandlingGuns(e.target.value === "1")} required>
                    <option value="*">Please choose</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </select>
                </div>
              </React.Fragment>
            )}
          </div>

          <div className="bg-green-50 p-4 rounded-lg mb-4">
            <p className="font-medium mb-3">Documents & Miscellaneous</p>
            <div className="mb-5">
              <label className="text-gray-900 text-sm font-medium mb-2">Upload a recent photo of your government-issued ID: </label>
              <p className="text-sm text-gray-600 mb-2">(e.g., passport, driver&apos;s license, national ID. Accepted formats: JPG, PNG, PDF)</p>
              <input className="block w-full bg-gray-50 border text-sm border-gray-300 p-2.5 rounded-lg" type="file" name="idCard" accept="image/*,.pdf" onChange={(e) => setIdCard(e.target.files[0])} required />
            </div>

            <div className="mb-5">
              <label className="text-gray-900 text-sm font-medium mb-2">CV (PDF): </label>
              <input
                className="block w-full bg-gray-50 border text-sm border-gray-300 p-2.5 rounded-lg"
                type="file"
                onChange={(e) => setCv(e.target.files[0])}
                accept=".pdf"
                // required
              />
            </div>

            {hasExperience === true && (
              <div className="mb-5">
                <label className="text-gray-900 text-sm font-medium mb-2">GS certification (JPG, JPEG, PNG ,pdf): </label>
                <input
                  className="block w-full bg-gray-50 border text-sm border-gray-300 p-2.5 rounded-lg"
                  type="file"
                  onChange={(e) => setGSCertification(e.target.files[0])}
                  accept="image/*"
                  // required
                />
              </div>
            )}
          </div>

          <div className="bg-purple-50 p-4 rounded-lg mb-4">
            <p className="font-medium mb-3">Contact Information</p>
            <div className="mb-5">
              <label className="text-gray-900 text-sm font-medium mb-2">Email: </label>
              <input className="bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 p-2.5 w-full" type="email" onChange={(e) => setEmail(e.target.value)} value={email} required placeholder="example@email.com" />
            </div>
            <div className="mb-5">
              <label className="text-gray-900 text-sm font-medium mb-2">Mobile: </label>
              <input className="bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 p-2.5 w-full" type="tel" onChange={(e) => setMobile(e.target.value)} value={mobile} required placeholder="000-0000000" />
            </div>
          </div>

          <div className="mb-5 flex justify-center">
            <button className="text-white bg-blue-600 px-6 py-3 text-sm font-medium rounded-lg hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed" type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default JobApplyForm;
