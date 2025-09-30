import img from "../../assets/S4.png";

const AboutUsCard = () => {
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
              <div className="absolute inset-0   to-indigo-600/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <img
                src={img}
                alt="About Us"
                className="w-full h-80 lg:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 h-32  from-black/50 to-transparent z-20"></div>
            </div>

            {/* Content Section */}
            <div className="lg:w-1/2 p-8 lg:p-12">
              <div className="space-y-6">
                {/* Professional Badge */}
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full text-sm font-semibold shadow-lg">
                  <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                  download company profile
                </div>

                {/* Main Text */}
                <div className="prose prose-lg text-slate-700 leading-relaxed">
                  <p className="mb-6 text-lg">
                    We are a{" "}
                    <span className="font-semibold text-slate-900">
                      dedicated security manpower provider
                    </span>
                    , offering professional guarding and protective services to businesses,
                    residential communities, and events across Sri Lanka
                    , where traditional security solutions may fall short.
                  </p>

                  <p className="mb-6">
                    Like major utilities, we operate under{" "}
                    <span className="font-semibold text-slate-900">
                      strict industry regulations
                    </span>{" "}
                    (e.g., [PSA/SIA/ACS] in the UK) and ensure all our personnel are licensed,
                    vetted, and trained to the highest standards. We specialize in{" "}
                    <span className="font-medium text-indigo-700">
                      New Security Contracts (NSCs)
                    </span>
                    , stepping in where existing security providers cannot meet demand or require
                    reinforcement.
                  </p>

                  <p className="mb-0">
                    We partner with property developers, facility managers, event organizers, and
                    private clients to deliver{" "}
                    <span className="font-semibold text-slate-900">
                      tailored security solutions
                    </span>
                    —from static guards and mobile patrols to emergency response teams. Our
                    end-to-end service includes risk assessments, manpower deployment, and ongoing
                    quality audits to guarantee compliance and performance.
                  </p>
                </div>

                {/* Features Grid */}
                {/* <div className="grid grid-cols-2 gap-4 mt-8">
                                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
                                        <div className="text-blue-600 font-semibold text-sm">Licensed & Vetted</div>
                                        <div className="text-slate-600 text-xs mt-1">All personnel certified</div>
                                    </div>
                                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-xl border border-indigo-100">
                                        <div className="text-indigo-600 font-semibold text-sm">24/7 Response</div>
                                        <div className="text-slate-600 text-xs mt-1">Emergency deployment</div>
                                    </div>
                                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100">
                                        <div className="text-purple-600 font-semibold text-sm">Quality Audits</div>
                                        <div className="text-slate-600 text-xs mt-1">Ongoing compliance</div>
                                    </div>
                                    <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-4 rounded-xl border border-pink-100">
                                        <div className="text-pink-600 font-semibold text-sm">Tailored Solutions</div>
                                        <div className="text-slate-600 text-xs mt-1">Custom security plans</div>
                                    </div>
                                </div> */}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Accent */}
        {/* <div className="flex justify-center mt-8">
                    <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                        <div className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                    </div>
                </div> */}
      </div>
    </div>
  );
};

export default AboutUsCard;
