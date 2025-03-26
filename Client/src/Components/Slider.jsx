import React from "react";
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
    { id: 1, url: "https://th.bing.com/th/id/OIP.U_VJuupQohwnzXcKMztqWgHaEo?w=274&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" },
    { id: 2, url: "https://th.bing.com/th/id/OIP.0iqvqUM-_MntTZp4CMBaigHaEK?w=304&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" },
    { id: 3, url: "https://th.bing.com/th/id/OIP.90sDWdblfZFiciIEpsGFwwHaEY?w=289&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" },
    { id: 4, url: "https://th.bing.com/th/id/OIP.B39-1EvwOFXOffOfIKZT0AHaEK?w=304&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" },
    { id: 5, url: "https://th.bing.com/th/id/OIP.KrFdlPaO_lPM3buEY80dDwHaEK?w=305&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" },
  ];

  return (
    <div className="mx-auto mb-10">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} className={`h-auto flex items-center justify-center text-white text-2xl font-bold ${slide.color}`}>
            <img src={slide.url} alt={slide.id} className="w-full h-100" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ColorSlider;
