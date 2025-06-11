import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const SignIn = () => {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  {
    /**toatify notification settings*/
  }
  const notify = (message) => toast.error(message ? message : "error occur");
  const info = (message) => toast.info(message ? message : "Empty message");

  {
    /**handlers*/
  }
  const handleLoginData = (e) => setLoginData({ ...loginData, [e.target.name]: e.target.value });
  const forgetPasswordHandle = () => info("Contact Admin");

  {
    /**sending data to backend */
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!loginData.username && !loginData.password) {
      notify("Both Username and Password needed");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/app/v1/AdminValidate/", loginData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status == 200) {
        localStorage.setItem("token", response.data.token);
        navigate("/admindashboard");
        return;
      } else {
        notify(response.data.message); //message from backend
        return;
      }
    } catch (error) {
      notify("Networ Error");
      console.log(error);
    }
  };

  const inputStyle = "border-1 border-[#D9D9D9] rounded-md placeholder:text-[#D9D9D9] pl-3 h-9";
  return (
    <React.Fragment>
      <div className="flex flex-col justify-center items-center h-screen w-screen inter bg-[#FFFFFF]">
        <div className="border-1 border-[#D9D9D9] p-6 rounded-md">
          <form className="flex flex-col gap-5 mb-3" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label>User</label>
              <input type="text" name="username" value={loginData.username} onChange={handleLoginData} placeholder="User Name" className={inputStyle} />
            </div>

            <div className="flex flex-col gap-1">
              <label>Password</label>
              <input type="password" name="password" value={loginData.password} onChange={handleLoginData} placeholder="Password" className={inputStyle} />
            </div>

            <div className="flex flex-col">
              <button type="submit" name="submit" className="border-1 rounded-md bg-[#2C2C2C] h-9 hover:bg-[#] hover:cursor-pointer">
                <span className="text-white">Sign In</span>
              </button>
            </div>
          </form>

          <p onClick={forgetPasswordHandle} className="underline underline-offset-4  cursor-pointer">
            Forget password?
          </p>
        </div>
      </div>
      <ToastContainer />;
    </React.Fragment>
  );
};

export default SignIn;
