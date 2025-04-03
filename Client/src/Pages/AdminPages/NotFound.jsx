import notFound from "../../assets/notFound.png";
const NotFound = () => {
  return (
    <div className="h-screen bg-[#e4dddd] text-black flex flex-col justify-center items-center">
      <img src={notFound} alt="Not found" className="w-2xl" />
      <span>Sorry Your Page Not Found</span>
      <span>Try Another page or wait and time and try again</span>
    </div>
  );
};

export default NotFound;
