import React from "react";
import GetHireForm from "../Components/Application Forms/GetHireForm";

const GetHired = () => {
  return (
    <div className="flex flex-col items-center p-4">
      <div className="mb-4 p-4">
        <h1 className="text-blue-900 text-4xl font-medium mb-4">Security Guard Services Quote</h1>
        <h2>
          “Have questions or need security services? Reach out to us or request a custom quote
          below.”
        </h2>
        <p className="text-gray-600 mb-5">
          Fill out our Security Services Quote Form below and we will get back to you immediately
          with a thorough proposal for your security contract. Whether you need a one-time security
          guard for an event or a lengthy contract for on-going security services, we've got you
          covered.
        </p>
      </div>

      <div className="flex w-full max-w-6xl mx-auto p-8">
        {/* Contact Info Section */}
        <div className="flex-1 pr-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Contact Us</h2>

          {/* Address */}
          <div className="flex items-start mb-6">
            <span className="text-2xl mr-4 mt-1">📍</span>
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Company Address</h3>
              <p className="text-gray-600 leading-relaxed">
                123 Business Avenue
                <br />
                City, State 10001
                <br />
                Country
              </p>
            </div>
          </div>

          {/* Phone Numbers */}
          <div className="flex items-start mb-6">
            <span className="text-2xl mr-4 mt-1">☎️</span>
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Phone Numbers</h3>
              <p className="text-gray-600 leading-relaxed">
                Office: +1 (123) 456-7890
                <br />
                Emergency: +1 (123) 456-7891
                <br />
                Fax: +1 (123) 456-7892
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start mb-6">
            <span className="text-2xl mr-4 mt-1">📧</span>
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Email Address</h3>
              <p className="text-gray-600 leading-relaxed">
                info@company.com
                <br />
                support@company.com
              </p>
            </div>
          </div>

          {/* Office Hours */}
          <div className="flex items-start mb-6">
            <span className="text-2xl mr-4 mt-1">🕒</span>
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Office Hours</h3>
              <p className="text-gray-600 leading-relaxed">
                Monday-Friday: 9:00 AM - 5:00 PM
                <br />
                Saturday: 10:00 AM - 2:00 PM
                <br />
                Sunday: Closed
              </p>
            </div>
          </div>

          {/* Map */}
          <div className="flex items-start mb-6">
            <span className="text-2xl mr-4 mt-1">🌐</span>
            <div className="w-full">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Find Us</h3>
              <div className="mt-2 rounded-lg overflow-hidden w-full">
                <iframe
                  title="Company Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215373510518!2d-73.98784468459382!3d40.74844047932799!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ0JzU0LjQiTiA3M8KwNTknMTkuNyJX!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                  width="100%"
                  height="200"
                  className="border-0"
                  allowFullScreen
                  loading="lazy"></iframe>
              </div>
            </div>
          </div>
        </div>

        {/* Empty Space - can be used for form or image later */}
        <div className="flex-1">
          {/* This div is intentionally left empty for layout purposes */}
          <GetHireForm />
        </div>
      </div>
    </div>
  );
};

export default GetHired;
