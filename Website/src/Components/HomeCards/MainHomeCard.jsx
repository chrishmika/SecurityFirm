import React from 'react'

import img from '../../assets/homeimage.jpeg'

const MainHomeCard = () => {
  return (
    <div className='flex flex-row justify-between items-center gap-10 p-10 bg-gray-100'>

      <div className='flex flex-col justify-center items-start gap-5'>

        <div>
          <h1 className='text-5xl font-bold'>Protecting Your Business Starts Here
            Elite Security Personnel for Offices, Warehouses & Corporate Facilities</h1>
        </div>

        <p className='text-lg text-gray-700'>
          At [Company Name], we provide highly trained security professionals to safeguard your business from threats—ensuring employee safety, asset protection, and 24/7 monitoring tailored to your industry.
        </p>
        <p>📍 Serving [City/Region] with Trusted Security Solutions</p>

        <div className='flex flex-row gap-5 mt-5'>
          <button className='bg-amber-200 '>Get a Free Quote</button>
          <button className='bg-indigo-400'>Contact Us</button>

        </div>


      </div>
      <div>

        <img src={img} alt="" />

      </div>
    </div>
  )
}

export default MainHomeCard