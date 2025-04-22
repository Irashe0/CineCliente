import React, { useState, useEffect } from 'react';
import ImageCarousel from './ImagenesCarrusel'; 

const BannerCarousel = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    fetch('https://laravelcine-cine-zeocca.laravel.cloud/api/multimedia')
      .then((res) => res.json())
      .then((data) => {
        const bannerImages = data.filter(item => item.banner).slice(5, 10).map(item => item.banner);
        setBanners(bannerImages);
      })
      .catch((err) => {
        console.error("Error al obtener los banners:", err);
      });
  }, []);

  if (banners.length === 0) {
    return <div className="text-white text-center py-10">Cargando banners...</div>;
  }

  return <ImageCarousel images={banners} interval={5000} />;
};

export default BannerCarousel;
