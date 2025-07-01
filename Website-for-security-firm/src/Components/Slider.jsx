import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ColorSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000, // Changes slide every 2 seconds
  };

  const slides = [
    { id: 1, url: "https://th.bing.com/th/id/OIP.bnSZxVy-yW8jnTBbkKrOogHaEJ?w=313&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" },
    { id: 2, url: "https://th.bing.com/th/id/OIP._5NHUOZgbn8FwUPX0D00fQHaE8?w=271&h=182&c=7&r=0&o=5&dpr=1.3&pid=1.7" },
    { id: 3, url: "https://th.bing.com/th/id/OIP.x7bKF9JXV-dFNKmKGHDXegHaE8?w=263&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" },
    { id: 4, url: "https://th.bing.com/th/id/OIP.l-JKJlJMLX_IjhIYxMObGgHaD4?w=310&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" },
    { id: 5, url: "https://th.bing.com/th/id/OIP.l-JKJlJMLX_IjhIYxMObGgHaD4?w=310&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" },
  ];

  return (
    <div className="mx-auto mb-10">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} className={`h-auto flex items-center justify-center text-white text-2xl font-bold ${slide.color}`}>
            <img src={slide.url} alt={slide.id} className="w-full h-150" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ColorSlider;
