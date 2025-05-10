import React, { useState } from "react";
import { Eye, EyeOff, CreditCardIcon } from "lucide-react";
import Button from "../components/ComponentesExternos/Boton";
import { useNavigate } from "react-router-dom";

const Pago = () => {
  const [showCardNumber, setShowCardNumber] = useState(false);
  const navigate = useNavigate();

  const reserva = JSON.parse(localStorage.getItem("reserva")) ?? {};
  console.log("Reserva:", reserva);

  const selectedPelicula = reserva?.pelicula ?? {};
  const horarioSeleccionado = reserva?.horario;
  const salaSeleccionada = reserva?.sala ?? "No disponible";
  const butacasSeleccionadas = reserva?.butacas ?? [];

  const precioEntrada = 8;
  const total = butacasSeleccionadas.length * precioEntrada;


  const API_BASE = import.meta.env.VITE_API_URL;

  const handleCompra = async () => {
    try {
      const reservaData = JSON.parse(localStorage.getItem("reserva"));
      if (!reservaData || !reservaData.pelicula || !reservaData.horario || !reservaData.butacas) {
        console.error("Error: Datos insuficientes para realizar la compra.");
        return;
      }

      const user = JSON.parse(localStorage.getItem("user"));
      if (!user?.id || !localStorage.getItem("token")) {
        console.error("Error: Usuario no autenticado.");
        return;
      }

      const API_BASE = import.meta.env.VITE_API_URL;

      const ventaResponse = await fetch(`${API_BASE}/ventas`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
        body: JSON.stringify({
          id_reserva: reservaData.reserva.id,
          id_butaca: reservaData.butacas.id_butaca,
          total: reservaData.butacas.length * 8 
        }),
      });

      if (!ventaResponse.ok) {
        console.error("Error al registrar la venta.");
        return;
      }

      console.log("Venta registrada correctamente.");

      await Promise.all(
        reservaData.butacas.map(async (butaca) => {
          await fetch(`${API_BASE}/butacas/${butaca.id_butaca}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
            body: JSON.stringify({
              estado: "ocupada"
            }),
          });
        })
      );

      console.log("Todas las butacas han sido marcadas como 'ocupada'.");

      localStorage.clear();
      navigate("/confirmacion-compra");

    } catch (error) {
      console.error("Error en el proceso de compra:", error);
    }
  };
  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-4 px-4">
      <div className="w-full md:w-2/3 mb-6 md:mb-0">
        <div className="rounded-lg border border-[#3a3a3a] bg-[#14130f] text-white shadow-lg w-full">
          <div className="rounded-t-lg border-b border-[#3a3a3a] p-4">
            <div className="flex items-center justify-center">
              <h3 className="text-[#cdaa7d] text-3xl font-bold">Pago</h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="w-full">
                <div className="mt-4 bg-[#1a1a1a] p-4 rounded-md border border-[#3a3a3a]">
                  <div className="space-y-4 mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="firstName" className="block text-sm font-medium text-white">
                          Nombre
                        </label>
                        <input
                          id="firstName"
                          type="text"
                          placeholder="Nombre"
                          className="w-full px-3 py-2 border rounded-md bg-neutral-800 border-neutral-600 text-white focus:outline-none focus:ring-2 focus:ring-[var(--principal)]"
                          pattern="[a-zA-ZÀ-ÿ\s]+"
                          required
                          onInput={(e) => e.target.value = e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "")}
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="lastName" className="block text-sm font-medium text-white">
                          Apellidos
                        </label>
                        <input
                          id="lastName"
                          type="text"
                          placeholder="Apellidos"
                          className="w-full px-3 py-2 border rounded-md bg-neutral-800 border-neutral-600 text-white focus:outline-none focus:ring-2 focus:ring-[var(--principal)]"
                          pattern="[a-zA-ZÀ-ÿ\s]+"
                          required
                          onInput={(e) => e.target.value = e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "")}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium text-white">Correo electrónico</label>
                      <input
                        id="email"
                        type="email"
                        placeholder="correo@ejemplo.com"
                        className="w-full px-3 py-2 border rounded-md bg-neutral-800 border-neutral-600 text-white focus:outline-none focus:ring-2 focus:ring-[var(--principal)]"
                        required
                        pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="block text-sm font-medium text-white">Teléfono</label>
                      <input
                        id="phone"
                        type="tel"
                        placeholder="+34 600 000 000"
                        className="w-full px-3 py-2 border rounded-md bg-neutral-800 border-neutral-600 text-white focus:outline-none focus:ring-2 focus:ring-[var(--principal)]"
                        required
                        pattern="^\+?[0-9\s]{10,15}$"
                        onInput={(e) => e.target.value = e.target.value.replace(/[^\d+]/g, "")}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="address" className="block text-sm font-medium text-white">Dirección</label>
                      <input
                        id="address"
                        type="text"
                        placeholder="Calle, número"
                        className="w-full px-3 py-2 border rounded-md bg-neutral-800 border-neutral-600 text-white focus:outline-none focus:ring-2 focus:ring-[var(--principal)]"
                        required
                        onInput={(e) => e.target.value = e.target.value.replace(/[<>]/g, "")}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="postalCode" className="block text-sm font-medium text-white">Código Postal</label>
                        <input
                          id="postalCode"
                          type="text"
                          placeholder="28001"
                          className="w-full px-3 py-2 border rounded-md bg-neutral-800 border-neutral-600 text-white focus:outline-none focus:ring-2 focus:ring-[var(--principal)]"
                          pattern="[0-9]{5}"
                          required
                          onInput={(e) => e.target.value = e.target.value.replace(/\D/g, "").slice(0, 5)}
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label htmlFor="city" className="block text-sm font-medium text-white">Ciudad</label>
                        <input
                          id="city"
                          type="text"
                          placeholder="Madrid"
                          className="w-full px-3 py-2 border rounded-md bg-neutral-800 border-neutral-600 text-white focus:outline-none focus:ring-2 focus:ring-[var(--principal)]"
                          pattern="[a-zA-ZÀ-ÿ\s]+"
                          required
                          onInput={(e) => e.target.value = e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "")}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="space-y-4 mt-0">
                    <h3 className="text-[#cdaa7d] text-3xl m-8 font-bold text-center">Método de Pago</h3>
                    <div className="space-y-4 mt-4 bg-[#1a1a1a] p-4 rounded-md border border-[#3a3a3a]">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-white font-medium">Detalles de la tarjeta</h3>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="cardName" className="block text-sm font-medium text-white">
                          Titular de la tarjeta
                        </label>
                        <input
                          id="cardName"
                          type="text"
                          placeholder="Nombre completo como aparece en la tarjeta"
                          className="w-full px-3 py-2 border rounded-md bg-neutral-800 border-neutral-600 text-white focus:outline-none focus:ring-2 focus:ring-[var(--principal)]"
                          pattern="[a-zA-ZÀ-ÿ\s]+"
                          required
                          onInput={(e) => e.target.value = e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "")}
                        />
                      </div>
                      <div className="space-y-2 relative">
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-white">
                          Número de tarjeta
                        </label>
                        <div className="relative">
                          <input
                            id="cardNumber"
                            type={showCardNumber ? "text" : "password"}
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                            className="w-full px-3 py-2 border rounded-md bg-neutral-800 border-neutral-600 text-white focus:outline-none focus:ring-2 focus:ring-[var(--principal)] pl-10 pr-10"
                            pattern="[0-9]{16}"
                            required
                            onInput={(e) => e.target.value = e.target.value.replace(/\D/g, "").slice(0, 16)}
                          />
                          <CreditCardIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <button
                            type="button"
                            onClick={() => setShowCardNumber(!showCardNumber)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                          >
                            {showCardNumber ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2 col-span-1">
                          <label htmlFor="expMonth" className="block text-sm font-medium text-white">Mes</label>
                          <select
                            id="expMonth"
                            className="w-full p-2 border rounded-md bg-neutral-800 border-neutral-600 text-white focus:outline-none focus:ring-2 focus:ring-[var(--principal)]"
                            required
                          >
                            <option value="">MM</option>
                            {Array.from({ length: 12 }, (_, i) => (
                              <option key={i} value={String(i + 1).padStart(2, "0")}>{String(i + 1).padStart(2, "0")}</option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-2 col-span-1">
                          <label htmlFor="expYear" className="block text-sm font-medium text-white">Año</label>
                          <select
                            id="expYear"
                            className="w-full p-2 border rounded-md bg-neutral-800 border-neutral-600 text-white focus:outline-none focus:ring-2 focus:ring-[var(--principal)]"
                            required
                          >
                            <option value="">AA</option>
                            {Array.from({ length: 10 }, (_, i) => (
                              <option key={i} value={String(new Date().getFullYear() + i).slice(-2)}>{String(new Date().getFullYear() + i).slice(-2)}</option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-2 col-span-1">
                          <label htmlFor="cvv" className="block text-sm font-medium text-white">CVV</label>
                          <input
                            id="cvv"
                            type="password"
                            placeholder="123"
                            maxLength={3}
                            className="w-full px-3 py-2 border rounded-md bg-neutral-800 border-neutral-600 text-white focus:outline-none focus:ring-2 focus:ring-[var(--principal)]"
                            pattern="[0-9]{3}"
                            required
                            onInput={(e) => e.target.value = e.target.value.replace(/\D/g, "").slice(0, 3)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Resumen de compra */}
      <div className="rounded-lg border border-[#3a3a3a] bg-[#14130f] text-white shadow-lg w-full md:w-1/3 self-start">
        <div className="rounded-t-lg border-b border-[#3a3a3a] p-4">
          <h3 className="text-[#cdaa7d] text-3xl font-bold text-center">Resumen de la compra</h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400">Pelicula</span>
            <span className="text-white font-medium">{selectedPelicula?.titulo ?? 'No disponible'}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400">Fecha</span>
            <span className="text-white font-medium">{reserva?.fecha || 'No disponible'}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400">Horario</span>
            <span className="text-white font-medium">{horarioSeleccionado || 'No disponible'}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400">Sala</span>
            <span className="text-white font-medium">{salaSeleccionada}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400">Butacas</span>
            <div className="text-white">
              {butacasSeleccionadas?.map((butaca) => (
                <span key={butaca.id_butaca} className="mr-2">{butaca.fila} {butaca.numero}</span>
              ))}
            </div>
          </div>
          <hr className="border-t border-[#3a3a3a] my-4" />
          <div className="flex justify-between items-center mb-2">
            <span className="text-white font-bold">Total</span>
            <span className="text-[#cdaa7d] font-bold">{total.toFixed(2)} €</span>
          </div>
        </div>
        <div className="border-t border-[#3a3a3a] p-6 flex justify-center">
          <Button variant="outline" className="w-full max-w-xs" onClick={handleCompra}>
            Comprar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pago;
