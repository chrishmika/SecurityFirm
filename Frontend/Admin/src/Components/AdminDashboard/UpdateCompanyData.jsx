import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AnimatePresence } from "motion/react";
import { ClipLoader } from "react-spinners";
import axios from "axios";

import profilePic from "../../assets/boy1.png";
import ConfirmationWindow from "../../utils/ComfirmationWindowPopUp";
import BackButton from "../../utils/BackButton";

const UpdateCompanyPrevious = () => {
  const { id } = useParams();
  const location = useLocation();
  const previous = location.state ? location.state.data : null;

  const [newVal, setNewVal] = useState();
  const [confirmation, setConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    let parsedValue = value;

    if (value === "true") parsedValue = true;
    else if (value === "false") parsedValue = false;
    else if (type === "number") parsedValue = Number(value);

    setNewVal((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
  };

  const updateCompany = async () => {
    try {
      setLoading(true);
      const response = await axios.put(`/api/company/${id}`, newVal, {
        withCredentials: true,
      });

      if (response.status === 200) {
        toast.success("Company updated successfully!");
      } else {
        toast.error("Update failed!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while updating!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex sm:flex-row flex-col justify-center sm:gap-10 p-4 bg-white text-sm text-gray-800 font-medium h-fit">
      <section className="flex flex-col p-4 space-y-6 ">
        <div>
          <BackButton />
        </div>

        <div className="w-full max-w-[280px] text-left">
          <img
            src={previous?.img || profilePic}
            alt="profile pic"
            className="w-28 h-28 rounded-full object-cover border-2 border-blue-500 shadow mb-4"
          />

          <header>
            <input
              type="text"
              name="name"
              value={newVal?.name || previous?.name}
              onChange={handleChange}
              placeholder="Company Name"
              className="text-2xl font-bold text-blue-900 w-full outline-none border-b mb-2"
            />
          </header>

          <address className="not-italic space-y-1 mb-4">
            <input
              type="email"
              name="companyEmail"
              value={newVal?.companyEmail || previous?.companyEmail}
              onChange={handleChange}
              placeholder="Company Email"
              className="w-full border p-1 rounded"
            />
          </address>

          <div className="space-y-4 w-full">
            <div>
              <label>Company Mobile Number</label>
              <input
                type="text"
                name="companyMobile"
                value={newVal?.companyMobile || previous?.companyMobile}
                onChange={handleChange}
                className="w-full border p-1 rounded"
              />
            </div>

            <div>
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={newVal?.address || previous?.address}
                onChange={handleChange}
                className="w-full border p-1 rounded"
              />
            </div>

            <h2 className="text-sm font-semibold mb-2">Coordinates</h2>
            <div className="flex gap-4">
              <input
                type="text"
                name="longitude"
                value={newVal?.longitude || previous?.longitude}
                onChange={handleChange}
                placeholder="Longitude"
                className="w-full border p-1 rounded"
              />
              <input
                type="text"
                name="latitude"
                value={newVal?.latitude || previous?.latitude}
                onChange={handleChange}
                placeholder="Latitude"
                className="w-full border p-1 rounded"
              />
            </div>
          </div>
        </div>

        {/* Company Representative */}
        <div>
          <h2 className="text-sm font-semibold mb-2">Company Representative</h2>
          <div className="space-y-4">
            <input
              type="text"
              name="agent"
              value={newVal?.agent || previous?.agent}
              onChange={handleChange}
              placeholder="Agent Name"
              className="border w-full p-1 rounded"
            />
            <input
              type="text"
              name="agentNIC"
              value={newVal?.agentNIC || previous?.agentNIC}
              onChange={handleChange}
              placeholder="Agent NIC"
              className="border w-full p-1 rounded"
            />
            <div className="flex gap-4">
              <input
                type="text"
                name="agentContact1"
                value={newVal?.agentContact1 || previous?.agentContact1}
                onChange={handleChange}
                placeholder="Contact 1"
                className="border w-full p-1 rounded"
              />
              <input
                type="text"
                name="agentContact2"
                value={newVal?.agentContact2 || previous?.agentContact2}
                onChange={handleChange}
                placeholder="Contact 2"
                className="border w-full p-1 rounded"
              />
            </div>
          </div>
        </div>

        {/* Update button */}
        <div className="flex justify-end mt-4 gap-10">
          <button
            className="rounded-lg text-white hover:bg-green-600 py-2 px-4 bg-green-500"
            onClick={() => setConfirmation(!confirmation)}>
            {loading ? <ClipLoader size={15} /> : `Update`}
          </button>
        </div>

        <AnimatePresence>
          {confirmation && ConfirmationWindow(updateCompany, setConfirmation, "Update This Record")}
        </AnimatePresence>
      </section>
    </main>
  );
};

export default UpdateCompanyPrevious;
