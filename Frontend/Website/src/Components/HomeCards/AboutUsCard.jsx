import img from "../../assets/S5.png";
//import companyProfile from "../../assets/company-profile.pdf"; // <-- Add your PDF file here

const AboutUsCard = () => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "https://res.cloudinary.com/dgsdn5qex/image/upload/fl_attachment/v1761846937/DvisionProfile_zdtstb.pdf"
    link.download = "Company_Profile.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header Section */}
      <div className="text-center pt-16 pb-8">
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-800 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-4">
          Who are we?
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-16">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center">
            {/* Image Section */}
            <div className="lg:w-1/2 relative group">
              <div className="absolute inset-0 to-indigo-600/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <img
                src={img}
                alt="About Us"
                className="w-full h-80 lg:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 h-32 from-black/50 to-transparent z-20"></div>
            </div>

            {/* Content Section */}
            <div className="lg:w-1/2 p-8 lg:p-12">
              <div className="space-y-6">
                {/* Download Button */}
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold rounded-full shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-indigo-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 animate-bounce"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
                    />
                  </svg>
                  Download Company Profile
                </button>

                {/* Main Text */}
                <div className="prose prose-lg text-slate-700 leading-relaxed">
                  <p className="mb-6 text-lg">
                    We are a{" "}
                    <span className="font-semibold text-slate-900">
                      dedicated security manpower provider
                    </span>
                    , offering professional guarding and protective services to
                    businesses, residential communities, and events across Sri
                    Lanka, where traditional security solutions may fall short.
                  </p>

                  {/* <p className="mb-6">
                    Like major utilities, we operate under{" "}
                    <span className="font-semibold text-slate-900">
                      strict industry regulations
                    </span>{" "}
                    (e.g., [PSA/SIA/ACS] in the UK) and ensure all our personnel
                    are licensed, vetted, and trained to the highest standards.
                    We specialize in{" "}
                    <span className="font-medium text-indigo-700">
                      New Security Contracts (NSCs)
                    </span>
                    , stepping in where existing security providers cannot meet
                    demand or require reinforcement.
                  </p> */}

                  <p className="mb-0">
                    We partner with property developers, facility managers,
                    event organizers, and private clients to deliver{" "}
                    <span className="font-semibold text-slate-900">
                      tailored security solutions
                    </span>
                    —from static guards and mobile patrols to emergency response
                    teams. Our end-to-end service includes risk assessments,
                    manpower deployment, and ongoing quality audits to guarantee
                    compliance and performance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default AboutUsCard;
