import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Armchair } from "lucide-react";
import Boton from "../components/ComponentesExternos/Boton";

const FILAS = 10;
const COLUMNAS_GRID = 7;
const PASILLO_HORIZ = 5;

export default function Butacas() {
  const navigate = useNavigate();
  const [butacas, setButacas] = useState([]);
  const [selectedButacas, setSelectedButacas] = useState([]);

  const reserva = JSON.parse(localStorage.getItem("reserva")) || {};
  const { sala, horario, pelicula, id_horario } = reserva;

  const API_BASE = "https://laravelcine-cine-zeocca.laravel.cloud/api";

  useEffect(() => {
    const fetchButacas = async () => {
      try {
        const res = await fetch(`${API_BASE}/butacas/sala/${sala}`);
        if (!res.ok) throw new Error("Error al obtener butacas");
        const data = await res.json();
        setButacas(data);
      } catch (err) {
        console.error("Error al cargar las butacas:", err);
      }
    };

    if (sala) fetchButacas();
  }, [sala]);

  const toggleSeleccionButaca = (id) => {
    setSelectedButacas((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  const filas = useMemo(() => {
    let contador = 0;
    const butacasGrid = Array.from({ length: FILAS }, () => []);

    for (let fila = 0; fila < FILAS; fila++) {
      if (fila === PASILLO_HORIZ) {
        butacasGrid[fila] = Array(COLUMNAS_GRID).fill(null);
      }

      for (let col = 0; col < COLUMNAS_GRID; col++) {
        if (col === 0 || col === COLUMNAS_GRID - 1) {
          butacasGrid[fila][col] = { tipo: "label", valor: fila + 1 };
        } else if (contador < butacas.length) {
          butacasGrid[fila][col] = butacas[contador];
          contador++;
        }
      }
    }

    return butacasGrid;
  }, [butacas]);

  const handleContinuar = () => {
    if (selectedButacas.length === 0) {
      alert("Selecciona al menos una butaca.");
      return;
    }

    if (selectedButacas.length > 5) {
      alert("No puedes seleccionar más de 5 butacas.");
      return;
    }

    const butacasSeleccionadas = butacas
      .filter((b) => selectedButacas.includes(b.id_butaca))
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

        <div className="space-y-2">
          {filas.map((fila, i) => (
            <div key={i} className="flex justify-center flex-wrap gap-1 sm:gap-3">
              {fila.map((butaca, j) =>
                butaca?.tipo === "label" ? (
                  <div
                    key={`label-${i}-${j}`}
                    className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-sm sm:text-lg"
                  >
                    {butaca.valor}
                  </div>
                ) : butaca ? (
                  <button
                    key={butaca.id_butaca}
                    onClick={() => toggleSeleccionButaca(butaca.id_butaca)}
                    className={`flex justify-center items-center p-1 sm:p-2 rounded border border-[var(--borde-suave)] ${butaca.estado === "Ocupada" || butaca.estado === "Reservada"
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                      }`}
                    disabled={butaca.estado === "Ocupada" || butaca.estado === "Reservada"}
                  >
                    <Armchair
                      className="h-5 w-5 sm:h-7 sm:w-7"
                      color={
                        selectedButacas.includes(butaca.id_butaca)
                          ? "#CDAA7D"
                          : butaca.estado === "Ocupada" || butaca.estado === "Reservada"
                            ? "#a3a2a2"
                            : "#EDE6D6"
                      }
                    />
                  </button>
                ) : (
                  <div key={`pasillo-${i}-${j}`} className="w-10 h-10 sm:w-12 sm:h-12"></div>
                )
              )}
            </div>
          ))}
        </div>

      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
        <Boton
          onClick={() => navigate("/reserva/horario")}
          variante="outline"
          className="w-full sm:w-auto text-[var(--principal)] border-[var(--borde-suave)]"
        >
          Volver
        </Boton>
        <Boton
          onClick={handleContinuar}
          disabled={selectedButacas.length === 0}
          className="w-full sm:w-auto bg-[var(--principal)] text-white"
        >
          Continuar
        </Boton>


      </div>
    </div>
  );
}
