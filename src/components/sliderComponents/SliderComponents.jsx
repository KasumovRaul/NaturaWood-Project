import React from 'react';
import Slider from 'react-slick';
import './SliderComponents.css';

import Slider1 from '../../../public/images/banner-1.jpg';
import Slider2 from '../../../public/images/banner-2.jpeg';


const slides = [
  {
    image: Slider1,
    title: "Over a century of experience"
  },
  {
    image: Slider2,
    title: "BLOG AND TASTING NOTES"
  },
 
];

const SliderComponents = () => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: false,
    cssEase: 'ease-in-out'
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="slide-item">
             <div className="slide-img">
            <img 
              src={slide.image} 
              alt={slide.title} 
              className="slide-image"
            />
            </div>
            <div className="slide-content">
               <div className="slide-content-title">
              <h2>{slide.title}</h2>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderComponents;