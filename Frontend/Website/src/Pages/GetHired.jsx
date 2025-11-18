import React from "react";
import InfiniteScrollAnimationPage from "../Components/HomeCards/InfiniteScrollLogo";
import GetHireForm from "../Components/Application Forms/GetHireForm";

const GetHired = () => {
  return (
    <div className="container mx-auto p-4">
      {/* Page Header */}
      <div className="text-center mb-5 bg-green-600 text-white p-6 rounded-lg shadow-lg">
        <h1 className="text-5xl font-semibold">Security Guard Services Quote</h1>
      </div>

      {/* Sub Header */}
      <div className="text-center mb-6">
        <h2 className="text-3xl text-gray-800 font-medium mb-3">
          “Have questions or need security services?” 
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Fill out our Security Services Quote Form and we’ll get back to you immediately with a
          tailored proposal. Whether you need a one-time event security guard or a long-term
          contract, we’ve got you covered with professional manpower and reliable solutions.
        </p>
      </div>

      {/* Contact Info + Form Section */}
      <div className="flex flex-col lg:flex-row-reverse w-full max-w-7xl mx-auto gap-10 p-6 bg-yellow-50 rounded-3xl">
        {/* Contact Info Section */}
        <div className="flex-1 bg-white pb-5 px-5 ">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 bg-yellow-50 p-5">Contact Us</h2>

          {/* Address */}
          <div className="flex items-start mb-6">
            <span className="text-2xl mr-4 mt-1">🌎</span>
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Company Address</h3>
              <p className="text-gray-600 leading-relaxed">
                No 279/2,Elivila Road, <br />
                Makandura,Gonawila, 60170 <br />
                Sri Lanka
              </p>
            </div>
          </div>

          {/* Phone Numbers */}
          <div className="flex items-start mb-6">
            <span className="text-2xl mr-4 mt-1">☎️</span>
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Phone Numbers</h3>
              <p className="text-gray-600 leading-relaxed">
                Office: 031 2299454<br />
                Emergency: 077 7446637 <br />
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start mb-6">
            <span className="text-2xl mr-4 mt-1">📧</span>
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Email Address</h3>
              <p className="text-gray-600 leading-relaxed">
                dvisioninternational1@gmail.com<br />
              </p>
            </div>
          </div>

          {/* Office Hours */}
          <div className="flex items-start mb-6">
            <span className="text-2xl mr-4 mt-1">🕒</span>
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Office Hours</h3>
              <p className="text-gray-600 leading-relaxed">
                Monday–Sunday: 9:00 AM – 5:00 PM <br />
                Sunday: 10:00 AM – 2:00 PM <br />
              </p>
            </div>
          </div>

          {/* Map */}
          <div className="flex items-start mb-6">
            <span className="text-2xl mr-4 mt-1">🌐</span>
            <div className="w-full">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Find Us</h3>
              <div className="mt-2 rounded-lg overflow-hidden w-full shadow-md">
                <iframe
                  title="Company Location"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1663.833750860656!2d79.9761102090686!3d7.321751794275841!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2slk!4v1763375186963!5m2!1sen!2slk"
                  width="100%"
                  height="220"
                  className="border-0"
                  allowFullScreen
                  loading="lazy"></iframe>
              </div>
            </div>
          </div>
        </div>

        {/* Quote Form Section */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Request a Quote</h2>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <GetHireForm />
          </div>
        </div>
      </div>
      <InfiniteScrollAnimationPage />
    </div>
  );
};

export default GetHired;
