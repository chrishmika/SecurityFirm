import React, { useState } from "react";
import { Info, Notify } from "../../Components/AdminDashboard/Notifications/Notification";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const [loginData, setLoginData] = useState({ NIC: "", password: "" });
  const { Login } = useLogin();

  {
    /*handlers*/
  }
  const handleLoginData = (e) => setLoginData({ ...loginData, [e.target.name]: e.target.value });
  const forgetPasswordHandle = () => Info("Contact Admin");

  {
    /**sending data to backend */
  }
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!loginData.NIC || !loginData.password) {
        Notify("Fields are Empty");
        return;
      }

      Login(loginData.NIC, loginData.password);
    } catch (error) {
      Notify(error.response.data.error);
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
              <input type="text" name="NIC" value={loginData.NIC} onChange={handleLoginData} placeholder="User Name" className={inputStyle} />
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
    </React.Fragment>
  );
};

export default Login;

//create account is needed as a function on admin
