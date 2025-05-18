import { useEffect, useState } from "react";
import Header from "../components/Header";

export default function MisEntradas() {
  const [reservasDetalle, setReservasDetalle] = useState([]);
  const API_BASE = "https://laravelcine-cine-zeocca.laravel.cloud/api";

  useEffect(() => {
    const fetchReservasConMultimedia = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token no encontrado. Inicia sesión.");

        const user = JSON.parse(localStorage.getItem("user"));
        if (!user?.id) throw new Error("Usuario no encontrado en localStorage.");

        const res = await fetch(`${API_BASE}/facturas/detalles/usuario/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Error al obtener datos");

        const data = await res.json();

        const agrupado = data.reduce((acc, item) => {
          const key = item.numero_factura;
          if (!acc[key]) {
            acc[key] = {
              numero_factura: key,
              pelicula: item.pelicula,
              id_pelicula: item.id_pelicula,
              horario: item.horario,
              sala: item.sala,
              butacas: [],
              precioTotal: 0,
            };
          }
          acc[key].butacas.push(`${item.butacas.fila}${item.butacas.numero}`);
          acc[key].precioTotal += item.precio || 0;
          return acc;
        }, {});

        const reservasArray = Object.values(agrupado);

        setReservasDetalle(reservasArray);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchReservasConMultimedia();
  }, []);

  return (
    <>
      <Header />

      <div className="flex min-h-screen items-center justify-center p-6 bg-[#0F0F0F]">
        <div className="flex flex-wrap gap-6 justify-center w-full">
          {reservasDetalle.length === 0 ? (
            <p className="text-center text-gray-500 w-full">No hay entradas disponibles.</p>
          ) : (
            reservasDetalle.map((entrada, idx) => (
              <div
                key={idx}
                className="relative bg-[#1E1E1E] text-[#E0E0E0] border border-[#CDAA7D] rounded-lg shadow-lg w-80 overflow-hidden"
              >
                {/* Quitar banner y gradiente */}
                <div className="p-4 text-left">
                  <h3 className="text-xl font-bold text-[#CDAA7D] mb-2">🎬 {entrada.pelicula}</h3>
                  <p><strong>Factura:</strong> {entrada.numero_factura}</p>
                  <p>
                    <strong>Horario:</strong>{" "}
                    {new Date(entrada.horario).toLocaleString("es-ES", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <p><strong>Sala:</strong> {entrada.sala}</p>
                  <p><strong>Butacas:</strong> {entrada.butacas.join(", ")}</p>
                  <p className="text-lg font-bold">
                    <strong>Precio Total:</strong> {entrada.precioTotal.toFixed(2)} €
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
