import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Boton from "../components/ComponentesExternos/Boton";

export default function ConfirmacionCompra() {
    const navigate = useNavigate();
    const [codigoSeguimiento, setCodigoSeguimiento] = useState("");

    const API_BASE = import.meta.env.VITE_API_URL;

    useEffect(() => {
        let codigo = localStorage.getItem("codigoSeguimiento");
        if (!codigo) {
            codigo = generarCodigo();
            localStorage.setItem("codigoSeguimiento", codigo);
        }
        setCodigoSeguimiento(codigo);
    }, []);

    const handleVolver = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                alert("Debes estar logueado para guardar la factura.");
                return;
            }

            const facturaData = JSON.parse(localStorage.getItem("facturaData")) || {};
            let numeroFactura = localStorage.getItem("codigoSeguimiento") || generarCodigo();

            console.log("📌 Datos de factura antes de enviar:", facturaData);

            if (!facturaData.id_venta || !facturaData.total) {
                console.error("❌ Error: La factura no tiene los datos necesarios.");
                alert("Hubo un problema con la compra. Verifica que se haya procesado correctamente.");
                return;
            }

            const facturaFinal = {
                ...facturaData,
                numero_factura: numeroFactura,
            };

            const res = await fetch(`${API_BASE}/facturas`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(facturaFinal),
            });

            if (!res.ok) {
                throw new Error("Error al guardar la factura");
            }

            console.log("📌 Factura guardada correctamente:", facturaFinal);

            localStorage.removeItem("facturaData");
            localStorage.removeItem("codigoSeguimiento");

            navigate("/");
        } catch (error) {
            console.error("Error al procesar la factura:", error);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#1A1A2E] via-[#82642b] to-[#1A1A2E] p-4">
            <div className="absolute top-6 left-0 right-0 text-center">
                <Link to="/" className="text-4xl font-bold text-[#CDAA7D] hover:text-[#E6CBA8] transition-colors duration-300">
                    CineLuxe
                </Link>
            </div>

            <div className="w-full max-w-md rounded-lg overflow-hidden shadow-[rgba(0,0,0,0.25)] border border-[#CDAA7D] border-opacity-50">
                <div className="bg-gradient-to-t from-[#0F0F0F] to-[#1E1E1E] p-6 flex flex-col items-center">
                    <h2 className="text-2xl font-serif text-center font-bold text-[#E0E0E0] mb-3">
                        ¡Compra Realizada con éxito!
                    </h2>

                    <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-[#CDAA7D] to-transparent mb-4"></div>

                    <div className="text-center mb-6">
                        <p className="text-lg text-gray-300 mb-2">Tu código de seguimiento:</p>
                        <div className="text-3xl sm:text-4xl font-mono font-extrabold text-[#CDAA7D] bg-[#2B2B2B] px-6 py-4 rounded-lg shadow-inner border border-[#CDAA7D]">
                            {codigoSeguimiento}
                        </div>
                    </div>

                    <Boton onClick={handleVolver} className="bg-[#0077B6] hover:bg-[#005F8B] text-white font-medium py-3 px-6 rounded-md shadow-md">
                        Volver al inicio
                    </Boton>
                </div>
            </div>
        </div>
    );
}
