import React from 'react'
import GetHireForm from '../Components/Application Forms/GetHireForm'

const GetHired = () => {
  return (
    <div className='flex flex-col items-center p-4'>
      <div className='mb-4 p-4'>
      <h1 className='text-blue-900 text-4xl font-medium mb-4'>Security Guard Services Quote</h1>
      <p className="text-gray-600 mb-5">Fill out our Security Services Quote Form below and we will get back to you immediately with a thorough proposal for your security contract. Whether you need a one-time security guard for an event or a lengthy contract for on-going security services, we've got you covered.</p>
      </div>
        
        <GetHireForm/>
        
    </div>
  )
}

export default GetHired