import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Boton from "./ComponentesExternos/Boton";
import Modal from "./Modal"; // Importamos el Modal

const MovieCard = ({ id, title, posterUrl, rating, trailerUrl }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal

  const checkLogin = () => {
    const userToken = localStorage.getItem("token"); // Comprobamos si hay un token en el localStorage
    if (!userToken) {
      setIsModalOpen(true); // Si no está logueado, mostramos el modal
    } else {
      localStorage.setItem("peliculaSeleccionada", JSON.stringify({
        id_pelicula: id,
        titulo: title,
      }));
      navigate(`/Reserva/${id}`);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false); // Cerramos el modal
  };

  const goToLogin = () => {
    navigate("/login"); // Redirigimos al usuario a la página de inicio de sesión
    closeModal(); // Cerramos el modal
  };

  return (
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
            onClick={checkLogin} // Cambiamos el comportamiento del botón
          >
            Tickets
          </Boton>
          <Boton className="bg-[#0077B6] hover:bg-[#005F8B] text-white font-medium py-3 px-6 rounded-md shadow-md" onClick={() => window.open(trailerUrl, "_blank")} disabled={!trailerUrl}>
            {trailerUrl ? "Tráiler" : "No Tráiler"}
          </Boton>
          <Boton className="bg-[#0077B6] hover:bg-[#005F8B] text-white font-medium py-3 px-6 rounded-md shadow-md" onClick={() => navigate(`/peliculas/${id}`)}>
            Detalles
          </Boton>
        </div>
      </div>

      {/* Mostrar el modal si isModalOpen es true */}
      {isModalOpen && (
        <Modal 
          message="Debes estar registrado para realizar una compra."
          onClose={closeModal}
          onLoginClick={goToLogin}
        />
      )}
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
