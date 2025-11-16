import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function BackButton() {
  // Get the navigation function
  const navigate = useNavigate();

  // Create a function to go back
  const goBack = () => {
    navigate(-1); // This goes back one page
  };

  return (
    <button onClick={goBack} className="flex items-center gap-2 cursor-pointer ">
      <FaArrowLeft />
      Back
    </button>
  );
}

export default BackButton;
