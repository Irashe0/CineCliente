import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Boton from "./ComponentesExternos/Boton";

const MovieCard = ({ id, title, posterUrl, rating, trailerUrl }) => {
  const navigate = useNavigate();
  const [showTrailer, setShowTrailer] = useState(false);

  const getYoutubeEmbedUrl = (url) => {
    const videoId = url?.split("v=")[1]?.split("&")[0]; // para links como https://www.youtube.com/watch?v=xxxxx
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  };

  return (
    <>
      <div className="relative overflow-hidden rounded-md shadow-[rgba(0,0,0,0.25)] border-2 border-[#CDAA7D] border-opacity-50 w-full max-w-[300px] h-auto aspect-[3/4] group transition-transform duration-300 ease-in-out hover:scale-105">

        <img
          className="w-full h-full object-cover"
          src={posterUrl || "./assets/placeholder.jpg"}
          alt={`${title} poster`}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="bottom-0 left-0 right-0 p-4 text-[#E0E0E0] text-center transition-transform duration-1000 group-hover:-translate-y-[250px]">
          <h1 className="text-3xl font-bold drop-shadow-[2px_2px_4px_rgba(0,0,0,0.8)] group-hover:text-[#CDAA7D]">
            {title.length > 20 ? `${title.slice(0, 25)}...` : title}
          </h1>
        </div>

        <div className="absolute inset-0 flex flex-col justify-end items-center p-4 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex flex-col space-y-2 w-full">
            <Boton
              className="bg-[#0077B6] hover:bg-[#005F8B] text-white font-medium py-3 px-6 rounded-md shadow-md"
              onClick={() => {
                localStorage.setItem("peliculaSeleccionada", JSON.stringify({
                  id_pelicula: id,
                  titulo: title,
                }));
                navigate(`/Reserva/${id}`);
              }}
            >
              Tickets
            </Boton>

            <Boton
              className="bg-[#0077B6] hover:bg-[#005F8B] text-white font-medium py-3 px-6 rounded-md shadow-md"
              onClick={() => setShowTrailer(true)}
              disabled={!trailerUrl}
            >
              {trailerUrl ? "Tráiler" : "No Tráiler"}
            </Boton>

            <Boton
              className="bg-[#0077B6] hover:bg-[#005F8B] text-white font-medium py-3 px-6 rounded-md shadow-md"
              onClick={() => navigate(`/peliculas/${id}`)}
            >
              Detalles
            </Boton>
          </div>
        </div>
      </div>

      {/* Modal de Tráiler */}
      {showTrailer && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4">
          <div className="bg-black rounded-lg overflow-hidden max-w-3xl w-full relative">
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute top-3 right-3 text-white text-3xl bg-[var(--principal)] bg-opacity-90 rounded-full shadow-lg hover:scale-110 hover: transition-all duration-300"
            >
              &times;
            </button>

            <div className="w-full aspect-video">
              <iframe
                src={getYoutubeEmbedUrl(trailerUrl)}
                title="Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

MovieCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  posterUrl: PropTypes.string,
  rating: PropTypes.string.isRequired,
  trailerUrl: PropTypes.string,
};

export default MovieCard;
