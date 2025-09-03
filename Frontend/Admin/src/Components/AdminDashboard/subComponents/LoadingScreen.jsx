import { PuffLoader } from "react-spinners";
import { useAuthContext } from "../../../hooks/useAuthContext";

const LoadingScreen = () => {
  const { isLoading } = useAuthContext();
  return (
    <div>
      {isLoading && (
        <div className="flex justify-center items-center h-screen">
          <PuffLoader />
        </div>
      )}
    </div>
  );
};

export default LoadingScreen;
