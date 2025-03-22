import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Info, Notify } from "../../Components/AdminDashboard/Notifications/Notification";
import { ToastContainer } from "react-toastify";

const SignIn = () => {
  const [loginData, setLoginData] = useState({ nic: "", password: "" });
  const navigate = useNavigate();

  {
    /**handlers*/
  }
  const handleLoginData = (e) => setLoginData({ ...loginData, [e.target.name]: e.target.value });
  const forgetPasswordHandle = () => Info("Contact Admin");

  {
    /**sending data to backend */
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!loginData.nic && !loginData.password) {
      Notify("Fields are Empty");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/api/v1/user/signin", loginData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status == 200) {
        localStorage.setItem("user", JSON.stringify(response.data));
        console.log(response.data);
        if (response.data.role == "admin") {
          // navigate("/dashboard/admindashboard/dashboard");
        }
        if (response.data.role == "user") {
          // navigate("/user");
        }
        return;
      } else {
        Notify(response.data.message); //message from backend
        return;
      }
    } catch (error) {
      Notify(error.response.data.err);
      console.log(error);
    }
  };

  const inputStyle = "border-1 border-[#D9D9D9] rounded-md placeholder:text-[#D9D9D9] pl-3 h-9";
  return (
    <React.Fragment>
      <div className="flex flex-col justify-center items-center h-screen w-screen bg-white overflow-hidden">
        <div className="border p-6 rounded-md">
          <form className="flex flex-col gap-5 mb-3" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label>NIC</label>
              <input type="text" name="nic" value={loginData.nic} onChange={handleLoginData} placeholder="User Name" className={inputStyle} />
            </div>
            <div className="flex flex-col gap-1">
              <label>Password</label>
              <input type="password" name="password" value={loginData.password} onChange={handleLoginData} placeholder="Password" className={inputStyle} />
            </div>
            <button type="submit" className="border rounded-md bg-[#2C2C2C] h-9 hover:bg-[#333] text-white">
              Sign In
            </button>
          </form>
          <p onClick={forgetPasswordHandle} className="underline cursor-pointer">
            Forget password?
          </p>
        </div>
      </div>
      <ToastContainer />;
    </React.Fragment>
  );
};

export default SignIn;
