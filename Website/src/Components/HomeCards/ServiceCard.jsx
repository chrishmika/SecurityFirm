import React from 'react'

const ServicesCard = ({ service, index }) => {
  return (
    <div className="bg-blue-100 shadow-lg rounded-lg p-2 text-center flex flex-col transition-transform duration-300 hover:scale-108" key={index}>
      <div className='bg-white rounded-xl shadow-md flex flex-col flex-1 '>
        <div className='p-4 flex flex-col flex-1'>
          <div className='mb-6'>
            <h3 className='text-xl font-bold'>{service.title}</h3>
          </div>
          <div className='mb-5 flex-1'>{service.description}</div>
        </div>
      </div>
    </div>
  )
}

export default ServicesCard