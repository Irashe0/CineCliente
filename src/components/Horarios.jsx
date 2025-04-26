// src/pages/HorarioPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Clock } from "lucide-react";
import Boton from "../ComponentesExternos/Boton";

export default function HorarioPage() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("hoy");
  const [selectedHorario, setSelectedHorario] = useState(null);
  const [cineSeleccionado, setCineSeleccionado] = useState(null);

  useEffect(() => {
    const cine = localStorage.getItem("cineSeleccionado");
    if (!cine) {
      navigate("/reserva/cine");
    } else {
      setCineSeleccionado(cine);
    }
  }, [navigate]);

  const fechas = [
    { id: "hoy", label: "Hoy", fecha: "26 Abr" },
    { id: "manana", label: "Mañana", fecha: "27 Abr" },
    { id: "pasado", label: "Pasado", fecha: "28 Abr" },
  ];

  const peliculas = [
    {
      id: "pelicula1",
      titulo: "Dune: Parte 2",
      duracion: "166 min",
      clasificacion: "B15",
      imagen: "/placeholder.svg",
      horarios: ["14:30", "17:45", "20:15", "22:30"],
    },
    {
      id: "pelicula2",
      titulo: "Deadpool & Wolverine",
      duracion: "120 min",
      clasificacion: "C",
      imagen: "/placeholder.svg",
      horarios: ["13:00", "15:30", "18:00", "20:30", "23:00"],
    },
    {
      id: "pelicula3",
      titulo: "Inside Out 2",
      duracion: "105 min",
      clasificacion: "A",
      imagen: "/placeholder.svg",
      horarios: ["12:15", "14:30", "16:45", "19:00"],
    },
  ];

  const handleContinuar = () => {
    if (selectedHorario) {
      localStorage.setItem("fechaSeleccionada", selectedDate);
      localStorage.setItem("horarioSeleccionado", selectedHorario);
      navigate("/reserva/butacas");
    }
  };

  const handleVolver = () => {
    navigate("/reserva/cine");
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">Selecciona Horario</h2>
        <p className="text-gray-400">Paso 2 de 4: Elige la fecha y horario de la función</p>
      </div>

      {/* Tabs de Fechas */}
      <div>
        <div className="grid grid-cols-3 gap-2 mb-6">
          {fechas.map((fecha) => (
            <button
              key={fecha.id}
              onClick={() => setSelectedDate(fecha.id)}
              className={`flex flex-col items-center border rounded-lg py-2 ${
                selectedDate === fecha.id ? "bg-blue-500 text-white" : "bg-white text-gray-700"
              }`}
            >
              <span className="font-medium">{fecha.label}</span>
              <span className="text-xs">{fecha.fecha}</span>
            </button>
          ))}
        </div>

        {/* Contenido de cada fecha */}
        <div className="space-y-6">
          {peliculas.map((pelicula) => (
            <div key={pelicula.id} className="border rounded-lg overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/4 lg:w-1/5 p-4 flex justify-center md:justify-start">
                  <img
                    src={pelicula.imagen}
                    alt={pelicula.titulo}
                    className="w-24 h-36 object-cover rounded"
                  />
                </div>
                <div className="flex-1 p-4">
                  <h3 className="text-xl font-bold mb-2">{pelicula.titulo}</h3>
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{pelicula.duracion}</span>
                    </div>
                    <div className="px-2 py-0.5 bg-gray-200 rounded text-xs font-medium">
                      {pelicula.clasificacion}
                    </div>
                  </div>

                  {/* Horarios */}
                  <div>
                    <h4 className="text-sm font-medium mb-2">Horarios disponibles:</h4>
                    <div className="flex flex-wrap gap-2">
                      {pelicula.horarios.map((horario) => {
                        const horarioKey = `${pelicula.id}-${horario}`;
                        return (
                          <button
                            key={horarioKey}
                            onClick={() => setSelectedHorario(horarioKey)}
                            className={`px-3 py-1 rounded text-sm border ${
                              selectedHorario === horarioKey
                                ? "bg-blue-500 text-white"
                                : "bg-white text-gray-700"
                            }`}
                          >
                            {horario}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Botones de navegación */}
      <div className="flex justify-between mt-8">
        <Boton onClick={handleVolver} variante="outline">
          Volver
        </Boton>
        <Boton onClick={handleContinuar} disabled={!selectedHorario}>
          Continuar
        </Boton>
      </div>
    </div>
  );
}
