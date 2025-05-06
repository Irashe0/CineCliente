import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Clock } from "lucide-react";
import Boton from "../components/ComponentesExternos/Boton";

export default function Horarios() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("hoy");
  const [selectedHorario, setSelectedHorario] = useState(null);
  const [peliculas, setPeliculas] = useState([]);
  const [selectedPelicula, setSelectedPelicula] = useState(null);

  const fechas = [
    { id: "hoy", label: "Hoy", fecha: new Date() },
    { id: "manana", label: "Mañana", fecha: new Date(Date.now() + 86400000) },
    { id: "pasado", label: "Pasado", fecha: new Date(Date.now() + 2 * 86400000) },
  ];

  const fechaSeleccionada = fechas.find((f) => f.id === selectedDate)?.fecha
    .toISOString()
    .split("T")[0];

  useEffect(() => {
    const peliculaId = localStorage.getItem("peliculaSeleccionadaId");
    if (peliculaId) {
      setSelectedPelicula({ id_pelicula: peliculaId });
    }
  }, []);

  useEffect(() => {
    if (!selectedPelicula) return;

    const fetchHorarios = async () => {
      try {
        const API_BASE = "https://laravelcine-cine-zeocca.laravel.cloud/api";
        const resHorarios = await fetch(
          `${API_BASE}/horarios/pelicula/${selectedPelicula.id_pelicula}`
        );
        const horariosData = await resHorarios.json();

        const horarios = horariosData
          .filter((h) => h.fecha_hora.startsWith(fechaSeleccionada)) 
          .map((h) => h.fecha_hora.split("T")[1].slice(0, 5)); 

        setPeliculas([{
          ...selectedPelicula,
          horarios,  
        }]);
      } catch (err) {
        console.error("Error al cargar los horarios:", err);
      }
    };

    fetchHorarios();
  }, [selectedPelicula, selectedDate]);  

  const handleContinuar = () => {
    if (selectedHorario && selectedPelicula) {
      const peliculaId = selectedPelicula.id_pelicula;
      localStorage.setItem("fechaSeleccionada", selectedDate);
      localStorage.setItem("horarioSeleccionado", selectedHorario);
      localStorage.setItem("peliculaSeleccionada", JSON.stringify(selectedPelicula));

      navigate("/reserva/butacas");
    }
  };

  const handleVolver = () => {
    navigate("/reserva/cine");
  };

  return (
    <div className="space-y-6 p-6">
      <div className="text-center">
        <h2>{selectedPelicula?.titulo}</h2> 
      </div>
      <div>
        <div className="grid grid-cols-3 gap-2 mb-6">
          {fechas.map((fecha) => (
            <button
              key={fecha.id}
              onClick={() => setSelectedDate(fecha.id)}
              className={`flex flex-col items-center border rounded-lg py-2 ${
                selectedDate === fecha.id
                  ? "bg-[var(--principal)] text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              <span className="font-medium">{fecha.label}</span>
              <span className="text-xs">
                {fecha.fecha.toLocaleDateString("es-ES")}
              </span>
            </button>
          ))}
        </div>

        <div className="space-y-6">
          {peliculas.map((pelicula) => (
            <div key={pelicula.id_pelicula} className="border rounded-lg overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/4 lg:w-1/5 p-4 flex justify-center md:justify-start">
                  <img
                    src={pelicula.imagen || "/placeholder.svg"}
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

                  <div>
                    <h4 className="text-sm font-medium mb-2">
                      Horarios disponibles:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {pelicula.horarios.length > 0 ? (
                        pelicula.horarios.map((horario) => {
                          const horarioKey = `${pelicula.id_pelicula}-${horario}`;
                          return (
                            <button
                              key={horarioKey}
                              onClick={() => {
                                setSelectedHorario(horarioKey);
                                setSelectedPelicula(pelicula);  
                              }}
                              className={`px-3 py-1 rounded text-sm border ${
                                selectedHorario === horarioKey
                                  ? "bg-blue-500 text-white"
                                  : "bg-white text-gray-700"
                              }`}
                            >
                              {horario}
                            </button>
                          );
                        })
                      ) : (
                        <span className="text-gray-400 text-sm">
                          No hay horarios disponibles para esta fecha
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

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
