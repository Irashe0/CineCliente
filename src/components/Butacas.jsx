import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Armchair } from "lucide-react";
import Boton from "../components/ComponentesExternos/Boton";

export default function Butacas() {
  const navigate = useNavigate();
  const [butacas, setButacas] = useState([]);
  const [selectedButacas, setSelectedButacas] = useState([]);

  const reserva = JSON.parse(localStorage.getItem("reserva")) || {};
  const { sala, horario, fecha, pelicula } = reserva;

  useEffect(() => {
    if (pelicula?.id_pelicula && !pelicula?.titulo) {
      const updatedReserva = {
        ...reserva,
        pelicula: {
          id_pelicula: pelicula.id_pelicula,
          titulo: pelicula.nombre ?? "No disponible",
        },
      };
      localStorage.setItem("reserva", JSON.stringify(updatedReserva));
    }
  }, [pelicula]);

  useEffect(() => {
    if (sala) {
      const fetchButacas = async () => {
        try {
          const API_BASE = "https://laravelcine-cine-zeocca.laravel.cloud/api";
          const resButacas = await fetch(`${API_BASE}/butacas/sala/${sala}`);
          const butacasData = await resButacas.json();
          setButacas(butacasData);
        } catch (err) {
          console.error("Error al cargar las butacas:", err);
        }
      };

      fetchButacas();
    }
  }, [sala]);

  const toggleSeleccionButaca = (id) => {
    setSelectedButacas((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  const handleContinuar = () => {
    if (selectedButacas.length > 0) {
      const butacasSeleccionadas = butacas
        .filter((b) => selectedButacas.includes(b.id_butaca))
        .map((b) => ({ id_butaca: b.id_butaca, fila: b.fila, numero: b.numero }));

      const updatedReserva = {
        ...reserva,
        butacas: butacasSeleccionadas,
      };

      localStorage.setItem("reserva", JSON.stringify(updatedReserva));
      navigate(`/reserva/${pelicula?.id_pelicula}/pago`);
    }
  };

  const handleVolver = () => {
    navigate("/reserva/horario");
  };

  const filas = [];
  const filaMapping = { A: 1, B: 2, C: 3, D: 4, E: 5 };

  butacas.forEach((butaca) => {
    const filaIndex = filaMapping[butaca.fila];
    if (filaIndex) {
      if (!filas[filaIndex - 1]) filas[filaIndex - 1] = [];
      filas[filaIndex - 1].push(butaca);
    } else {
      console.error(`Fila inválida:`, butaca);
    }
  });

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-center text-xl font-bold text-[var(--texto-primario)]">Selecciona tus butacas</h2>
      <p className="text-center text-sm text-[var(--texto-secundario)]">
        Sala: <strong>{sala}</strong> | Horario: <strong>{horario}</strong>
      </p>


      <div className="rounded-xl p-4 space-y-4 bg-[var(--gris-oscuro)]">
        <div className="w-full text-center text-[var(--texto-secundario)] font-medium border-b-4 pb-2 border-[var(--borde-suave)]">
          Pantalla
        </div>

        <div className="space-y-2">
          {filas.map((fila, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-3">
              {fila.map((butaca) => (
                <button
                  key={butaca.id_butaca}
                  onClick={() => toggleSeleccionButaca(butaca.id_butaca)}
                  className="flex justify-center items-center p-2 rounded border border-[var(--borde-suave)]"
                  disabled={butaca.estado === "Ocupada"}
                >
                  <Armchair
                    className="h-6 w-6"
                    color={
                      selectedButacas.includes(butaca.id_butaca)
                        ? "#CDAA7D"
                        : butaca.estado === "Ocupada"
                          ? "#2D2D2D"
                          : "#EDE6D6"
                    }
                  />
                </button>
              ))}
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
