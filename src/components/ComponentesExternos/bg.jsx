import PropTypes from "prop-types";
import { Clapperboard, Film, Popcorn, Tv, Video } from "lucide-react";

export default function CinemaLuxeBackground({ children, className = "" }) {
  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-center p-4 relative ${className}`}>
      <div className="absolute inset-0 overflow-hidden  pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(20)].map((_, i) => {
            const iconSize = 24;
            return (
              <div
                key={i}
                className="absolute pointer-events-none"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                  opacity: Math.random() * 0.5 + 0.25,
                }}
              >
                {i % 5 === 0 ? <Clapperboard size={iconSize} color="#D4AF37" /> :
                 i % 5 === 1 ? <Film size={iconSize} color="#D4AF37" /> :
                 i % 5 === 2 ? <Popcorn size={iconSize} color="#D4AF37" /> :
                 i % 5 === 3 ? <Tv size={iconSize} color="#D4AF37" /> :
                               <Video size={iconSize} color="#D4AF37" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* 🔆 Efecto de proyector de cine */}
      <div
        className="absolute top-0 w-full h-full opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 0%, rgba(212, 175, 55, 0.3) 0%, rgba(0, 0, 0, 0) 70%)",
        }}
      />

      {/* 📌 Contenido principal que no será afectado por el fondo */}
      <div className="relative z-10">{children}</div>

      {/* 🎭 Elementos decorativos de cortinas */}
      <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-amber-900/20 to-transparent pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-amber-900/20 to-transparent pointer-events-none"></div>
    </div>
  );
}

CinemaLuxeBackground.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
