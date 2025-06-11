import { useEffect, useState } from "react";
import Header from "../components/Header";

const bannerPlaceholder = "https://apeadero.es/wp-content/uploads/cinema-500x375.jpg";

export default function MisEntradas() {
    const [reservasDetalle, setReservasDetalle] = useState([]);
    const API_BASE = "https://laravelcine-cine-zeocca.laravel.cloud/api";

    useEffect(() => {
        const fetchReservas = async () => {
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
                            horario: item.horario,
                            sala: item.sala,
                            butacas: [],
                            precioTotal: 0,
                            banner: bannerPlaceholder,
                        };
                    }
                    acc[key].butacas.push(`${item.butacas.fila}${item.butacas.numero}`);
                    acc[key].precioTotal += item.precio || 0;
                    return acc;
                }, {});

                setReservasDetalle(Object.values(agrupado));
            } catch (error) {
                console.error("Error al obtener datos:", error);
            }
        };

        fetchReservas();
    }, []);

    return (
        <>
            <div className="relative min-h-screen flex flex-col items-center p-6">
                <h1 className="text-6xl font-extrabold text-[#CDAA7D] tracking-wide text-center uppercase mb-10">
                    Mis Entradas
                </h1>
                <div className="flex flex-wrap gap-6 justify-center w-full">
                    {reservasDetalle.length === 0 ? (
                        <p className="text-center text-gray-500 w-full">No hay entradas disponibles.</p>
                    ) : (
                        reservasDetalle.map((entrada, idx) => (
                            <div
                                key={idx}
                                className="relative bg-[#1E1E1E] text-[#E0E0E0] border border-[#CDAA7D] rounded-lg shadow-lg w-96 overflow-hidden"
                            >
                                <div className="relative w-full h-40">
                                    <img src={entrada.banner} alt={`Banner de ${entrada.pelicula}`} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                                    <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">{entrada.pelicula}</h3>
                                </div>

                                <div className="p-6 text-left space-y-2">
                                    <p className="font-semibold"><strong>Factura:</strong> {entrada.numero_factura}</p>
                                    <p className="font-semibold">
                                        <strong>Horario:</strong>{" "}
                                        <strong>Horario:</strong>{" "}
                                        {new Date(new Date(entrada.horario).getTime() - 2 * 60 * 60 * 1000).toLocaleString("es-ES", {
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </p>
                                    <p className="font-semibold"><strong>Sala:</strong> {entrada.sala}</p>
                                    <p className="font-semibold"><strong>Butacas:</strong> {entrada.butacas.join(", ")}</p>
                                    <p className="text-xl font-bold text-[#CDAA7D]">
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
