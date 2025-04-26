import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Star } from "lucide-react";
import Boton from "../ComponentesExternos/Boton";

export default function CinePage() {
  const navigate = useNavigate();
  const [selectedCine, setSelectedCine] = useState(null);

  const cines = [
    {
      id: "cine1",
      nombre: "Cinépolis Plaza Mayor",
      direccion: "Av. Principal 123, Centro",
      rating: 4.5,
      imagen: "/placeholder.svg",
    },
    {
      id: "cine2",
      nombre: "Cinemex Premium",
      direccion: "Blvd. Las Torres 456, Zona Norte",
      rating: 4.2,
      imagen: "/placeholder.svg",
    },
    {
      id: "cine3",
      nombre: "Cinemark Luxury",
      direccion: "Paseo de la Reforma 789, Zona Sur",
      rating: 4.7,
      imagen: "/placeholder.svg",
    },
  ];

  const handleContinuar = () => {
    if (selectedCine) {
      localStorage.setItem("cineSeleccionado", selectedCine);
      navigate("/reserva/horario");
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Título */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">Selecciona un Cine</h2>
        <p className="text-gray-400">Paso 1 de 4: Elige el cine donde quieres ver la película</p>
      </div>

      {/* Tarjetas de cines */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cines.map((cine) => (
          <div
            key={cine.id}
            onClick={() => setSelectedCine(cine.id)}
            className={`border rounded-lg cursor-pointer overflow-hidden transition-all ${
              selectedCine === cine.id
                ? "ring-2 ring-blue-500"
                : "hover:shadow-md"
            }`}
          >
            <div className="w-full h-32 bg-gray-200">
              <img
                src={cine.imagen}
                alt={cine.nombre}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{cine.nombre}</h3>
              <div className="flex items-start gap-2 text-sm text-gray-500 mb-2">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span>{cine.direccion}</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>{cine.rating}/5</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Botón continuar */}
      <div className="flex justify-end mt-8">
        <Boton
          onClick={handleContinuar}
          disabled={!selectedCine}
          tamaño="lg"
        >
          Continuar
        </Boton>
      </div>
    </div>
  );
}
