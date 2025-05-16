import Button from "../components/ComponentesExternos/Boton";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { useRef } from "react";

const Pago = () => {
  const navigate = useNavigate();

  const reserva = JSON.parse(localStorage.getItem("reserva")) ?? {};
  const selectedPelicula = reserva?.pelicula ?? {};
  const horarioSeleccionado = reserva?.horario;
  const salaSeleccionada = reserva?.sala ?? "No disponible";
  const butacasSeleccionadas = reserva?.butacas ?? [];
  console.log("Reserva:", reserva);
  const precioEntrada = 8;
  const total = butacasSeleccionadas.length * precioEntrada;

  const API_BASE = import.meta.env.VITE_API_URL;

  const formRef = useRef(null);

  useEffect(() => {
    const progreso = JSON.parse(localStorage.getItem("reservaProgreso")) || {};

    localStorage.setItem("reservaProgreso", JSON.stringify({
      ...progreso,
      cine: progreso.cine ?? true,
      horario: progreso.horario ?? true,
      butacas: progreso.butacas ?? true,
      pago: true,
    }));
  }, []);

  const generarCodigo = () => {
    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numeros = "0123456789";
    let codigo = "";
    for (let i = 0; i < 3; i++) {
      codigo += letras.charAt(Math.floor(Math.random() * letras.length));
    }
    for (let i = 0; i < 5; i++) {
      codigo += numeros.charAt(Math.floor(Math.random() * numeros.length));
    }
    return codigo;
  };

  const handleCompra = async () => {
    const form = formRef.current;
    if (!form) return;

    const inputs = form.querySelectorAll("input, select");
    for (let input of inputs) {
      if (input.hasAttribute("required") && !input.value.trim()) {
        alert("Por favor completa todos los campos requeridos.");
        input.focus();
        return;
      }
    }

    try {
      const reservaData = JSON.parse(localStorage.getItem("reserva"));
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");

      if (!reservaData?.pelicula || !reservaData?.horario || !reservaData?.id_horario || !reservaData?.butacas.length) {
        console.error("❌ Error: Datos insuficientes para realizar la compra.");
        alert("Faltan datos en la reserva. Verifica antes de continuar.");
        return;
      }

      if (!user?.id || !token) {
        console.error("❌ Error: Usuario no autenticado.");
        alert("Debes iniciar sesión para completar la compra.");
        return;
      }

      const reservaResponse = await fetch(`${API_BASE}/reservas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id_user: user.id,
          id_horario: reservaData.id_horario,
        }),
      });

      if (!reservaResponse.ok) {
        console.error("❌ Error al registrar la reserva.");
        return;
      }

      const nuevaReserva = await reservaResponse.json();
      let totalCompra = reservaData.butacas.length * precioEntrada;

      let numeroFactura = localStorage.getItem("codigoSeguimiento");
      if (!numeroFactura) {
        numeroFactura = generarCodigo();
        localStorage.setItem("codigoSeguimiento", numeroFactura);
      }

      let ventasExitosas = true;
      await Promise.all(
        reservaData.butacas.map(async (butaca) => {
          const ventaResponse = await fetch(`${API_BASE}/ventas`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              id_reserva: nuevaReserva.reserva.id_reserva,
              id_butaca: butaca.id_butaca,
              total: precioEntrada,
            }),
          });

          if (!ventaResponse.ok) {
            console.error(`❌ Error al registrar la venta de la butaca ${butaca.id_butaca}`);
            ventasExitosas = false;
          }
        })
      );

      if (!ventasExitosas) {
        console.error("❌ Algunas ventas no fueron registradas correctamente.");
        return;
      }

      let actualizacionesExitosas = true;
      await Promise.all(
        reservaData.butacas.map(async (butaca) => {
          const updateButacaResponse = await fetch(`${API_BASE}/butacas/${butaca.id_butaca}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ estado: "ocupada" }),
          });

          if (!updateButacaResponse.ok) {
            console.error(`❌ Error al actualizar el estado de la butaca ${butaca.id_butaca}`);
            actualizacionesExitosas = false;
          }
        })
      );

      if (!actualizacionesExitosas) {
        console.error("❌ Algunas butacas no fueron actualizadas correctamente.");
        return;
      }

      const facturaData = {
        id_venta: nuevaReserva.reserva.id_reserva,
        total: totalCompra,
        numero_factura: numeroFactura, 
      };

      console.log("📌 Datos de factura guardados en `localStorage`:", facturaData);
      localStorage.setItem("facturaData", JSON.stringify(facturaData));

      navigate("/confirmacion-compra");
    } catch (error) {
      console.error("❌ Error en el proceso de compra:", error);
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
              <form ref={formRef} className="w-full">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-lg text-white">Nombre</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 rounded-md bg-neutral-800 border border-neutral-600 text-white"
                        required
                        onInput={(e) => e.target.value = e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "")}
                      />
                    </div>
                    <div>
                      <label className="text-lg text-white">Apellidos</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 rounded-md bg-neutral-800 border border-neutral-600 text-white"
                        required
                        onInput={(e) => e.target.value = e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "")}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-lg text-white">Correo electrónico</label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 rounded-md bg-neutral-800 border border-neutral-600 text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-lg text-white">Teléfono</label>
                    <input
                      type="tel"
                      className="w-full px-3 py-2 rounded-md bg-neutral-800 border border-neutral-600 text-white"
                      required
                      onInput={(e) => e.target.value = e.target.value.replace(/[^\d+]/g, "")}
                    />
                  </div>
                  <div>
                    <label className="text-lg text-white">Dirección</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 rounded-md bg-neutral-800 border border-neutral-600 text-white"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-lg text-white">Código Postal</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 rounded-md bg-neutral-800 border border-neutral-600 text-white"
                        required
                        onInput={(e) => e.target.value = e.target.value.replace(/\D/g, "").slice(0, 5)}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-lg text-white">Ciudad</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 rounded-md bg-neutral-800 border border-neutral-600 text-white"
                        required
                        onInput={(e) => e.target.value = e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "")}
                      />
                    </div>
                  </div>
                </div>

                <h3 className="text-[#cdaa7d] text-3xl font-bold mt-10 text-center">Método de Pago</h3>
                <div className="space-y-4 mt-6">
                  <div>
                    <label className="text-lg text-white">Titular de la tarjeta</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 rounded-md bg-neutral-800 border border-neutral-600 text-white"
                      required
                      onInput={(e) => e.target.value = e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "")}
                    />
                  </div>
                  <div className="relative">
                    <label className="text-lg text-white">Número de tarjeta</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 pr-10 rounded-md bg-neutral-800 border border-neutral-600 text-white"
                      maxLength={19}
                      required
                      onInput={(e) => e.target.value = e.target.value.replace(/\D/g, "").slice(0, 16)}
                    />

                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-lg text-white">Mes</label>
                      <select className="w-full p-2 rounded-md bg-neutral-800 border border-neutral-600 text-white">
                        <option value="" disabled>Mes</option>
                        {[...Array(12)].map((_, i) => (
                          <option key={i + 1} value={i + 1}>{String(i + 1).padStart(2, "0")}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-lg text-white">Año</label>
                      <select className="w-full p-2 rounded-md bg-neutral-800 border border-neutral-600 text-white">
                        <option value="" disabled>Año</option>
                        {[...Array(10)].map((_, i) => (
                          <option key={i} value={2025 + i}>{2025 + i}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-lg text-white">CVV</label>
                    <input
                      type="password"
                      maxLength={3}
                      className="w-full p-2 rounded-md bg-neutral-800 border border-neutral-600 text-white"
                      required
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/3">
        <div className="rounded-lg border border-[#3a3a3a] bg-[#14130f] text-white shadow-lg w-full">
          <div className="rounded-t-lg border-b border-[#3a3a3a] p-4">
            <h3 className="text-[#cdaa7d] text-2xl font-bold">Resumen de la compra</h3>
          </div>
          <div className="p-6 space-y-4">
            <h4 className="text-lg font-semibold">Película: {selectedPelicula.titulo}</h4>
            <p>Horario: {horarioSeleccionado}</p>
            <p>Sala: {salaSeleccionada}</p>
            <p>Butacas seleccionadas: {butacasSeleccionadas.map((b) => `${b.fila}${b.numero}`).join(", ")}</p>
            <p>Total: ${total.toFixed(2)}</p>
            <div className="flex justify-center">
              <Button onClick={handleCompra} className="bg-[var(--principal)] text-white py-2 rounded-md text-lg px-6">
                Realizar compra
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pago;
