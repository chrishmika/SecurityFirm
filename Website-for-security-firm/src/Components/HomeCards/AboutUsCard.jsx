import img from '../../assets/aboutus.jpeg'

const AboutUsCard = () => {
    return (
        <div>

            <div className='text-center text-4xl font-semibold mt-10'>
                <h1>Who are we ? </h1>
            </div>

            <div className='flex flex-row justify-center items-center gap-10 p-10 bg-gray-100'>
            <div className='w-800'>
                <img src={img} alt="About Us" className='w-full h-64 object-cover' />
            </div>

            <div>

                

                <p>
            
                    We are a dedicated security manpower provider, offering professional guarding and protective services to businesses, residential communities, and events across [your coverage area, e.g., the UK], where traditional security solutions may fall short.

                    Like major utilities, we operate under strict industry regulations (e.g., [PSA/SIA/ACS] in the UK) and ensure all our personnel are licensed, vetted, and trained to the highest standards. We specialize in New Security Contracts (NSCs), stepping in where existing security providers cannot meet demand or require reinforcement.

                    We partner with property developers, facility managers, event organizers, and private clients to deliver tailored security solutions—from static guards and mobile patrols to emergency response teams. Our end-to-end service includes risk assessments, manpower deployment, and ongoing quality audits to guarantee compliance and performance.
                </p>

            </div>
        </div>

        </div>
        
    )
}

export default AboutUsCard