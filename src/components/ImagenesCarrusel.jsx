import React, { useState, useEffect } from 'react';

const ImagenesCarousel = ({ images, interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

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
      className="relative w-full md:h-[500px] overflow-hidden"
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
          <div key={index} className="w-full flex-shrink-0 relative overflow-hidden">
            <div className="absolute inset-0 -z-80 blur-[40px]" style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }} />

            <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/50 -z-10" />

            <div className="relative w-full flex justify-center items-center z-10 ">
              <img
                src={image}
                alt="Banner"
                className="w-auto h-full md:h-[500px] object-cover"
              />
            </div>
          </div>
        ))}
      </div>

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

export default ImagenesCarousel;
