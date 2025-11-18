import React from "react";
import { Eye } from "lucide-react";

const OurVisionCard = () => {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        {/* Header Section with Gradient */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-10">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Eye className="text-white" size={32} />
            <h1 className="text-3xl font-bold text-white">Our Vision</h1>
          </div>
          <div className="w-24 h-1 bg-blue-300 mx-auto rounded-full"></div>
        </div>

        {/* Content Section */}
        <div className="px-8 py-10">
          <p className="text-gray-700 text-lg leading-relaxed">
            At <span className="font-semibold text-gray-900">D-Vision Security Services</span>, 
            our vision is to be the most trusted and forward-thinking security partner in the industry. 
            Since <span className="font-semibold text-blue-600">2023</span>, we have remained committed 
            to raising the standards of safety, technology, and professionalism.
          </p>
          
          <p className="text-gray-700 text-lg leading-relaxed mt-6">
            Our goal is to create a secure and confident environment for individuals, businesses, and 
            communities—setting a new benchmark for dependable, modern, and client-focused security solutions.
          </p>

          {/* Optional: Core Values Pills */}
          <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-gray-200 ">
            <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
              Trusted
            </span>
            <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
              Forward-Thinking
            </span>
            <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
              Client-Focused
            </span>
            <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
              Reliable
            </span>
            <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
              Community-Safe
            </span>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurVisionCard;