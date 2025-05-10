import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
    const peliculaGuardada = JSON.parse(localStorage.getItem("peliculaSeleccionada"));

    if (peliculaGuardada) {
      setSelectedPelicula({
        id_pelicula: peliculaGuardada?.id_pelicula,
        titulo: peliculaGuardada?.titulo ?? "Nombre desconocido",
      });
    }
  }, []);

  useEffect(() => {
    if (!selectedPelicula || !selectedPelicula.id_pelicula) return;

    const fetchHorarios = async () => {
      try {
        const API_BASE = "https://laravelcine-cine-zeocca.laravel.cloud/api";
        const resHorarios = await fetch(`${API_BASE}/horarios/pelicula/${selectedPelicula.id_pelicula}`);
        const horariosData = await resHorarios.json();

        const ahora = new Date();
        const fechaSeleccionada = new Date(fechaSeleccionadaDate);
        fechaSeleccionada.setHours(0, 0, 0, 0);
        const horariosFiltrados = horariosData?.filter((h) => {
          const horarioDate = new Date(h.fecha_hora);
          const esElDiaSeleccionado = horarioDate >= fechaSeleccionada && horarioDate.toDateString() === fechaSeleccionada.toDateString();
          const esPosteriorALaHoraActual = horarioDate > ahora;

          return esElDiaSeleccionado && esPosteriorALaHoraActual;
        }).map((h) => ({
          hora: h.fecha_hora.split("T")[1].slice(0, 5),
          sala: `Sala ${h.id_sala}`,
          id_horario: h.id_horario, // Aseguramos de incluir el id_horario desde la API
        })) || [];

        if (horariosFiltrados.length === 0) {
          setPeliculas([{ ...selectedPelicula, horarios: [] }]);
        } else {
          setPeliculas([{ ...selectedPelicula, horarios: horariosFiltrados }]);
        }
      } catch (err) {
        console.error("Error al cargar los horarios:", err);
      }
    };

    fetchHorarios();
  }, [selectedPelicula, selectedDate]);

  const handleContinuar = () => {
    if (!selectedHorario || !selectedPelicula) {
      console.error("Error: No hay horario o película seleccionada.");
      return;
    }

    // 🔹 Accede a los horarios dentro de `peliculas[0]`
    const horarioSeleccionadoObj = peliculas[0].horarios.find((h) => h.hora === selectedHorario.hora);

    if (!horarioSeleccionadoObj) {
      console.error("Error: No se encontró el horario seleccionado.");
      return;
    }

    const reserva = {
      fecha: selectedDate,
      horario: selectedHorario.hora,
      id_horario: horarioSeleccionadoObj.id_horario, // Guardamos el id_horario
      sala: horarioSeleccionadoObj.sala.replace("Sala ", ""),
      pelicula: {
        id_pelicula: selectedPelicula.id_pelicula, 
        titulo: selectedPelicula.titulo, 
      },
    };

    console.log("Reserva guardada en localStorage:", reserva);
    localStorage.setItem("reserva", JSON.stringify(reserva));
    navigate(`/reserva/${selectedPelicula.id_pelicula}/butacas`);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="grid grid-cols-3 gap-2 mb-6">
        {fechas.map((fecha) => (
          <button
            key={fecha.id}
            onClick={() => setSelectedDate(fecha.id)}
            className={`flex flex-col items-center border rounded-lg py-2 ${selectedDate === fecha.id ? "bg-[var(--principal)] text-white" : "bg-white text-gray-700"}`}
          >
            <span className="font-medium">{fecha.label}</span>
            <span className="text-xs">{fecha.fecha.toLocaleDateString("es-ES")}</span>
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {/* Solo mostrar los horarios si existen disponibles */}
        {selectedPelicula && peliculas.length > 0 && peliculas[0].horarios.length > 0 ? (
          <div key={peliculas[0].id_pelicula} className="border rounded-lg overflow-hidden p-4">
            <h3 className="text-xl font-bold mb-4 text-center">{peliculas[0].titulo}</h3>

            <div className="grid grid-cols-2 gap-4">
              {peliculas[0].horarios.map((horarioObj) => {
                const horarioKey = `${peliculas[0].id_pelicula}-${horarioObj.sala}-${horarioObj.hora}`;
                return (
                  <button
                    key={horarioKey}
                    onClick={() => {
                      setSelectedHorario(horarioObj); // Guardamos el objeto completo del horario
                    }}
                    className={`px-4 py-2 rounded border text-lg font-medium flex justify-between items-center ${selectedHorario?.hora === horarioObj.hora ? "bg-[var(--principal)] text-white" : "bg-white text-gray-700"}`}
                  >
                    <span>{horarioObj.hora}</span>
                    <span className="text-gray-500">{horarioObj.sala}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <span className="text-gray-400 text-lg">No hay horarios disponibles</span>
        )}
      </div>

      {/* Botones de acción */}
      <div className="flex justify-between mt-8">
        <Boton onClick={() => navigate("/reserva/cine")} variante="outline">Volver</Boton>
        <Boton onClick={handleContinuar} disabled={!selectedHorario}>Continuar</Boton>
      </div>
    </div>
  );
}
