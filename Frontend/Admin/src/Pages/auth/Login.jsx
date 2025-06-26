import React, { useState } from "react";
// import { Info, Notify } from "../../Components/AdminDashboard/Notifications/Notification";
import useLogin from "../../hooks/useLogin";
import { toast } from "react-toastify";

const Login = () => {
  const [loginData, setLoginData] = useState({ NIC: "", password: "" });
  const { Login } = useLogin();

  {
    /*handlers*/
  }
  const handleLoginData = (e) => setLoginData({ ...loginData, [e.target.name]: e.target.value });
  const forgetPasswordHandle = () => toast.info("Contact Admin");

  {
    /**sending data to backend */
  }
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!loginData.NIC || !loginData.password) {
        toast.error("Fields are Empty");
        return;
      }

      Login(loginData.NIC, loginData.password);
    } catch (error) {
      toast.error(error.response.data.error);
      console.log(error);
    }
  };

  const inputStyle = "border-1 border-[#D9D9D9] rounded-md placeholder:text-[#D9D9D9] pl-3 h-9";
  return (
    <React.Fragment>
      <div className="flex gap-20 h-screen w-screen justify-center items-center">
        <div className="flex justify-center items-center">
          <img src="/logo-01.png" className="h-auto w-60 " />
        </div>
        <div className="flex flex-col justify-center items-center bg-white overflow-hidden">
          <div className="">
            <form className="flex flex-col gap-5 mb-3" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-1">
                <label>NIC</label>
                <input type="text" name="NIC" value={loginData.NIC} onChange={handleLoginData} placeholder="User Name" className={inputStyle} />
              </div>

              <div className="flex flex-col gap-1">
                <label>Password</label>
                <input type="password" name="password" value={loginData.password} onChange={handleLoginData} placeholder="Password" className={inputStyle} />
              </div>

              <button type="submit" className="border rounded-md bg-[#2c2c2c] h-9 hover:bg-[#716acd] text-white">
                Sign In
              </button>
            </form>

            <p onClick={forgetPasswordHandle} className="underline cursor-pointer">
              Forget password?
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;

//create account is needed as a function on admin
