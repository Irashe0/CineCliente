import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Boton from "../components/ComponentesExternos/Boton";

export default function Horarios() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("hoy");
  const [selectedHorario, setSelectedHorario] = useState(null);
  const [pelicula, setPelicula] = useState(null);
  const [salasDelCine, setSalasDelCine] = useState([]);
  const [horariosFiltrados, setHorariosFiltrados] = useState([]);

  const API_BASE = "https://laravelcine-cine-zeocca.laravel.cloud/api";

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const fechas = [
    { id: "hoy", label: "Hoy", fecha: new Date(startOfToday) },
    { id: "manana", label: "Mañana", fecha: new Date(startOfToday.getTime() + 86400000) },
    { id: "pasado", label: "Pasado", fecha: new Date(startOfToday.getTime() + 2 * 86400000) },
  ];

  useEffect(() => {
    const peli = JSON.parse(localStorage.getItem("peliculaSeleccionada"));
    if (peli) setPelicula(peli);
  }, []);

  useEffect(() => {
    const fetchSalas = async () => {
      const cine = JSON.parse(localStorage.getItem("cineSeleccionado"));
      if (!cine?.id_cine) {
        console.warn("No hay cine seleccionado");
        setSalasDelCine([]);
        return;
      }
      try {
        const res = await fetch(`${API_BASE}/salas/porCine/${cine.id_cine}`);
        if (!res.ok) throw new Error("Error en respuesta salas");
        const data = await res.json();
        if (Array.isArray(data)) {
          setSalasDelCine(data.map((sala) => sala.id_sala));
        } else {
          setSalasDelCine([]);
        }
      } catch (error) {
        console.error("Error al obtener salas:", error);
        setSalasDelCine([]);
      }
    };
    fetchSalas();
  }, []);

  useEffect(() => {
    const fetchHorarios = async () => {
      if (!pelicula?.id_pelicula) return;

      try {
        const cineGuardado = JSON.parse(localStorage.getItem("cineSeleccionado"));
        if (!cineGuardado || !cineGuardado.id_cine) {
          console.warn("No hay cine seleccionado en localStorage");
          setHorariosFiltrados([]);
          return;
        }

        if (salasDelCine.length === 0) {
          console.warn("No hay salas cargadas aún para el cine");
          setHorariosFiltrados([]);
          return;
        }

        const resHorarios = await fetch(`${API_BASE}/horarios/pelicula/${pelicula.id_pelicula}`);
        if (!resHorarios.ok) throw new Error("Error al obtener horarios");
        const horariosData = await resHorarios.json();

        const ahora = new Date();
        const fechaSeleccionadaObj = fechas.find((f) => f.id === selectedDate)?.fecha;
        if (!fechaSeleccionadaObj) return;

        const fechaInicio = new Date(fechaSeleccionadaObj);
        fechaInicio.setHours(0, 0, 0, 0);

        const fechaFin = new Date(fechaSeleccionadaObj);
        // Para "hoy" y otros días, usar siempre fin del día
        fechaFin.setHours(23, 59, 59, 999);

        // salasDelCine ya es un array de ids
        const salasIds = salasDelCine;

        const horariosFiltrados = horariosData.filter((h) => {
          const fechaHora = new Date(h.fecha_hora);

          if (fechaHora.getFullYear() < 2000) return false;

          const dentroDelDia = fechaHora >= fechaInicio && fechaHora <= fechaFin;
          const esHoyYEnElFuturo = selectedDate === "hoy" ? fechaHora > ahora : true;
          const perteneceASala = salasIds.includes(h.id_sala);

          return dentroDelDia && esHoyYEnElFuturo && perteneceASala;
        }).map((h) => ({
          hora: h.fecha_hora.split("T")[1].slice(0, 5),
          sala: `Sala ${h.id_sala}`,
          id_horario: h.id_horario,
        }));

        setHorariosFiltrados(horariosFiltrados);
      } catch (error) {
        console.error("Error al obtener los horarios:", error);
        setHorariosFiltrados([]);
      }
    };

    fetchHorarios();
  }, [pelicula, salasDelCine, selectedDate]);

  useEffect(() => {
    const progreso = JSON.parse(localStorage.getItem("reservaProgreso")) || {};
    localStorage.setItem("reservaProgreso", JSON.stringify({ ...progreso, horario: true, butacas: false, pago: false }));
  }, []);

  const handleContinuar = () => {
    if (!selectedHorario || !pelicula) {
      console.error("Debe seleccionar un horario y tener la película");
      return;
    }

    const reserva = {
      fecha: selectedDate,
      horario: selectedHorario.hora,
      id_horario: selectedHorario.id_horario,
      sala: selectedHorario.sala.replace("Sala ", ""),
      pelicula: {
        id_pelicula: pelicula.id_pelicula,
        titulo: pelicula.titulo,
      }
    };

    localStorage.setItem("reserva", JSON.stringify(reserva));
    const progreso = JSON.parse(localStorage.getItem("reservaProgreso")) || {};
    localStorage.setItem("reservaProgreso", JSON.stringify({ ...progreso, butacas: false, pago: false }));

    navigate(`/reserva/${pelicula.id_pelicula}/butacas`);
  };

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-6">
        {fechas.map(fecha => (
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

      {pelicula ? (
        horariosFiltrados.length > 0 ? (
          <div className="border rounded-lg overflow-hidden p-4">
            <h3 className="text-lg sm:text-xl font-bold mb-4 text-center">{pelicula.titulo}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {horariosFiltrados.map(horario => (
                <button
                  key={horario.id_horario}
                  onClick={() => setSelectedHorario(horario)}
                  className={`px-4 py-2 rounded border text-lg font-medium flex justify-between items-center ${selectedHorario?.id_horario === horario.id_horario ? "bg-[var(--principal)] text-white" : "bg-white text-gray-700"}`}
                >
                  <span>{horario.hora}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <span className="text-gray-400 text-lg text-center block mt-4">No hay horarios disponibles</span>
        )
      ) : (
        <span className="text-gray-400 text-lg text-center block mt-4">No hay película seleccionada</span>
      )}

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
