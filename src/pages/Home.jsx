import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BannerCarousel from "../components/Carrusel";
import MovieList from "../components/MovieList";

function Home() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

return (
  <div className="relative ">
    <div className="absolute inset-0 bg-gradient-to-b from-black to-[#0F0F0F] opacity-90 pointer-events-none"></div>

    <div className="relative z-10">
      <Header />
      <BannerCarousel />
      <MovieList />
      <Footer />

      {showButton && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-[#CDAA7D] text-black shadow-lg hover:bg-[#E1B900] transition-all flex items-center justify-center"
        >
          <span className="text-3xl font-bold mb-2">↑</span>
        </button>
      )}
    </div>
  </div>
);

}

export default Home;
