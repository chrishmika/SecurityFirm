import AboutUsCard from "../Components/HomeCards/AboutUsCard"
import OurVisionCard from "../Components/HomeCards/OurVisionCard"
import WhyChooseUsCard from "../Components/HomeCards/WhyChooseUsCard"
import React from 'react'
import OurTeamCard from "../Components/HomeCards/OurTeamCard"

const AboutUs = () => {
  return (

    <div>

      <div>
        <h1 className='text-3xl text-gray-700 mb-5'>About Us</h1>
        <p>
          We are a leading security service provider dedicated to ensuring the safety and security of our clients. With years of experience in the industry, we offer a wide range of security solutions tailored to meet the unique needs of each client.
        </p>
        <p className='mt-3'>
          Founded with a vision to redefine security services, D Vision was
established by industry veterans who recognized the need for a more
customer-focused and responsive approach. From our humble
beginnings, we've grown into a trusted security firm with a reputation for
reliability, quick response, and attention to detail.
        </p>
      </div>

      <div>
        < AboutUsCard />
    <OurVisionCard />
    <WhyChooseUsCard />
    <OurTeamCard />
      </div>

    </div>
    
    
  )
}

export default AboutUs