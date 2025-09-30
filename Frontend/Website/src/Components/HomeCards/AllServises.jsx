import { Link, useNavigate } from "react-router-dom";

const AllServises = () => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/services");
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <Link
        to="/services"
        onClick={handleClick}
        className="text-blue-500 text-2xl hover:text-blue-700 transition duration-300 text-center block mt-2 mb-4">
        more services...
      </Link>
    </div>
  );
};

export default AllServises;
