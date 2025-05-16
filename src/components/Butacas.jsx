import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Armchair } from "lucide-react";
import Boton from "../components/ComponentesExternos/Boton";

const PASILLO_HORIZ = 5;

export default function Butacas() {
  const navigate = useNavigate();
  const [butacas, setButacas] = useState([]);
  const [selectedButacas, setSelectedButacas] = useState(new Set());

  const reserva = JSON.parse(localStorage.getItem("reserva")) || {};
  const { sala, horario, pelicula, id_horario } = reserva;

  const API_BASE = "https://laravelcine-cine-zeocca.laravel.cloud/api";

  useEffect(() => {
    const progreso = JSON.parse(localStorage.getItem("reservaProgreso")) || {};

    localStorage.setItem("reservaProgreso", JSON.stringify({
      ...progreso,
      cine: progreso.cine ?? true,
      horario: progreso.horario ?? true,
      butacas: true,
      pago: false,
    }));
  }, []);

  useEffect(() => {
    const fetchButacas = async () => {
      try {
        const res = await fetch(`${API_BASE}/butacas/sala/2/horario/153`);
        if (!res.ok) throw new Error("Error al obtener butacas");
        const data = await res.json();

        console.log("📌 Butacas obtenidas correctamente:", data);
        setButacas(data);
      } catch (err) {
        console.error("Error al cargar las butacas:", err);
      }
    };

    if (sala && id_horario) fetchButacas();
  }, [sala, id_horario]);

  const toggleSeleccionButaca = (id) => {
    setSelectedButacas((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        if (newSet.size < 5) {
          newSet.add(id);
        } else {
          alert("No puedes seleccionar más de 5 butacas.");
        }
      }
      return newSet;
    });
  };

  const filas = useMemo(() => {
    const butacasPorFila = {};

    butacas.forEach((butaca) => {
      const fila = butaca.fila;
      const subFila = butaca.numero <= 5 ? `${fila}_1` : `${fila}_2`;

      if (!butacasPorFila[subFila]) {
        butacasPorFila[subFila] = [];
      }
      butacasPorFila[subFila].push(butaca);
    });

    Object.keys(butacasPorFila).forEach((fila) => {
      butacasPorFila[fila].sort((a, b) => a.numero - b.numero);
    });

    console.log("📌 Butacas organizadas correctamente sin filas vacías:", butacasPorFila);
    return butacasPorFila;
  }, [butacas]);


  const handleContinuar = () => {
    if (selectedButacas.size === 0) {
      alert("Selecciona al menos una butaca.");
      return;
    }

    const butacasSeleccionadas = butacas
      .filter((b) => selectedButacas.has(b.id_butaca))
      .map(({ id_butaca, fila, numero }) => ({ id_butaca, fila, numero }));

    const updatedReserva = { ...reserva, butacas: butacasSeleccionadas };

    console.log("📌 Reserva actualizada:", updatedReserva);
    localStorage.setItem("reserva", JSON.stringify(updatedReserva));

    navigate(`/reserva/${pelicula?.id_pelicula}/pago`);
  };

  return (
    <div className="space-y-6 px-4 py-6 sm:px-6 md:px-10 lg:px-20">
      <h2 className="text-center text-xl sm:text-2xl font-bold text-[var(--texto-primario)]">Selecciona tus butacas</h2>
      <p className="text-center text-sm text-[var(--texto-secundario)]">
        Sala: <strong>{sala}</strong> | Horario: <strong>{horario}</strong>
      </p>

      <div className="rounded-xl p-4 space-y-4 bg-[var(--gris-oscuro)]">
        <div className="w-full text-center text-[var(--texto-secundario)] font-medium border-b-4 pb-2 border-[var(--borde-suave)]">
          Pantalla
        </div>

        <div className="space-y-4">
          {Object.entries(filas).map(([filaLabel, butacasFila], i) => (
            <div key={i}>
              {i === PASILLO_HORIZ && <div className="h-4 sm:h-6" />}

              <div className="flex justify-center items-center gap-2">
                <div className="w-8 h-8 flex items-center justify-center text-sm font-bold">
                  {i + 1}
                </div>

                {butacasFila.map((butaca, j) => (
                  butaca ? (
                    <button
                      key={j}
                      onClick={() => toggleSeleccionButaca(butaca.id_butaca)}
                      disabled={butaca.estado === "Ocupada" || butaca.estado === "Reservada"}
                      className={`w-16 h-16 sm:w-20 sm:h-20 border rounded-lg flex items-center justify-center transition-all duration-200
        ${butaca.estado === "Ocupada" || butaca.estado === "Reservada" ? "opacity-40 cursor-not-allowed" : ""}
      `}
                    >
                      <Armchair
                        className="h-6 w-6 sm:h-8 sm:w-8 transition-all duration-200"
                        color={selectedButacas.has(butaca.id_butaca) ? "#CDAA7D" : "#EDE6D6"}
                      />
                    </button>
                  ) : (
                    <div key={j} className="w-20 h-20 sm:w-20 sm:h-20 border rounded-lg opacity-30" />
                  )
                ))}


                <div className="w-10 h-10 text-lg font-bold text-white flex items-center justify-center">
                  {i + 1}
                </div>


              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
        <Boton onClick={() => navigate("/reserva/horario")} variante="outline" className="w-full sm:w-auto text-[var(--principal)] border-[var(--borde-suave)]">
          Volver
        </Boton>
        <Boton onClick={handleContinuar} disabled={selectedButacas.size === 0} className="w-full sm:w-auto bg-[var(--principal)] text-white">
          Continuar
        </Boton>
      </div>
    </div>
  );
}
