import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ImageCarousel from "../components/Carrusel";
import MovieList from "../components/MovieList";

// Importar imágenes
import PlaceHolder1 from "../assets/Banner1.jpg";
import PlaceHolder2 from "../assets/Banner2.jpg";
import PlaceHolder3 from "../assets/Banner3.jpg";
import PlaceHolder4 from "../assets/Banner4.jpg";

// Lista de imágenes para el carrusel
const images = [PlaceHolder1, PlaceHolder2, PlaceHolder3, PlaceHolder4];

function App() {
  return (
    <div>
      <Header />
      <ImageCarousel images={images} interval={5000} /> {/* 5 segundos entre cambios */}
      <MovieList/>
      <Footer />
    </div>
  );
}

export default App;
