import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { fetchDrawings } from './fetchDrawings';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const DrawingSlideshow = () => {
  const [drawings, setDrawings] = useState([]);

  useEffect(() => {
    const getDrawings = async () => {
      const fetchedDrawings = await fetchDrawings();
      setDrawings(fetchedDrawings);
    };
    getDrawings();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="max-w-lg mx-auto">
      <Slider {...settings}>
        {drawings.map((drawing, index) => (
          <div key={index} className="p-4">
            <img
              src={drawing.imageUrl}
              alt={drawing.title}
              className="w-full  object-cover rounded-lg shadow-md"
            />
            <h3 className="mt-2 text-center text-lg font-semibold">{drawing.title}</h3>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default DrawingSlideshow;