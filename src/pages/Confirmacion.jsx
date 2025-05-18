import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Boton from "../components/ComponentesExternos/Boton";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ConfirmacionCompra() {
    const navigate = useNavigate();
    const [codigoSeguimiento, setCodigoSeguimiento] = useState("");

    useEffect(() => {
        let codigo = localStorage.getItem("codigoSeguimiento") || "";
        setCodigoSeguimiento(codigo);
    }, []);

    const handleVolver = () => {
        // Limpio localStorage si quieres, o solo navego al inicio
        localStorage.removeItem("codigoSeguimiento");
        localStorage.removeItem("facturaData");
        navigate("/");
    };

    return (
        <>
            <Header />
            <div className="flex min-h-screen items-center justify-center p-4">
                <div className="w-full max-w-md rounded-lg overflow-hidden shadow-[rgba(0,0,0,0.25)] border border-[#CDAA7D] border-opacity-50">
                    <div className="bg-gradient-to-t from-[#0F0F0F] to-[#1E1E1E] p-6 flex flex-col items-center">
                        <h2 className="text-2xl font-serif text-center font-bold text-[#E0E0E0] mb-3">
                            ¡Compra Realizada con éxito!
                        </h2>

                        <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-[#CDAA7D] to-transparent mb-4"></div>

                        <div className="text-center mb-6">
                            <p className="text-lg text-gray-300 mb-2">Tu código de seguimiento:</p>
                            <div className="text-3xl sm:text-4xl font-mono font-extrabold text-[#CDAA7D] bg-[#2B2B2B] px-6 py-4 rounded-lg shadow-inner border border-[#CDAA7D]">
                                {codigoSeguimiento || "No disponible"}
                            </div>
                        </div>

                        <Boton 
                            onClick={handleVolver} 
                            className="bg-[#0077B6] hover:bg-[#005F8B] text-white font-medium py-3 px-6 rounded-md shadow-md"
                        >
                            Volver al inicio
                        </Boton>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
