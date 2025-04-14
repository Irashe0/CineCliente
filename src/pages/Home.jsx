import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ImageCarousel from "../components/Carrusel";
import MovieList from "../components/MovieList";
import Publi from "../components/Publi";

// Importar imágenes
import PlaceHolder1 from "../assets/Banner1.jpg";
import PlaceHolder2 from "../assets/Banner2.jpg";
import PlaceHolder3 from "../assets/Banner3.jpg";
import PlaceHolder4 from "../assets/Banner4.jpg";

// Lista de imágenes para el carrusel
const images = [PlaceHolder1, PlaceHolder2, PlaceHolder3, PlaceHolder4];

function App() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 200); // Mostrar el botón cuando bajes 200px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative">
      <Header />
      <ImageCarousel images={images} interval={5000} />
      <MovieList />
      <Footer />
      
      {showButton && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 w-12 h-12  rounded-full bg-[#CDAA7D] text-black shadow-lg hover:bg-[#E1B900] transition-all flex items-center justify-center"
        >
          <span className="text-3xl font-bold mb-2">↑</span>
        </button>
      )}

    </div>
  );
}

export default App;
