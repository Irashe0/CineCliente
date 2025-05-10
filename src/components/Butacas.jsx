import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Armchair } from "lucide-react";
import Boton from "../components/ComponentesExternos/Boton";

export default function Butacas() {
  const navigate = useNavigate();
  const [butacas, setButacas] = useState([]);
  const [selectedButacas, setSelectedButacas] = useState([]);

  const reserva = JSON.parse(localStorage.getItem("reserva")) || {};
  const { sala, horario, pelicula, id_horario } = reserva;

  const API_BASE = "https://laravelcine-cine-zeocca.laravel.cloud/api";

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
    const filaMapping = { A: 0, B: 1, C: 2, D: 3, E: 4 };
    const tempFilas = [];

    butacas.forEach((butaca) => {
      const index = filaMapping[butaca.fila];
      if (index !== undefined) {
        if (!tempFilas[index]) tempFilas[index] = [];
        tempFilas[index].push(butaca);
      }
    });

    return tempFilas;
  }, [butacas]);

  const handleContinuar = async () => {
    if (selectedButacas.length === 0) {
      alert("Selecciona al menos una butaca.");
      return;
    }
    if (selectedButacas.length > 5) {
      alert("No puedes seleccionar más de 5 butacas.");
      return;
    }

    try {
      await Promise.all(
        selectedButacas.map(async (id_butaca) => {
          const res = await fetch(`${API_BASE}/butacas/${id_butaca}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("token")}`,
              "X-Requested-With": "XMLHttpRequest",
            },
            body: JSON.stringify({ estado: "Reservada" }),
          });

          const responseData = await res.json();
          console.log("Detalles del error:", responseData?.detalles);

          if (!res.ok) throw new Error(`Error al reservar butaca ${id_butaca}: ${JSON.stringify(responseData.detalles)}`);
        })
      );

      const butacasSeleccionadas = butacas
        .filter((b) => selectedButacas.includes(b.id_butaca))
        .map(({ id_butaca, fila, numero }) => ({ id_butaca, fila, numero }));

      if (!id_horario) {
        console.error("Error: `id_horario` no está disponible en la reserva.");
        alert("Error en la selección de horario. Vuelve a intentarlo.");
        return;
      }

      const updatedReserva = { ...reserva, butacas: butacasSeleccionadas };

      console.log("Reserva guardada en localStorage:", updatedReserva);

      localStorage.setItem("reserva", JSON.stringify(updatedReserva));

      navigate(`/reserva/${pelicula?.id_pelicula}/pago`);

    } catch (err) {
      console.error("Error durante la reserva de butacas:", err);
      alert("Ocurrió un error al reservar las butacas. Intenta de nuevo.");
    }
  };

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
          {filas.map((fila, i) => (
            <div key={i} className="flex justify-center gap-3">
              {fila.map((butaca) => (
                <button
                  key={butaca.id_butaca}
                  onClick={() => toggleSeleccionButaca(butaca.id_butaca)}
                  className={`flex justify-center items-center p-2 rounded border border-[var(--borde-suave)] ${butaca.estado === "Ocupada" || butaca.estado === "Reservada" ? "opacity-50 cursor-not-allowed" : ""}`}
                  disabled={butaca.estado === "Ocupada" || butaca.estado === "Reservada"} // Deshabilitar si la butaca está ocupada o reservada
                >
                  <Armchair
                    className="h-6 w-6"
                    color={
                      selectedButacas.includes(butaca.id_butaca)
                        ? "#CDAA7D"
                        : butaca.estado === "Ocupada"
                          ? "#a3a2a2" 
                          : butaca.estado === "Reservada"
                            ? "#a3a2a2" 
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
        <Boton onClick={() => navigate("/reserva/horario")} variante="outline" className="text-[var(--principal)] border-[var(--borde-suave)]">Volver</Boton>
        <Boton onClick={handleContinuar} disabled={selectedButacas.length === 0} className="bg-[var(--principal)] text-white">Continuar</Boton>
      </div>
    </div>
  );
}
