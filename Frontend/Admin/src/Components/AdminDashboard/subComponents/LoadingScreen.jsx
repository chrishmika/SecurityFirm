import { PuffLoader } from "react-spinners";

const LoadingScreen = () => {
  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <PuffLoader />
      </div>
    </div>
  );
};

export default LoadingScreen;
