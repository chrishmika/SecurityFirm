import React from "react";

const JoinOurTeam = () => {
  return (
    <section className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 sm:text-4xl mb-4">
          Join Our Professional Security Team
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We’re looking for reliable and committed individuals to join our trusted team. Enjoy
          competitive pay, professional training, and opportunities to grow with a leading security
          company.
        </p>

        <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-10">
          <img
            src="/team.png"
            alt="Security Guard"
            className="w-1/4 md:w-1/3 rounded-xl shadow-lg"
          />

          <ul className="text-left space-y-4 text-gray-700">
            <li className="flex items-center gap-2">✅ Competitive Salary</li>
            <li className="flex items-center gap-2">✅ Flexible Shifts</li>
            <li className="flex items-center gap-2">✅ On-the-Job Training</li>
            <li className="flex items-center gap-2">✅ Career Advancement</li>
          </ul>
        </div>

        <div className="mt-10">
          <a
            href="gethired"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300">
            Apply Now
          </a>
          <a
            href="/about#careers"
            className="ml-4 inline-block text-blue-600 underline font-medium">
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
};

export default JoinOurTeam;
