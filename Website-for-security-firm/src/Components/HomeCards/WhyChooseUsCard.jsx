import React from 'react'

const WhyChooseUsCard = () => {
  const reasons = [
    {
      icon: "🛡️",
      title: "Over 10 years of experience in the security industry",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: "📋",
      title: "Fully licensed and insured security personnel",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      icon: "🕒",
      title: "24/7 customer support and rapid response",
      gradient: "from-purple-500 to-indigo-500"
    },
    {
      icon: "📊",
      title: "Customized security plans for each client",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: "🤝",
      title: "Trusted by local businesses, property managers, and event organizers",
      gradient: "from-pink-500 to-rose-500"
    },
    {
      icon: "💰",
      title: "Competitive pricing without compromising quality",
      gradient: "from-violet-500 to-purple-500"
    }
  ]

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 py-16'>
      <div className='container mx-auto px-4'>
        {/* Header Section */}
        <div className='text-center mb-16'>
          <h1 className='text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-800 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6'>
            Why Choose Us?
          </h1>
          <div className='w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full mb-4'></div>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
            Discover what sets us apart in the security industry and why businesses trust us with their most important assets.
          </p>
        </div>

        {/* Main Card Container */}
        <div className='max-w-6xl mx-auto'>
          <div className='bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden'>
            {/* Decorative Header */}
            <div className='h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500'></div>
            
            <div className='p-8 lg:p-12'>
              {/* Reasons Grid */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                {reasons.map((reason, index) => (
                  <div 
                    key={index}
                    className='group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-white hover:-translate-y-1'
                  >
                    {/* Gradient Border Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${reason.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`}></div>
                    <div className='absolute inset-0.5 bg-gradient-to-br from-white to-gray-50 rounded-2xl group-hover:from-white group-hover:to-white transition-all duration-300'></div>
                    
                    {/* Content */}
                    <div className='relative z-10'>
                      {/* Icon */}
                      <div className='flex items-center mb-4'>
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${reason.gradient} flex items-center justify-center text-white text-xl font-bold mr-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          {reason.icon}
                        </div>
                        <div className={`w-8 h-1 bg-gradient-to-r ${reason.gradient} rounded-full`}></div>
                      </div>
                      
                      {/* Text */}
                      <p className='text-gray-700 text-lg leading-relaxed group-hover:text-gray-800 transition-colors duration-300'>
                        {reason.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom CTA Section */}
              <div className='mt-16 text-center'>
                <div className='bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-8 text-white'>
                  <h3 className='text-2xl font-bold mb-4'>Ready to Secure Your Business?</h3>
                  <p className='text-blue-100 mb-6 max-w-2xl mx-auto'>
                    Join hundreds of satisfied clients who trust us with their security needs. Get a customized quote today.
                  </p>
                  <div className='flex justify-center space-x-4'>
                    <div className='bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-sm font-semibold'>
                      ⭐ 4.9/5 Client Rating
                    </div>
                    <div className='bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-sm font-semibold'>
                      🏆 Industry Leaders
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        {/* <div className='flex justify-center mt-12'>
          <div className='flex space-x-3'>
            <div className='w-4 h-4 bg-blue-500 rounded-full animate-pulse'></div>
            <div className='w-4 h-4 bg-indigo-500 rounded-full animate-pulse' style={{animationDelay: '0.2s'}}></div>
            <div className='w-4 h-4 bg-purple-500 rounded-full animate-pulse' style={{animationDelay: '0.4s'}}></div>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default WhyChooseUsCard