export const styles1 = {
  loginBackground: {
    backgroundImage: `
        repeating-linear-gradient(22.5deg, transparent, transparent 2px, rgba(75, 85, 99, 0.06) 2px, rgba(75, 85, 99, 0.06) 3px, transparent 3px, transparent 8px),
        repeating-linear-gradient(67.5deg, transparent, transparent 2px, rgba(107, 114, 128, 0.05) 2px, rgba(107, 114, 128, 0.05) 3px, transparent 3px, transparent 8px),
        repeating-linear-gradient(112.5deg, transparent, transparent 2px, rgba(55, 65, 81, 0.04) 2px, rgba(55, 65, 81, 0.04) 3px, transparent 3px, transparent 8px),
        repeating-linear-gradient(157.5deg, transparent, transparent 2px, rgba(31, 41, 55, 0.03) 2px, rgba(31, 41, 55, 0.03) 3px, transparent 3px, transparent 8px)
      `,
  },
  loginInputArea: "border-1 border-[#D9D9D9] rounded-md placeholder:text-[#D9D9D9] pl-3 h-9",
  loginSubmitBtn: "border rounded-md bg-[#2c2c2c] h-9 hover:bg-[#716acd] text-white",
  loginForgetPassword: "underline cursor-pointer",
  loginForm: "flex flex-col gap-5 mb-3",
  loginContainer: " flex gap-20 h-screen w-screen justify-center items-center",
  loginCompanyLogo: "md:flex justify-center items-center hidden",
  loginFormContainer: "flex flex-col justify-center items-center overflow-hidden",
  loginBackgroundContainer: "min-h-screen w-full bg-white relative text-gray-800",
  loginBackgroundStyle: "absolute inset-0 z-0 pointer-events-none",
};
