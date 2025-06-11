// import Slider from '../Components/Slider'

import MainHomeCard from "../Components/HomeCards/MainHomeCard"
import AboutUsCard from "../Components/HomeCards/AboutUsCard"
import WhyChooseUsCard from "../Components/HomeCards/WhyChooseUsCard"
import ServicesListCard from "../Components/HomeCards/ServicesListCard"
import AllServises from "../Components/HomeCards/AllServises"
import InfiniteScrollAnimationPage from "../Components/HomeCards/InfiniteScrollLogo"

const Home = () => {
  return (
    <div>
      {/* <Slider/> */}
      <MainHomeCard />
      <AboutUsCard />
      <WhyChooseUsCard />
      <ServicesListCard isHome={true} />
      <AllServises />
      <InfiniteScrollAnimationPage />
    </div>
  )
}

export default Home