import React from 'react'
import ServicesCard from './ServiceCard'

import { services } from '../../AdditionalData.json'

const ServicesListCard = ({ isHome = false }) => {

  const servicesToShow = isHome ? services.slice(0, 4) : services;

  return (

    <div className='container mx-auto p-4'>
      <div>
        <h1 className="text-4xl font-semibold text-center mb-5">Services We Provide</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 ">
        {servicesToShow.map((service, index) =>
        (
          <ServicesCard service={service} key={index} />
        )
        )}
      </div>

    </div>

  )
}

export default ServicesListCard