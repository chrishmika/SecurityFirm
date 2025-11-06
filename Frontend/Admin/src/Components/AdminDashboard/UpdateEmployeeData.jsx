import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AnimatePresence } from "motion/react";
import { ClipLoader } from "react-spinners";
import axios from "axios";

import profilePic from "../../assets/boy1.png";
import ConfirmationWindow from "../../utils/ComfirmationWindowPopUp";

const UpdateEmployeeprevious = () => {
  const { id } = useParams();
  const location = useLocation();
  const previous = location.state ? location.state.data : null;

  // --- Store editable employee data ---
  const [newVal, setNewVal] = useState();
  const [confirmation, setConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);

  // --- Handle field changes ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewVal((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // --- Update employee record ---
  const updateWithNewprevious = async () => {
    try {
      setLoading(true);
      const response = await axios.put(`/api/employee/${id}`, newVal, { withCredentials: true });
      if (response.status === 200) {
        toast.success("Employee updated successfully!");
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
    <main className="flex sm:flex-row flex-col justify-around h-full bg-white p-4 gap-4 text-sm text-gray-800 font-medium">
      {/* LEFT COLUMN - BASIC INFO */}
      <section className="flex flex-col items-end p-2 space-y-4 overflow-hidden">
        <div className="w-full max-w-[280px] text-left">
          <img
            src={previous?.img || profilePic}
            alt="profile pic"
            className="w-28 h-28 rounded-full object-cover border-2 border-blue-500 shadow mb-4"
          />
          <div>
            <label>Employee Number : </label>
            <span className=" w-full p-1 rounded">{newVal?.empId || previous?.empId}</span>
          </div>

          <input
            className="border w-full p-1 mb-2 rounded"
            name="NIC"
            value={newVal?.NIC || previous?.NIC}
            onChange={handleChange}
            placeholder="NIC"
          />

          <input
            className="border w-full p-1 mb-2 rounded"
            name="email"
            value={newVal?.email || previous?.email}
            onChange={handleChange}
            placeholder="Email"
          />

          <div className="space-y-4 w-full">
            <div>
              <label>Full Name</label>
              <input
                className="border w-full p-1 rounded"
                name="name"
                value={newVal?.name || previous?.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Address</label>
              <input
                className="border w-full p-1 rounded"
                name="address"
                value={newVal?.address || previous?.address}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Birthday</label>
              <input
                type="date"
                className="border w-full p-1 rounded"
                name="birthday"
                value={newVal?.birthday?.split("T")[0] || previous?.birthday?.split("T")[0]}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Gender</label>
              <select
                name="sex"
                value={newVal?.sex || previous?.sex}
                onChange={handleChange}
                className="border w-full p-1 rounded">
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div>
              <label>Martial</label>
              <select
                name="marital"
                value={
                  newVal?.marital !== undefined
                    ? String(newVal.marital)
                    : previous?.marital !== undefined
                    ? String(previous.marital)
                    : ""
                }
                onChange={handleChange}
                className="border w-full p-1 rounded">
                <option value="">Select</option>
                <option value={true}>Married</option>
                <option value={false}>Unmarried</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* RIGHT COLUMN - EMERGENCY + ACTIONS */}
      <section className="p-4 space-y-6 overflow-hidden">
        <header>
          <h1 className="text-2xl font-bold text-blue-900">{newVal?.name || previous?.name}</h1>
          <input
            className="border w-full p-1 rounded mt-2"
            name="position"
            value={newVal?.position || previous?.position}
            onChange={handleChange}
            placeholder="Position"
          />
        </header>

        <div className="flex gap-6">
          <div>
            <label>ETF</label>
            <input
              className="border p-1 rounded w-full"
              name="ETF"
              value={newVal?.ETF || previous?.ETF}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>EPF</label>
            <input
              className="border p-1 rounded w-full"
              name="EPF"
              value={newVal?.EPF || previous?.EPF}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label>Basic Salary</label>
          <input
            className="border p-1 rounded w-full"
            name="basicSalary"
            value={newVal?.basicSalary || previous?.basicSalary}
            onChange={handleChange}
          />
        </div>

        {/* EXPERIENCE */}
        <section>
          <h2 className="text-sm font-semibold mb-2">EXPERIENCE</h2>
          <textarea
            className="border w-full p-1 rounded"
            name="militaryDescription"
            value={newVal?.militaryDescription || previous?.militaryDescription}
            onChange={handleChange}
            placeholder="Military Details"
          />
          <textarea
            className="border w-full p-1 rounded mt-2"
            name="specialAbilities"
            value={newVal?.specialAbilities || previous?.specialAbilities}
            onChange={handleChange}
            placeholder="Special Abilities"
          />
        </section>
        {/* </section> */}

        {/* <aside className="p-4 overflow-hidden"> */}
        <section className="mt-8">
          <h2 className="text-sm font-semibold">EMERGENCY</h2>
          <div className="mt-4 space-y-4">
            <input
              className="border w-full p-1 rounded"
              name="emerganceyName"
              value={newVal?.emerganceyName || previous?.emerganceyName}
              onChange={handleChange}
              placeholder="Emergency Name"
            />
            <input
              className="border w-full p-1 rounded"
              name="emerganceyAddress"
              value={newVal?.emerganceyAddress || previous?.emerganceyAddress}
              onChange={handleChange}
              placeholder="Emergency Address"
            />
            <input
              className="border w-full p-1 rounded"
              name="emerganceyContact"
              value={newVal?.emerganceyContact || previous?.emerganceyContact}
              onChange={handleChange}
              placeholder="Emergency Contact"
            />
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex justify-end mt-10 gap-4">
            <button
              onClick={() => {
                setConfirmation(true);
              }}
              className="rounded-lg text-white hover:bg-green-600 py-2 px-4 bg-green-500"
              disabled={loading}>
              {loading ? <ClipLoader size={15} /> : "Update"}
            </button>
          </div>

          <AnimatePresence>
            {confirmation &&
              ConfirmationWindow(updateWithNewprevious, setConfirmation, "update this Record")}
          </AnimatePresence>
        </section>
      </section>
    </main>
  );
};

export default UpdateEmployeeprevious;
