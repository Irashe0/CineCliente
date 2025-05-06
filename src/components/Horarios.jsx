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

  const fechaSeleccionadaDate = fechas.find((f) => f.id === selectedDate)?.fecha;

  useEffect(() => {
    const peliculaId = localStorage.getItem("peliculaSeleccionadaId");
    if (peliculaId) {
      setSelectedPelicula({ id_pelicula: peliculaId });
    }
  }, []);

  useEffect(() => {
    if (!selectedPelicula || !fechaSeleccionadaDate) return;

    const fetchHorarios = async () => {
      try {
        const API_BASE = "https://laravelcine-cine-zeocca.laravel.cloud/api";
        const resHorarios = await fetch(`${API_BASE}/horarios/pelicula/${selectedPelicula.id_pelicula}`);
        const horariosData = await resHorarios.json();

        console.log("Horarios obtenidos:", horariosData);

        const horarios = horariosData
          .filter((h) => {
            const horarioDate = new Date(h.fecha_hora);
            return (
              horarioDate.getUTCFullYear() === fechaSeleccionadaDate.getUTCFullYear() &&
              horarioDate.getUTCMonth() === fechaSeleccionadaDate.getUTCMonth() &&
              horarioDate.getUTCDate() === fechaSeleccionadaDate.getUTCDate()
            );
          })
          .map((h) => ({
            hora: h.fecha_hora.split("T")[1].slice(0, 5),
            sala: `Sala ${h.id_sala}`,
          }));

        console.log("Fecha seleccionada:", fechaSeleccionadaDate.toISOString().split("T")[0]);

        setPeliculas([{
          ...selectedPelicula,
          horarios: horarios.length > 0 ? horarios : ["No hay horarios disponibles"],
        }]);

      } catch (err) {
        console.error("Error al cargar los horarios:", err);
      }
    };

    fetchHorarios();
  }, [selectedPelicula, selectedDate]);

  const handleContinuar = () => {
    if (selectedHorario && selectedPelicula) {
      localStorage.setItem("fechaSeleccionada", selectedDate);
      localStorage.setItem("horarioSeleccionado", selectedHorario);
      localStorage.setItem("peliculaSeleccionada", JSON.stringify(selectedPelicula));

      navigate(`/reserva/${selectedPelicula.id_pelicula}/butacas`);
    }
  };

  const handleVolver = () => {
    navigate("/reserva/cine");
  };

  return (
    <div className="space-y-6 p-6">
      <div className="text-center">
        <h2>{selectedPelicula?.titulo}</h2>
        <p className="text-sm text-gray-500 mt-2">
          Fecha seleccionada: {fechaSeleccionadaDate?.toLocaleDateString("es-ES")}
        </p>
      </div>
      <div>
        <div className="grid grid-cols-3 gap-2 mb-6">
          {fechas.map((fecha) => (
            <button
              key={fecha.id}
              onClick={() => setSelectedDate(fecha.id)}
              className={`flex flex-col items-center border rounded-lg py-2 ${
                selectedDate === fecha.id ? "bg-[var(--principal)] text-white" : "bg-white text-gray-700"
              }`}
            >
              <span className="font-medium">{fecha.label}</span>
              <span className="text-xs">{fecha.fecha.toLocaleDateString("es-ES")}</span>
            </button>
          ))}
        </div>

        <div className="space-y-6">
          {peliculas.map((pelicula) => (
            <div key={pelicula.id_pelicula} className="border rounded-lg overflow-hidden p-4">
              <h3 className="text-xl font-bold mb-4 text-center">{pelicula.titulo}</h3>

              <div className="grid grid-cols-2 gap-4">
                {pelicula.horarios.length > 0 && pelicula.horarios[0] !== "No hay horarios disponibles" ? (
                  pelicula.horarios.map((horarioObj) => {
                    const horarioKey = `${pelicula.id_pelicula}-${horarioObj.hora}`;
                    return (
                      <button
                        key={horarioKey}
                        onClick={() => {
                          setSelectedHorario(horarioKey);
                          setSelectedPelicula(pelicula);
                        }}
                        className={`px-4 py-2 rounded border text-lg font-medium flex justify-between items-center ${
                          selectedHorario === horarioKey ? "bg-[var(--principal)] text-white" : "bg-white text-gray-700"
                        }`}
                      >
                        <span>{horarioObj.hora}</span>
                        <span className="text-gray-500">{horarioObj.sala}</span>
                      </button>
                    );
                  })
                ) : (
                  <span className="text-gray-400 text-lg">No hay horarios disponibles</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <Boton onClick={handleVolver} variante="outline">Volver</Boton>
        <Boton onClick={handleContinuar} disabled={!selectedHorario}>Continuar</Boton>
      </div>
    </div>
  );
}
