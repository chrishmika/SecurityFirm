import React from "react";
import AboutUsCard from "../Components/HomeCards/AboutUsCard";
import OurVisionCard from "../Components/HomeCards/OurVisionCard";
import WhyChooseUsCard from "../Components/HomeCards/WhyChooseUsCard";
import OurTeamCard from "../Components/HomeCards/OurTeamCard";

const AboutUs = () => {
  return (
    <div className="container mx-auto p-4 lg:p-8">
      {/* Page Header */}
      <div className="text-center mb-8 bg-blue-600 text-white p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl md:text-5xl font-bold">About Us</h1>
        <p className="text-lg md:text-xl mt-2">
          Your Trusted Partner in Professional Security Solutions
        </p>
      </div>

      {/* Intro Paragraphs */}
      <div className="max-w-4xl mx-auto text-center mb-12 space-y-4">
        <p className="text-gray-700 leading-relaxed text-xl">
          We are a leading security service provider dedicated to ensuring the safety and security
          of our clients. With years of experience in the industry, we offer a wide range of
          security solutions tailored to meet the unique needs of each client.
        </p>
        <p className="text-gray-700 leading-relaxed text-xl">
          Founded with a vision to redefine security services,{" "}
          <span className="text-blue-600 font-semibold">D Vision</span> was established by industry
          veterans who recognized the need for a more customer-focused and responsive approach. From
          our humble beginnings, we've grown into a trusted security firm with a reputation for
          reliability, quick response, and attention to detail.
        </p>
      </div>

      {/* Section Cards */}
      <div className="space-y-12">
        <AboutUsCard />
        <OurVisionCard />
        <WhyChooseUsCard />
        <OurTeamCard />
      </div>
    </div>
  );
};

export default AboutUs;
