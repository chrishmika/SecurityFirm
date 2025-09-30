import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const GetHireForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [serviceLocation, setServiceLocation] = useState("");
  const [district, setDistrict] = useState("");
  const [nearestCity, setNearestCity] = useState("");
  const [startDate, setStartDate] = useState("");
  const [daysNeed, setDaysNeed] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");

  const [loading, setLoading] = useState(false);

  // Add error states
  const [errors, setErrors] = useState({
    email: "",
    mobile: "",
    serviceType: "",
  });

  // Validate form data
  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      email: "",
      mobile: "",
      serviceType: "",
    };

    // Validate email
    if (email && !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Validate mobile
    if (mobile && !/^\d{10}$/.test(mobile)) {
      newErrors.mobile = "Please enter a valid phone number (format: 000-0000000)";
      isValid = false;
    }

    // Validate service type
    if (serviceType === "" || serviceType === "*") {
      newErrors.serviceType = "Please select a service type";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const districts = [
    "Ampara",
    "Anuradhapura",
    "Badulla",
    "Batticaloa",
    "Colombo",
    "Galle",
    "Gampaha",
    "Hambantota",
    "Jaffna",
    "Kalutara",
    "Kandy",
    "Kegalle",
    "Kilinochchi",
    "Kurunegala",
    "Mannar",
    "Matale",
    "Matara",
    "Monaragala",
    "Mullaitivu",
    "Nuwara Eliya",
    "Polonnaruwa",
    "Puttalam",
    "Ratnapura",
    "Trincomalee",
    "Vavuniya",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate form before submission
    if (!validateForm()) {
      setLoading(false);
      toast.error("Please correct the errors in the form", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    const getHireData = {
      name,
      email,
      contact: mobile,
      address: `${serviceLocation}, ${district}, ${nearestCity}`,
      date: startDate,
      period: daysNeed,
      type: serviceType,
      description: additionalDetails,
    };

    try {
      await axios.post("http://localhost:5000/api/web/companyRequest", getHireData);

      setName("");
      setEmail("");
      setMobile("");
      setServiceLocation("");
      setDistrict("");
      setNearestCity("");
      setStartDate("");
      setDaysNeed("");
      setServiceType("");
      setAdditionalDetails("");

      toast.success("Application submitted successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Application submission failed", {
        position: "top-right",
        autoClose: 3000,
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
    <div className="bg-white lg:w-[500px] sm:w-100 ">
      <h1 className="text-red-800 text-2xl mb-4 p-3 font-medium text-center">
        Fill the form completely{" "}
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label className="text-gray-900 text-sm font-medium mb-2">Full Name : </label>
          <input
            className="bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 p-2.5 w-full "
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
            placeholder="Enter Full Name"
          />
        </div>

        <div className="mb-5">
          <label className="text-gray-900 text-sm font-medium mb-2" htmlFor="">
            Email :{" "}
          </label>
          <input
            className={`bg-gray-50 border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-lg text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 p-2.5 w-full`}
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors({ ...errors, email: "" });
            }}
            value={email}
            required
            placeholder="email@example.com"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        <div className="mb-5">
          <label className="text-gray-900 text-sm font-medium mb-2" htmlFor="">
            Mobile :{" "}
          </label>
          <input
            className={`bg-gray-50 border ${
              errors.mobile ? "border-red-500" : "border-gray-300"
            } rounded-lg text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 p-2.5 w-full`}
            type="text"
            onChange={(e) => {
              setMobile(e.target.value);
              if (errors.mobile) setErrors({ ...errors, mobile: "" });
            }}
            value={mobile}
            required
            placeholder="000-0000000"
          />
          {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
        </div>

        <div className="mb-5">
          <label className="text-gray-900 text-sm font-medium mb-2" htmlFor="">
            Service Location :{" "}
          </label>
          <input
            className="bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 p-2.5 w-full "
            type="text"
            onChange={(e) => setServiceLocation(e.target.value)}
            value={serviceLocation}
            required
            placeholder="Enter location"
          />
        </div>

        <div className="mb-5">
          <label className="text-gray-900 text-sm font-medium mb-2" htmlFor="">
            District :{" "}
          </label>

          <select
            className="bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 p-2.5 w-full "
            type="text"
            onChange={(e) => setDistrict(e.target.value)}
            value={district}
            required>
            <option value="*">Select a district</option>
            {districts.map((district, index) => (
              <option key={index} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-5">
          <label className="text-gray-900 text-sm font-medium mb-2" htmlFor="">
            Nearest City :{" "}
          </label>
          <input
            className="bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 p-2.5 w-full "
            type="text"
            onChange={(e) => setNearestCity(e.target.value)}
            value={nearestCity}
            required
            placeholder="Enter nearest city"
          />
        </div>

        <div className="mb-5">
          <p className="mb-2">Detailed Dates & Times</p>
          <div className="flex justify-between">
            <div className="pr-4">
              <label className="text-gray-900 text-sm font-medium mb-2" htmlFor="">
                Start of service date
              </label>
              <input
                className="bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 p-2.5 w-full "
                type="date"
                onChange={(e) => setStartDate(e.target.value)}
                value={startDate}
                required
              />
            </div>
            <div className="">
              <label className="text-gray-900 text-sm font-medium mb-2" htmlFor="">
                How many days of service ? :{" "}
              </label>
              <input
                className="bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 p-2.5 w-full "
                type="number"
                min="1"
                step="1"
                onChange={(e) => setDaysNeed(e.target.value)}
                value={daysNeed}
                placeholder="Number of days"
              />
            </div>
          </div>
        </div>

        <div className="mb-5">
          <label className="text-gray-900 text-sm font-medium mb-2" htmlFor="">
            What type of service are you looking for?
          </label>
          <select
            className={`bg-gray-50 border ${
              errors.serviceType ? "border-red-500" : "border-gray-300"
            } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
            onChange={(e) => {
              setServiceType(e.target.value);
              if (errors.serviceType) setErrors({ ...errors, serviceType: "" });
            }}
            value={serviceType}
            required>
            <option value="">Please choose</option>
            <option value="Security Guard Services">Security Guard Services</option>
            <option value="Event Security">Event Security</option>
            <option value="Fire Watch">Fire Watch</option>
          </select>
          {errors.serviceType && <p className="text-red-500 text-xs mt-1">{errors.serviceType}</p>}
        </div>

        <div className="mb-5">
          <label className="text-gray-900 text-sm font-medium mb-2" htmlFor="">
            Provide details of your security services request:
          </label>
          <textarea
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            rows="5"
            placeholder="Provide additional details : Specific days, Hours ... "
            onChange={(e) => setAdditionalDetails(e.target.value)}
            value={additionalDetails}></textarea>
        </div>

        <div className="mb-5 flex justify-center">
          <button
            className="text-white bg-blue-600 px-6 py-3 text-sm font-medium rounded-lg hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
            type="submit"
            disabled={loading}>
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GetHireForm;
