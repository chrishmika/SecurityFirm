import React from "react";

import img from "../../assets/S2.jpg";

const MainHomeCard = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center gap-2 p-8 lg:p-16 bg-gradient-to-br from-gray-50 via-white to-gray-100 min-h-screen">
      <div className="flex flex-col justify-center items-start gap-8 lg:w-1/2 max-w-2xl">
        <div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
            Protecting Your Business Starts Here
            <span className="block mt-2 text-3xl sm:text-4xl lg:text-5xl font-semibold text-blue-600">
              Elite Security Personnel for Offices, Warehouses & Corporate Facilities
            </span>
          </h1>
        </div>

        <p className="text-lg lg:text-xl text-gray-700 leading-relaxed font-medium">
          At [Company Name], we provide highly trained security professionals to safeguard your
          business from threats—ensuring employee safety, asset protection, and 24/7 monitoring
          tailored to your industry.
        </p>
        <p className="text-base lg:text-lg text-gray-600 flex items-center gap-2 font-medium">
          <span className="text-red-500 text-xl">📍</span>
          Serving [City/Region] with Trusted Security Solutions
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto">
          <button className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/40 transform hover:scale-105 transition-all duration-300 hover:from-amber-500 hover:to-orange-600 ring-2 ring-amber-300/50">
            Get a Free Quote
          </button>
          <button className="bg-gradient-to-r from-indigo-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/40 transform hover:scale-105 transition-all duration-300 hover:from-indigo-700 hover:to-blue-800 ring-2 ring-indigo-300/50">
            Contact Us
          </button>
        </div>
      </div>

      <div className="lg:w-1/2 flex justify-center items-center">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
          <img
            src={img}
            alt="Security Professional"
            className="relative rounded-2xl shadow-2xl max-w-full h-auto object-cover transform group-hover:scale-105 transition-all duration-500 ring-4 ring-white"
          />
        </div>
      </div>
    </div>
  );
};

export default MainHomeCard;
