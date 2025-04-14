import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Boton from "./ComponentesExternos/Boton";

const MovieCard = ({ id, title, posterUrl, rating, trailerUrl }) => {
  const navigate = useNavigate();

  return (
    <div className="relative inline-block overflow-hidden rounded-md shadow-md transition-transform duration-300 ease-in-out hover:scale-105 hover:border-2 border-[#FFD700] max-w-[600px] max-h-[500px]">
      <img
        className="w-full h-auto object-contain"
        src={posterUrl || "./assets/placeholder.jpg"}
        alt={`${title} poster`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ">
        <div className="absolute top-0 left-0 right-0 p-4 text-white text-sm text-center">
          <h1 className="text-lg font-bold">{title}</h1>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-sm">
          <div className="flex flex-col space-y-2 mt-16">
            <Boton onClick={() => navigate(`/horarios/${id}`)}>Horarios</Boton>
            <Boton onClick={() => window.open(trailerUrl, "_blank")} disabled={!trailerUrl}>
              {trailerUrl ? "Tráiler" : "No Tráiler"}
            </Boton>
            <Boton onClick={() => navigate(`/peliculas/${id}`)}>Detalles</Boton>
          </div>
        </div>
      </div>
    </div>


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
