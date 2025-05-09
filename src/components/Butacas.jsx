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

  useEffect(() => {
    console.log("Sala seleccionada:", salaSeleccionada);
    console.log("Horario seleccionado:", horarioSeleccionado);
    console.log("Fecha seleccionada:", selectedDate);
    console.log("Película seleccionada:", selectedPelicula);

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

  useEffect(() => {
    if (selectedPelicula) {
      localStorage.setItem("peliculaSeleccionada", JSON.stringify({
        id_pelicula: selectedPelicula.id_pelicula,
        titulo: selectedPelicula.nombre,
      }));
    }
  }, [selectedPelicula]);

  const toggleSeleccionButaca = (butacaId) => {
    const updatedSelectedButacas = selectedButacas.includes(butacaId)
      ? selectedButacas.filter((id) => id !== butacaId)
      : [...selectedButacas, butacaId];

    setSelectedButacas(updatedSelectedButacas);

    const updatedButacas = butacas.map((butaca) =>
      butaca.id_butaca === butacaId ? { ...butaca, estado: "Reservada" } : butaca
    );
    setButacas(updatedButacas);
  };

  const handleContinuar = () => {
    if (selectedButacas.length > 0) {
      const butacasSeleccionadas = butacas
        .filter((b) => selectedButacas.includes(b.id_butaca))
        .map((b) => ({ id_butaca: b.id_butaca, fila: b.fila, numero: b.numero }));

      const reserva = {
        butacas: butacasSeleccionadas,
        fecha: selectedDate,
        horario: horarioSeleccionado,
        sala: salaSeleccionada?.sala?.replace("Sala ", ""),
        pelicula: selectedPelicula?.nombre,
      };

      console.log("Reserva:", reserva);
      localStorage.setItem("reserva", JSON.stringify(reserva));
      navigate(`/reserva/${selectedPelicula?.id_pelicula}/pago`);
    }
  };

  const handleVolver = () => {
    navigate("/reserva/horario");
  };

  const filas = [];
  const filaMapping = { "A": 1, "B": 2, "C": 3, "D": 4, "E": 5 };

  butacas.forEach((butaca) => {
    const filaIndex = filaMapping[butaca.fila];
    if (filaIndex) {
      if (!filas[filaIndex - 1]) {
        filas[filaIndex - 1] = [];
      }
      filas[filaIndex - 1].push(butaca);
    } else {
      console.error(`Error: fila inválida en butaca`, butaca);
    }
  });
  console.log("Filas generadas:", filas);

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
