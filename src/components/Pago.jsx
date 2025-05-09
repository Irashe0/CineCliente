import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Boton from "../components/ComponentesExternos/Boton";
import {
  CreditCard,
  Wallet,
  Building,
  CheckCircle2,
} from "lucide-react";


export default function PagoPage() {
  const navigate = useNavigate();
  const [metodoPago, setMetodoPago] = useState("tarjeta");
  const [cargando, setCargando] = useState(false);
  const [completado, setCompletado] = useState(false);
  const [resumen, setResumen] = useState(null);

  useEffect(() => {
    const cine = localStorage.getItem("cineSeleccionado");
    const horario = localStorage.getItem("horarioSeleccionado");
    const butacasJSON = localStorage.getItem("butacasSeleccionadas");

    if (!cine || !horario || !butacasJSON) {
      navigate("/reserva/cine");
      return;
    }

    const butacas = JSON.parse(butacasJSON);
    const [peliculaId, hora] = horario.split("-");
    const nombrePelicula =
      peliculaId === "pelicula1"
        ? "Dune: Parte 2"
        : peliculaId === "pelicula2"
        ? "Deadpool & Wolverine"
        : "Inside Out 2";
    const nombreCine =
      cine === "cine1"
        ? "Cinépolis Plaza Mayor"
        : cine === "cine2"
        ? "Cinemex Premium"
        : "Cinemark Luxury";

    setResumen({
      cine: nombreCine,
      pelicula: nombrePelicula,
      horario: hora,
      butacas,
      total: butacas.length * 85,
    });
  }, [navigate]);

  const handlePagar = () => {
    setCargando(true);
    setTimeout(() => {
      setCargando(false);
      setCompletado(true);
      localStorage.removeItem("cineSeleccionado");
      localStorage.removeItem("fechaSeleccionada");
      localStorage.removeItem("horarioSeleccionado");
      localStorage.removeItem("butacasSeleccionadas");
    }, 2000);
  };

  const handleVolver = () => navigate("/reserva/butacas");

  if (completado) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-6">
        <div className="bg-green-100 rounded-full p-4">
          <CheckCircle2 className="h-16 w-16 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold">¡Reserva Completada!</h2>
        <p className="text-center text-gray-500 max-w-md">
          Tu reserva ha sido procesada correctamente. Hemos enviado los detalles a tu correo electrónico.
        </p>

        <div className="border rounded-lg w-full max-w-md p-6 space-y-4">
          <h3 className="text-lg font-semibold">Detalles de la Reserva</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <span className="text-gray-500">Película:</span>
            <span className="font-medium">{resumen?.pelicula}</span>
            <span className="text-gray-500">Cine:</span>
            <span className="font-medium">{resumen?.cine}</span>
            <span className="text-gray-500">Horario:</span>
            <span className="font-medium">{resumen?.horario}</span>
            <span className="text-gray-500">Butacas:</span>
            <span className="font-medium">{resumen?.butacas.join(", ")}</span>
            <span className="text-gray-500">Total pagado:</span>
            <span className="font-bold">${resumen?.total.toFixed(2)}</span>
          </div>
        </div>

        <Boton onClick={() => navigate("/")} variante="outline">
          Volver al Inicio
        </Boton>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Método de Pago</h2>
        <p className="text-gray-500">Paso 4 de 4: Completa tu compra</p>
      </div>

      <div className="grid gap-6 md:grid-cols-5">
        {/* Selección de método */}
        <div className="md:col-span-3 space-y-6">
          <div className="border rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-semibold">Selecciona un método de pago</h3>

            <div className="space-y-4">
              <div
                onClick={() => setMetodoPago("tarjeta")}
                className={`flex items-center gap-2 p-3 rounded cursor-pointer border ${
                  metodoPago === "tarjeta"
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
              >
                <CreditCard className="h-5 w-5" />
                Tarjeta de crédito/débito
              </div>
              <div
                onClick={() => setMetodoPago("paypal")}
                className={`flex items-center gap-2 p-3 rounded cursor-pointer border ${
                  metodoPago === "paypal"
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
              >
                <Wallet className="h-5 w-5" />
                PayPal
              </div>
              <div
                onClick={() => setMetodoPago("transferencia")}
                className={`flex items-center gap-2 p-3 rounded cursor-pointer border ${
                  metodoPago === "transferencia"
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
              >
                <Building className="h-5 w-5" />
                Transferencia bancaria
              </div>
            </div>

            {metodoPago === "tarjeta" && (
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <label className="block text-base font-medium">Nombre en la tarjeta</label>
                  <input
                    type="text"
                    className="w-full bg-[#121212] border border-gray-700 rounded p-2 text-white"
                    placeholder="Nombre completo"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-base font-medium">Número de tarjeta</label>
                  <input
                    type="text"
                    className="w-full bg-[#121212] border border-gray-700 rounded p-2 text-white"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-base font-medium">Fecha de expiración</label>
                    <input
                      type="text"
                      className="w-full bg-[#121212] border border-gray-700 rounded p-2 text-white"
                      placeholder="MM/AA"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-base font-medium">CVV</label>
                    <input
                      type="password"
                      maxLength={4}
                      className="w-full bg-[#121212] border border-gray-700 rounded p-2 text-white"
                      placeholder="123"
                    />
                  </div>
                </div>
              </div>
            )}

            {metodoPago === "paypal" && (
              <div className="mt-4 p-4 bg-gray-100 rounded text-center text-gray-700">
                Serás redirigido a PayPal para completar el pago.
              </div>
            )}

            {metodoPago === "transferencia" && (
              <div className="mt-4 p-4 bg-gray-100 rounded space-y-2 text-gray-700">
                <p className="font-medium">Datos bancarios:</p>
                <p className="text-sm">Banco: Banco Nacional</p>
                <p className="text-sm">Cuenta: 1234-5678-9012-3456</p>
                <p className="text-sm">Titular: Cines Unidos S.A.</p>
                <p className="text-sm">Envía el comprobante a pagos@cinesunidos.com</p>
              </div>
            )}
          </div>
        </div>

        {/* Resumen de compra */}
        <div className="md:col-span-2">
          <div className="border rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-semibold">Resumen de compra</h3>
            {resumen && (
              <>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Película:</span>
                    <span>{resumen.pelicula}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Cine:</span>
                    <span>{resumen.cine}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Horario:</span>
                    <span>{resumen.horario}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Butacas:</span>
                    <span>{resumen.butacas.join(", ")}</span>
                  </div>
                </div>
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Entradas ({resumen.butacas.length})</span>
                    <span>${(resumen.butacas.length * 85).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Cargo por servicio</span>
                    <span>$10.00</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg mt-2">
                    <span>Total</span>
                    <span>${(resumen.butacas.length * 85 + 10).toFixed(2)}</span>
                  </div>
                </div>
              </>
            )}
            <div className="mt-6 flex flex-col gap-2">
              <Boton onClick={handlePagar} disabled={cargando}>
                {cargando ? "Procesando..." : "Completar Pago"}
              </Boton>
              <Boton onClick={handleVolver} variante="outline" disabled={cargando}>
                Volver
              </Boton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
