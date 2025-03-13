let clients = [
  {
    name: 'Client 1',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Client 1'
  },
  {
    name: 'Client 2',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.Client 2'
  },
  {
    name: 'Client 3',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.Client 3'
  },{
    name: 'Client 3',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.Client 3'
  },{
    name: 'Client 3',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.'
  },{
    name: 'Client 3',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.'
  },{
    name: 'Client 3',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.'
  },{
    name: 'Client 3',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.'
  },
]

const Clients = () => {
  return (
    <div className="container mx-auto p-4">
      <div>Clients</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {clients.map((clients,index) => {
          return(
            <div className='bg-indigo-100 shadow-lg rounded-lg text-center p-4' index={index}>
              <h3>{clients.name}</h3>
              <p>{clients.description}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Clients