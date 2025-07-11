import { useEffect, useState } from "react";
import CinesCard from "./CineCardReserva";

export default function SelectCine() {
  const [cines, setCines] = useState([]);
  const [peliculaSeleccionada, setPeliculaSeleccionada] = useState(null);

  useEffect(() => {
    const peliculaGuardada = JSON.parse(localStorage.getItem("peliculaSeleccionada")) || null;
    setPeliculaSeleccionada(peliculaGuardada);

    const fetchCines = async () => {
      try {
        const res = await fetch("https://laravelcine-cine-zeocca.laravel.cloud/api/cines");
        const data = await res.json();
        setCines(data);
      } catch (err) {
        console.error("Error al obtener la lista de cines:", err);
      }
    };
    fetchCines();
  }, []);

  useEffect(() => {
    const progreso = JSON.parse(localStorage.getItem("reservaProgreso"));

    if (!progreso) {
      localStorage.setItem("reservaProgreso", JSON.stringify({
        cine: true,
        horario: false,
        butacas: false,
        pago: false,
      }));
    }
  }, []);

  return (
    <>
      {peliculaSeleccionada && peliculaSeleccionada.titulo ? (
        <div className="text-center">
          <h3 className="text-2x1 font-semibold text-white">
            {peliculaSeleccionada.titulo}
          </h3>
        </div>
      ) : (
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold text-gray-400">No hay película seleccionada</h3>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-20 justify-items-center">
        {Array.isArray(cines) && cines.map((cine) => (
          cine?.id_cine && (
            <CinesCard
              key={cine.id_cine}
              id={cine.id_cine}
              nombre={cine.nombre}
              ubicacion={cine.direccion}
              telefono={cine.telefono}
              onClick={() => {
                localStorage.setItem(
                  "cineSeleccionado",
                  JSON.stringify({
                    id_cine: cine.id_cine,
                    nombre: cine.nombre,
                  })
                );
                console.log(`Cine seleccionado: ${cine.nombre} (ID: ${cine.id_cine})`);
              }}
            />
          )
        ))}
      </div>
    </>
  );
}
