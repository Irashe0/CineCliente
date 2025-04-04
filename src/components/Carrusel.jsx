import React, { useState, useEffect } from 'react';


const ImageCarousel = ({ images, interval = 200000000000 }) => { // Cambié el valor del intervalo a 20000ms (20 segundos)
  const [currentIndex, setCurrentIndex] = useState(0);

  // Para habilitar el deslizamiento táctil
  const handleSwipe = (direction) => {
    if (direction === 'left') {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    } else if (direction === 'right') {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div
      className="relative w-full h-[300px] sm:h-[200px] md:h-[300px] lg:h-[400px] xl:h-[500px] overflow-hidden"
      onTouchStart={(e) => (this.touchStart = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (this.touchStart - e.changedTouches[0].clientX > 50) handleSwipe('left'); 
        if (this.touchStart - e.changedTouches[0].clientX < -50) handleSwipe('right'); 
      }}
    >
      <div
        className="flex transition-all ease-in-out duration-1000"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="w-full flex-shrink-0">
            <img
              src={image}
              alt={`slide-${index}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Puntos de paginación, solo en pantallas grandes */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10 hidden sm:flex">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full cursor-pointer ${currentIndex === index ? 'bg-white' : 'bg-gray-500'}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
