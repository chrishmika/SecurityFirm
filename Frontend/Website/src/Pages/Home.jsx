// import Slider from '../Components/Slider'

import MainHomeCard from "../Components/HomeCards/MainHomeCard";
import AboutUsCard from "../Components/HomeCards/AboutUsCard";
import WhyChooseUsCard from "../Components/HomeCards/WhyChooseUsCard";
import ServicesListCard from "../Components/HomeCards/ServicesListCard";
import AllServises from "../Components/HomeCards/AllServises";
import InfiniteScrollAnimationPage from "../Components/HomeCards/InfiniteScrollLogo";
import JoinOurTeam from "../Components/HomeCards/JoinUsCard";

const Home = () => {
  return (
    <div>
      {/* <Slider/> */}
      <MainHomeCard />
      <WhyChooseUsCard />
      <AboutUsCard />
      <ServicesListCard isHome={true} />
      <AllServises />
      <InfiniteScrollAnimationPage />
      <JoinOurTeam />
    </div>
  );
};

export default Home;
