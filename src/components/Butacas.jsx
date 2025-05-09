import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Armchair } from "lucide-react";
import Boton from "../components/ComponentesExternos/Boton";

export default function Butacas() {
  const navigate = useNavigate();
  const [butacas, setButacas] = useState([]);
  const [selectedButacas, setSelectedButacas] = useState([]);

  const salaSeleccionada = localStorage.getItem("salaSeleccionada");
  const horarioSeleccionado = localStorage.getItem("horarioSeleccionado");
  const selectedDate = localStorage.getItem("fechaSeleccionada");
  const selectedPelicula = JSON.parse(localStorage.getItem("peliculaSeleccionada"));
  const horarioSeleccionadoObj = JSON.parse(localStorage.getItem("horarioSeleccionadoObj"));

  useEffect(() => {
    const fetchButacas = async () => {
      try {
        const API_BASE = "https://laravelcine-cine-zeocca.laravel.cloud/api";
        const resButacas = await fetch(`${API_BASE}/butacas/sala/${salaSeleccionada}`);
        const butacasData = await resButacas.json();

        console.log("Butacas obtenidas:", butacasData);
        setButacas(butacasData);
      } catch (err) {
        console.error("Error al cargar las butacas:", err);
      }
    };

    if (salaSeleccionada) {
      fetchButacas();
    }
  }, [salaSeleccionada]);

  const toggleSeleccionButaca = (butacaId) => {
    setSelectedButacas((prev) =>
      prev.includes(butacaId)
        ? prev.filter((id) => id !== butacaId)
        : [...prev, butacaId]
    );
  };

  const handleContinuar = () => {
    if (selectedButacas.length > 0) {
      const butacasSeleccionadas = butacas
        .filter((b) => selectedButacas.includes(b.id))
        .map((b) => b.id); 
  
      const reserva = {
        butacas: butacasSeleccionadas,
        fecha: selectedDate,
        horario: horarioSeleccionado,
        sala: horarioSeleccionadoObj?.sala?.replace("Sala ", ""),
        pelicula: selectedPelicula
      };
  
      localStorage.setItem("reserva", JSON.stringify(reserva));
      navigate(`/reserva/${selectedPelicula.id_pelicula}/pago`);
    }
  };
  

  const handleVolver = () => {
    navigate("/reserva/horario");
  };

  const filas = [
    [1, 2, 3, 4, 5, 6, "pasillo", 7, 8, 9, 10, 11, 12], 
    [13, 14, 15, 16, 17, 18, "pasillo", 19, 20, 21, 22, 23, 24], 
    [25, 26, 27, 28, 29, 30, "pasillo", 31, 32, 33, 34, 35, 36], 
    [37, 38, 39, 40, 41, 42, "pasillo", 43, 44, 45, 46, 47, 48], 
    ["pasillo"], 
    [49, 50, 51, 52]
  ];

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-center text-xl font-bold text-[var(--texto-primario)]">Selecciona tus butacas</h2>
      <p className="text-center text-sm text-[var(--texto-secundario)]">
        Sala: <strong>{salaSeleccionada}</strong> | Horario: <strong>{horarioSeleccionado}</strong>
      </p>

      <div className="rounded-xl p-4 space-y-4 bg-[var(--gris-oscuro)]">
        <div className="w-full text-center text-[var(--texto-secundario)] font-medium border-b-4 pb-2 border-[var(--borde-suave)]">
          Pantalla
        </div>

        <div className="space-y-2">
          {filas.map((fila, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-3">
              {fila.map((butacaId, idx) =>
                butacaId === "pasillo" ? (
                  <div key={`pasillo-${rowIndex}-${idx}`} className="w-6"></div>
                ) : (
                  <button
                    key={butacaId}
                    onClick={() => toggleSeleccionButaca(butacaId)}
                    className="flex justify-center items-center p-2 rounded border border-[var(--borde-suave)]"
                    disabled={butacas.some((b) => b.id === butacaId && b.ocupada)}
                  >
                    <Armchair
                      className="h-6 w-6"
                      color={
                        selectedButacas.includes(butacaId)
                          ? "var(--principal)"
                          : butacas.some((b) => b.id === butacaId && b.ocupada)
                            ? "var(--gris-oscuro)"
                            : "var(--texto-primario)"
                      }
                    />
                  </button>
                )
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <Boton onClick={handleVolver} variante="outline" className="text-[var(--principal)] border-[var(--borde-suave)]">Volver</Boton>
        <Boton onClick={handleContinuar} disabled={selectedButacas.length === 0} className="bg-[var(--principal)] text-white">Continuar</Boton>
      </div>
    </div>
  );
}
