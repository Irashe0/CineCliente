import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Boton from "../components/ComponentesExternos/Boton";

export default function Horarios() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("hoy");
  const [selectedHorario, setSelectedHorario] = useState(null);
  const [peliculas, setPeliculas] = useState([]);
  const [selectedPelicula, setSelectedPelicula] = useState(null);


  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  console.log(startOfToday)

  const fechas = [
    { id: "hoy", label: "Hoy", fecha: new Date(startOfToday) },
    { id: "manana", label: "Mañana", fecha: new Date(startOfToday.getTime() + 86400000) },
    { id: "pasado", label: "Pasado", fecha: new Date(startOfToday.getTime() + 2 * 86400000) },
  ];
  console.log(fechas)

  useEffect(() => {
    const progreso = JSON.parse(localStorage.getItem("reservaProgreso")) || {};
    localStorage.setItem(
      "reservaProgreso",
      JSON.stringify({
        ...progreso,
        horario: true,
        butacas: false,
        pago: false,
      })
    );
  }, []);

  useEffect(() => {
    const peliculaGuardada = JSON.parse(localStorage.getItem("peliculaSeleccionada"));
    if (peliculaGuardada) {
      setSelectedPelicula({
        id_pelicula: peliculaGuardada.id_pelicula,
        titulo: peliculaGuardada.titulo ?? "Nombre desconocido",
      });
    }
  }, []);

  const fetchHorarios = async () => {
    try {
      const API_BASE = "https://laravelcine-cine-zeocca.laravel.cloud/api";
      const resHorarios = await fetch(
        `${API_BASE}/horarios/pelicula/${selectedPelicula.id_pelicula}`
      );
      const horariosData = await resHorarios.json();

      if (!Array.isArray(horariosData) || horariosData.length === 0) {
        setPeliculas([{ ...selectedPelicula, horarios: [] }]);
        return;
      }

      const ahora = new Date();
      const fechaSeleccionadaObj = fechas.find((f) => f.id === selectedDate)?.fecha;
      if (!fechaSeleccionadaObj) return;

      const fechaInicio = new Date(fechaSeleccionadaObj);
      fechaInicio.setHours(0, 0, 0, 0);

      const fechaFin = new Date(fechaSeleccionadaObj);
      if (selectedDate === "hoy") {
        fechaFin.setDate(fechaFin.getDate() + 1); 
        fechaFin.setHours(1, 0, 0, 0);             
      } else {
        fechaFin.setHours(23, 59, 59, 999);
      }

      const horariosFiltrados = horariosData
        .filter((h) => {
          const fechaHora = new Date(h.fecha_hora);
          const dentroDelDia = fechaHora >= fechaInicio && fechaHora <= fechaFin;
          const esHoyYEnElFuturo = selectedDate === "hoy" ? fechaHora > ahora : true;
          return dentroDelDia && esHoyYEnElFuturo;
        })
        .map((h) => ({
          hora: h.fecha_hora.split("T")[1].slice(0, 5),
          sala: `Sala ${h.id_sala}`,
          id_horario: h.id_horario,
        }));

      setPeliculas([{ ...selectedPelicula, horarios: horariosFiltrados }]);
    } catch (error) {
      console.error("Error al obtener los horarios:", error);
      setPeliculas([{ ...selectedPelicula, horarios: [] }]);
    }
  };


  useEffect(() => {
    if (selectedPelicula?.id_pelicula) {
      fetchHorarios();
    }
  }, [selectedPelicula, selectedDate]);

  const handleContinuar = () => {
    if (!selectedHorario || !selectedPelicula) {
      console.error("Error: No hay horario o película seleccionada.");
      return;
    }

    const horarioSeleccionadoObj = peliculas[0]?.horarios.find(
      (h) => h.id_horario === selectedHorario.id_horario
    );

    if (!horarioSeleccionadoObj) {
      console.error("Error: No se encontró el horario seleccionado.");
      return;
    }

    const reserva = {
      fecha: selectedDate,
      horario: horarioSeleccionadoObj.hora,
      id_horario: horarioSeleccionadoObj.id_horario,
      sala: horarioSeleccionadoObj.sala.replace("Sala ", ""),
      pelicula: {
        id_pelicula: selectedPelicula.id_pelicula,
        titulo: selectedPelicula.titulo,
      },
    };

    localStorage.setItem("reserva", JSON.stringify(reserva));

    const progreso = JSON.parse(localStorage.getItem("reservaProgreso")) || {};
    localStorage.setItem(
      "reservaProgreso",
      JSON.stringify({
        ...progreso,
        butacas: false,
        pago: false,
      })
    );

    navigate(`/reserva/${selectedPelicula.id_pelicula}/butacas`);
  };

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-6">
        {fechas.map((fecha) => (
          <button
            key={fecha.id}
            onClick={() => setSelectedDate(fecha.id)}
            className={`flex flex-col items-center border rounded-lg py-2 ${selectedDate === fecha.id
              ? "bg-[var(--principal)] text-white"
              : "bg-white text-gray-700"
              }`}
          >
            <span className="font-medium">{fecha.label}</span>
            <span className="text-xs">{fecha.fecha.toLocaleDateString("es-ES")}</span>
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {selectedPelicula && peliculas.length > 0 && peliculas[0].horarios.length > 0 ? (
          <div key={peliculas[0].id_pelicula} className="border rounded-lg overflow-hidden p-4">
            <h3 className="text-lg sm:text-xl font-bold mb-4 text-center">{peliculas[0].titulo}</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {peliculas[0].horarios.map((horarioObj) => {
                const horarioKey = `${peliculas[0].id_pelicula}-${horarioObj.id_horario}`;
                return (
                  <button
                    key={horarioKey}
                    onClick={() => setSelectedHorario(horarioObj)}
                    className={`px-4 py-2 rounded border text-lg font-medium flex justify-between items-center ${selectedHorario?.id_horario === horarioObj.id_horario
                      ? "bg-[var(--principal)] text-white"
                      : "bg-white text-gray-700"
                      }`}
                  >
                    <span>{horarioObj.hora}</span>
                    <span className="text-gray-500">{horarioObj.sala}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <span className="text-gray-400 text-lg text-center block mt-4">No hay horarios disponibles</span>
        )}
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mt-8">
        <Boton onClick={() => navigate("/reserva/cine")} variante="outline">
          Volver
        </Boton>
        <Boton onClick={handleContinuar} disabled={!selectedHorario}>
          Continuar
        </Boton>
      </div>
    </div>
  );
}
