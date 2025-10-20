import { ClipLoader } from "react-spinners";

const LoadingScreen = () => {
  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <ClipLoader />
      </div>
    </div>
  );
};

export default LoadingScreen;
