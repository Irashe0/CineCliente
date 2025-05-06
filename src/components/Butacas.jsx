import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Boton from "../components/ComponentesExternos/Boton";

export default function Butacas() {
  const navigate = useNavigate();
  const [butacas, setButacas] = useState([]);
  const [selectedButacas, setSelectedButacas] = useState([]);
  const salaSeleccionada = localStorage.getItem("salaSeleccionada");
  const horarioSeleccionado = localStorage.getItem("horarioSeleccionado");

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
      localStorage.setItem("butacasSeleccionadas", JSON.stringify(selectedButacas));
      navigate("/reserva/pago");
    }
  };

  const handleVolver = () => {
    navigate("/reserva/horario");
  };

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-center text-xl font-bold">Selecciona tus butacas</h2>
      <p className="text-center text-sm text-gray-600">
        Sala: <strong>{salaSeleccionada}</strong> | Horario: <strong>{horarioSeleccionado}</strong>
      </p>

      <div className="grid grid-cols-5 gap-2 justify-center">
        {butacas.length > 0 ? (
          butacas.map((butaca) => (
            <button
              key={butaca.id}
              onClick={() => toggleSeleccionButaca(butaca.id)}
              className={`p-4 rounded text-sm font-medium border ${
                selectedButacas.includes(butaca.id)
                  ? "bg-blue-500 text-white"
                  : butaca.ocupada
                  ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                  : "bg-white text-gray-700"
              }`}
              disabled={butaca.ocupada}
            >
              {butaca.numero}
            </button>
          ))
        ) : (
          <p className="text-center text-gray-400">No hay butacas disponibles</p>
        )}
      </div>

      <div className="flex justify-between mt-8">
        <Boton onClick={handleVolver} variante="outline">
          Volver
        </Boton>
        <Boton onClick={handleContinuar} disabled={selectedButacas.length === 0}>
          Continuar
        </Boton>
      </div>
    </div>
  );
}
