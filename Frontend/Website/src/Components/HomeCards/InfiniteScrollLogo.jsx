import { clients } from '../../AdditionalData.json'

const InfiniteLogoScrall = () => {
    return (
        <div>
            <div>companies</div>

            <div className=" flex w-full overflow-hidden bg-white py-8">
            <div className="relative">
                <div className="flex animate-scroll-left">
                    {/* first */}
                    {clients.map((client, index) => (
                        <div key={`first-${index}`} className="flex-shrink-0 mx-4 md:mx-8" area-hidden="true">

                            <img className='w-50 h-auto' src={client.logo} alt={client.alt} />
                        </div>
                    ))}
                    {/* second */}
                    {clients.map((client, index) => (
                        <div key={`second-${index}`} className="flex-shrink-0 mx-4 md:mx-8">

                            <img className='w-50 h-auto' src={client.logo} alt={client.alt} />
                        </div>
                    ))}
                </div>
            </div>

        </div>

        </div>
        
    )
}

export default InfiniteLogoScrall