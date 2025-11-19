import { useState } from "react";
import useLogin from "../../hooks/useLogin";
import { toast } from "react-toastify";
import logoMain from "../../assets/logo-01.png";
//css styles
import { styles1 as styles } from "../../Components/styles/loginStyles";

const Login = () => {
  const [loginData, setLoginData] = useState({ NIC: "", password: "" });

  const { Login } = useLogin();

  const handleLoginData = (e) => setLoginData({ ...loginData, [e.target.name]: e.target.value });
  const forgetPasswordHandle = () => toast.info("Contact Admin");

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
    }
  };

  return (
    <div className={styles.loginBackgroundContainer}>
      {/* Crosshatch Art - Light Pattern */}
      <div className={styles.loginBackgroundStyle} style={styles.loginBackground} />

      <div className={styles.loginContainer}>
        <div className={styles.loginCompanyLogo}>
          <img src={logoMain} className="h-auto w-60 " />
        </div>

        <div className={styles.loginFormContainer}>
          <div>
            <form className={styles.loginForm} onSubmit={handleSubmit}>
              <div className="flex flex-col gap-1">
                <label>NIC</label>
                <input
                  type="text"
                  name="NIC"
                  value={loginData.NIC}
                  onChange={handleLoginData}
                  placeholder="User Name"
                  className={styles.loginInputArea}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginData}
                  placeholder="Password"
                  className={styles.loginInputArea}
                />
              </div>

              <button type="submit" className={styles.loginSubmitBtn}>
                Sign In
              </button>
            </form>

            <p onClick={forgetPasswordHandle} className={styles.loginForgetPassword}>
              Forget password?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
