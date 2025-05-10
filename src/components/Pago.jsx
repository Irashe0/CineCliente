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
      const user = JSON.parse(localStorage.getItem("user"));

      if (!reservaData || !reservaData.pelicula || !reservaData.horario || !reservaData.id_horario || !reservaData.butacas.length) {
        console.error("Error: Datos insuficientes para realizar la compra.");
        return;
      }
      console.log("Datos de reserva:", reservaData);
      console.log("Contenido actual de localStorage:", JSON.parse(localStorage.getItem("reserva")));

      if (!user?.id || !localStorage.getItem("token")) {
        console.error("Error: Usuario no autenticado.");
        return;
      }

      console.log("Datos enviados en la reserva:", {
        id_user: user.id,
        id_horario: reservaData.id_horario,
      });

      // Registrar la reserva
      const reservaResponse = await fetch(`${API_BASE}/reservas`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
        body: JSON.stringify({
          id_user: user.id,
          id_horario: reservaData.id_horario,
        }),
      });

      if (!reservaResponse.ok) {
        console.error("Error al registrar la reserva.");
        return;
      }

      const nuevaReserva = await reservaResponse.json();
      console.log("Reserva creada correctamente:", nuevaReserva.reserva);

      // Registrar las ventas de las butacas
      let ventasExitosas = true; // Flag para saber si todas las ventas fueron exitosas
      await Promise.all(
        reservaData.butacas.map(async (butaca) => {
          const ventaResponse = await fetch(`${API_BASE}/ventas`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
            body: JSON.stringify({
              id_reserva: nuevaReserva.reserva.id,
              id_butaca: butaca.id_butaca,
              total: reservaData.butacas.length * precioEntrada,
            }),
          });

          if (!ventaResponse.ok) {
            console.error(`Error al registrar la venta de la butaca ${butaca.id_butaca}`);
            ventasExitosas = false;
          }
        })
      );

      if (ventasExitosas) {
        console.log("Todas las ventas han sido registradas correctamente.");
      } else {
        console.error("Algunas ventas no fueron registradas correctamente.");
        return; // Detener el proceso si alguna venta falla
      }

      // Actualizar las butacas como 'ocupadas'
      let actualizacionesExitosas = true;
      await Promise.all(
        reservaData.butacas.map(async (butaca) => {
          const updateButacaResponse = await fetch(`${API_BASE}/butacas/${butaca.id_butaca}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
            body: JSON.stringify({ estado: "ocupada" }),
          });

          if (!updateButacaResponse.ok) {
            console.error(`Error al actualizar el estado de la butaca ${butaca.id_butaca}`);
            actualizacionesExitosas = false;
          }
        })
      );

      if (actualizacionesExitosas) {
        console.log("Todas las butacas han sido marcadas como 'ocupada'.");
      } else {
        console.error("Algunas butacas no fueron actualizadas correctamente.");
        return; // Detener el proceso si alguna actualización de butaca falla
      }

      // Eliminar solo los datos de la compra
      localStorage.removeItem("reserva");

      // Redirigir a la página de confirmación
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
                          <button type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            onClick={() => setShowCardNumber(!showCardNumber)}
                          >
                            {showCardNumber ? <EyeOff /> : <Eye />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Button onClick={handleCompra} title="Realizar compra" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
