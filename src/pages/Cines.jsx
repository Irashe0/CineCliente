import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BannerCarousel from "../components/Carrusel";  
import CinesList from "../components/CinesList";

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
    <div className="relative bg-[var(--gris-oscuro)]">
      <Header />
      <BannerCarousel />
      <CinesList />
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

export default Home;
