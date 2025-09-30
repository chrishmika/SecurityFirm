//import img1 from "../assets/joinus.jpeg"; // make sure you have an image
import JobApplyForm from "../Components/Application Forms/JobApplyForm";
import { NavLink, Outlet } from "react-router-dom";

const JoinUs = () => {
  return (
    <div className="container mx-auto p-4">
      {/* Page Header */}
      <div className="text-center mb-5 bg-green-600 text-white p-6 rounded-lg shadow-lg">
        <h1 className="text-5xl font-semibold">Join Our Security Team</h1>
      </div>

      {/* Sub Header */}
      <div className="text-center mb-6">
        <p className="text-3xl text-gray-800 font-medium">Secure Your Future with Us!</p>
      </div>

      {/* Image + Paragraph Section */}
      <div className="flex flex-col lg:flex-row mb-8 items-center gap-6">
        <div className="flex-1 p-4 text-left">
          <p className="text-gray-700 leading-relaxed mb-5">
            At <span className="text-blue-600 font-semibold">D-vision</span>, we are always looking
            for dedicated security professionals to join our team. We offer competitive wages,
            benefits, and flexible hours. If you are passionate about safety and protection, apply
            now to start your career in security with us.
          </p>

          <h2 className="text-2xl text-blue-900 font-semibold mb-3">
            Security Guard Application Process
          </h2>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-5">
            <li>Our HR team will review your application.</li>
            <li>Shortlisted candidates will be contacted for an interview.</li>
            <li>Successful applicants undergo training before deployment.</li>
          </ul>

          <p className="text-gray-700 mb-5">
            Click the button below to start the application process on Indeed.
          </p>
        </div>

        {/* Image Section */}
        <div className="flex-1">
          <img
            src="/team.png"
            alt="Join Security Team"
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
      </div>
      <JobApplyForm />
    </div>
  );
};

export default JoinUs;
