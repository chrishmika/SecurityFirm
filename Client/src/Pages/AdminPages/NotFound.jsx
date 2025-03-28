import notFound from "../../assets/notFound.png";
const NotFound = () => {
  return (
    <div className="h-screen bg-[#e4dddd] text-black flex flex-col justify-center items-center">
      <img src={notFound} alt="Not found" className="w-2xl" />
      <span>Sorry Your Path Is Not Found</span>
      <span>Try Another Path</span>
    </div>
  );
};

export default NotFound;
