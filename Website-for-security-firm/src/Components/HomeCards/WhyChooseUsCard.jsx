import React from 'react'

const WhyChooseUsCard = () => {
  return (
    <div className='container mx-auto p-4 bg-white shadow-lg rounded-lg my-10'>
      <h1 className='text-3xl text-center text-gray-700 mb-5'>Why Choose Us?</h1>

      <ul className='list-disc list-inside text-gray-600 text-lg mx-auto max-w-2xl'>
        <li className='mt-2'>Over 10 years of experience in the security industry</li>
        <li className='mt-2'>Fully licensed and insured security personnel</li>
        <li className='mt-2'>24/7 customer support and rapid response</li>
        <li className='mt-2'>Customized security plans for each client</li>
        <li className='mt-2'>Trusted by local businesses, property managers, and event organizers</li>
        <li className='mt-2'>Competitive pricing without compromising quality</li>
      </ul>
    </div>
  )
}

export default WhyChooseUsCard