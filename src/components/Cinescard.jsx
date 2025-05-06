"use client"

import PropTypes from "prop-types"
import { useNavigate } from "react-router-dom"
import Boton from "./ComponentesExternos/Boton"

const CinesCard = ({ id, nombre, ubicacion, telefono }) => {
  const navigate = useNavigate()

  const imagenPorDefecto = "https://apeadero.es/wp-content/uploads/cinema-500x375.jpg"

  return (
    <div className="relative overflow-hidden rounded-md shadow-[rgba(0,0,0,0.25)] border border-[#CDAA7D] border-opacity-50 w-full max-w-[300px] aspect-[3/4] group transition-transform duration-300 ease-in-out hover:scale-105">

      <img
        className="w-full h-full object-cover"
        src={imagenPorDefecto}
        alt={`Imagen de ${nombre}`}
      />

      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black to-transparent z-0 pointer-events-none" />

      <div className="absolute bottom-0 left-0 right-0 p-4 text-[#E0E0E0] text-center transition-transform duration-700 group-hover:-translate-y-56 z-10">
        <h1 className="text-2xl font-bold truncate drop-shadow-[2px_2px_4px_rgba(0,0,0,0.8)] group-hover:text-[#CDAA7D]">
          {nombre}
        </h1>
        <p className="text-sm text-gray-300">{ubicacion}</p>
        <p className="text-sm text-gray-300">Tel: {telefono}</p>
      </div>

      <div className="absolute inset-0 flex flex-col justify-end items-center p-4 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
        <div className="flex flex-col space-y-2 w-full">
          <Boton
            className="bg-[#0077B6] hover:bg-[#005F8B] text-white font-medium py-3 px-6 rounded-md shadow-md"
            onClick={() => navigate(`/`)}
          >
            Ver Cartelera
          </Boton>
        </div>
      </div>
    </div>
  )
}

CinesCard.propTypes = {
  id: PropTypes.number.isRequired,
  nombre: PropTypes.string.isRequired,
  ubicacion: PropTypes.string.isRequired,
  telefono: PropTypes.string,
}

export default CinesCard
