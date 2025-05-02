import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Boton from "../components/ComponentesExternos/Boton";

export default function ButacasPage() {
  const navigate = useNavigate();
  const [butacasSeleccionadas, setButacasSeleccionadas] = useState([]);
  const [cineSeleccionado, setCineSeleccionado] = useState(null);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);

  useEffect(() => {
    const cine = localStorage.getItem("cineSeleccionado");
    const horario = localStorage.getItem("horarioSeleccionado");

    if (!cine || !horario) {
      navigate("/reserva/cine");
    } else {
      setCineSeleccionado(cine);
      setHorarioSeleccionado(horario);
    }
  }, [navigate]);

  const filas = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const columnas = [1,2,3,4,5,6,7,8,9,10,11,12];
  const butacasOcupadas = ["A3","A4","B5","C7","C8","D1","D2","E10","E11","F8","G3","H12"];

  const toggleButaca = (butaca) => {
    if (butacasOcupadas.includes(butaca)) return;
    setButacasSeleccionadas((prev) =>
      prev.includes(butaca) ? prev.filter((b) => b !== butaca) : [...prev, butaca]
    );
  };

  const getButacaStatus = (butaca) => {
    if (butacasOcupadas.includes(butaca)) return "ocupada";
    if (butacasSeleccionadas.includes(butaca)) return "seleccionada";
    return "disponible";
  };

  const handleContinuar = () => {
    if (butacasSeleccionadas.length > 0) {
      localStorage.setItem("butacasSeleccionadas", JSON.stringify(butacasSeleccionadas));
      navigate("/reserva/pago");
    }
  };

  const handleVolver = () => {
    navigate("/reserva/horario");
  };

  return (
    <div className="space-y-8 p-6">
      {/* Título */}
      <div className="text-center">
        <h2 className="text-3xl font-bold">Selecciona tus Butacas</h2>
        <p className="text-gray-400 mt-2">Paso 3 de 4: Elige dónde quieres sentarte</p>
      </div>

      {/* Pantalla */}
      <div className="flex flex-col items-center">
        <div className="w-full max-w-3xl mb-8">
          <div className="h-8 bg-gray-300 rounded-t-lg flex items-center justify-center text-gray-700 font-semibold">
            PANTALLA
          </div>
          <div className="h-2 bg-gradient-to-b from-gray-300 to-transparent"></div>
        </div>

        {/* Leyenda */}
        <div className="flex gap-6 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-300 border rounded-sm"></div>
            <span className="text-sm">Disponible</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded-sm"></div>
            <span className="text-sm">Seleccionada</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-400 rounded-sm"></div>
            <span className="text-sm">Ocupada</span>
          </div>
        </div>

        {/* Butacas */}
        <div className="w-full max-w-3xl overflow-x-auto pb-4">
          <div className="grid grid-rows-8 gap-2 min-w-[500px]">
            {filas.map((fila) => (
              <div key={fila} className="grid grid-cols-12 gap-2">
                {columnas.map((columna) => {
                  const butaca = `${fila}${columna}`;
                  const status = getButacaStatus(butaca);

                  return (
                    <button
                      key={butaca}
                      className={`
                        w-8 h-8 flex items-center justify-center text-xs font-medium rounded-t-lg
                        ${status === "disponible" ? "bg-gray-300 hover:bg-gray-200" : ""}
                        ${status === "seleccionada" ? "bg-blue-500 text-white" : ""}
                        ${status === "ocupada" ? "bg-gray-400 text-gray-600 cursor-not-allowed" : ""}
                      `}
                      onClick={() => toggleButaca(butaca)}
                      disabled={status === "ocupada"}
                      aria-label={`Butaca ${butaca} ${status}`}
                    >
                      {columna}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Resumen de Butacas */}
      {butacasSeleccionadas.length > 0 && (
        <div className="border border-gray-700 rounded-lg p-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold mb-2">Butacas seleccionadas:</h3>
              <div className="flex flex-wrap gap-2">
                {butacasSeleccionadas.map((butaca) => (
                  <span
                    key={butaca}
                    className="px-2 py-1 text-xs bg-gray-700 rounded-full"
                  >
                    {butaca}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400">Total:</div>
              <div className="text-xl font-bold">${(butacasSeleccionadas.length * 85).toFixed(2)}</div>
              <div className="text-xs text-gray-400">{butacasSeleccionadas.length} × $85.00</div>
            </div>
          </div>
        </div>
      )}

      {/* Botones de navegación */}
      <div className="flex justify-between mt-8">
        <Boton onClick={handleVolver} variante="outline">
          Volver
        </Boton>
        <Boton onClick={handleContinuar} disabled={butacasSeleccionadas.length === 0}>
          Continuar
        </Boton>
      </div>
    </div>
  );
}
