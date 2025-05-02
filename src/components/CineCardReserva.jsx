import { useNavigate } from "react-router-dom";

export default function CinesCardReserva({ id, nombre, ubicacion, telefono }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    localStorage.setItem("cineSeleccionado", JSON.stringify({ id, nombre }));
    navigate(`/reserva/2/cine/${id}`);
  };

  return (
    <div
      className="relative overflow-hidden rounded-md shadow-[rgba(0,0,0,0.25)] border border-[#CDAA7D] border-opacity-50 w-full max-w-[300px] aspect-[3/4] group transition-transform duration-300 ease-in-out hover:scale-105"
      onClick={handleCardClick}
    >
      <img
        className="w-full h-full object-cover"
        src="https://apeadero.es/wp-content/uploads/cinema-500x375.jpg"
        alt={`Imagen de ${nombre}`}
      />
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black to-transparent z-0 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 p-4 text-[#E0E0E0] text-center">
        <h1 className="text-2xl font-bold truncate drop-shadow-[2px_2px_4px_rgba(0,0,0,0.8)]">{nombre}</h1>
        <p className="text-sm text-gray-300">{ubicacion}</p>
        <p className="text-sm text-gray-300">Tel: {telefono}</p>
      </div>
    </div>
  );
}
