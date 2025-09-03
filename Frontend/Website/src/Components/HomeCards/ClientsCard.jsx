import React from 'react'
import ClientCard from './clientCard'

import {clients} from '../../AdditionalData.json'

const ClientsCard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 mb-8">
        {clients.map((client,index) => 
            <ClientCard client={client} key={index}/>
        )}
      </div>
  )
}

export default ClientsCard