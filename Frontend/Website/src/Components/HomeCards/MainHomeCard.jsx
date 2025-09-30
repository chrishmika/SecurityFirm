import React, { useState } from "react";
import img from "../../assets/S3.webp";

const MainHomeCard = () => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between items-center gap-10 p-8 lg:p-16 bg-gradient-to-br from-gray-50 via-white to-gray-100 min-h-screen">
      {/* Left: Heading + Tagline + Buttons */}
      <div className="flex flex-col justify-center items-start gap-6 lg:w-1/2 max-w-2xl">
        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
          Protecting Your Business Starts Here...
          <span className="block mt-2 text-3xl sm:text-4xl lg:text-2xl font-semibold text-blue-600">
            Elite Security Personnel for Offices, Warehouses & Corporate Facilities
          </span>
        </h1>

        {/* Tagline */}
        <p className="text-base lg:text-lg text-gray-600 font-medium">
          Serving your city with trusted security solutions.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
          <a href="gethired">
            <button className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/40 hover:scale-105 transition-all duration-300 hover:from-amber-500 hover:to-orange-600 ring-2 ring-amber-300/50">
              Get a Free Quote
            </button>
          </a>
          <button
            onClick={togglePopup}
            className="bg-gradient-to-r from-indigo-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/40 hover:scale-105 transition-all duration-300 hover:from-indigo-700 hover:to-blue-800 ring-2 ring-indigo-300/50">
            Contact Us
          </button>
        </div>
      </div>

      {/* Right: Image + Paragraph */}
      <div className="lg:w-1/2 flex flex-col items-center gap-6">
        {/* Image */}
        <div className="relative group w-full max-w-lg">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
          <img
            src={img}
            alt="Security Professional"
            className="relative rounded-2xl shadow-2xl w-full h-auto object-cover group-hover:scale-105 transition-all duration-500 ring-4 ring-white"
          />
        </div>

        {/* Paragraph Below Image */}
        <p className="text-lg lg:text-xl text-gray-700 leading-relaxed font-medium text-center lg:text-left max-w-lg">
          At <span className="text-blue-600 font-semibold">D-vision</span>, we provide highly
          trained security professionals to safeguard your business from threats — ensuring employee
          safety, asset protection, and 24/7 monitoring tailored to your industry.
        </p>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h2>
            <p className="text-gray-700 mb-2">
              📞 <span className="font-semibold">+94 77 123 4567</span>
            </p>
            <p className="text-gray-700 mb-6">
              📧 <span className="font-semibold">info@dvision.com</span>
            </p>
            <p className="text-gray-700 mb-2">
              🌎
              <span className="font-semibold">
                958/35 kks road <br />
                jaffna <br />
              </span>
            </p>
            <button
              onClick={togglePopup}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-lg font-medium shadow hover:scale-105 transition-all duration-300">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainHomeCard;
