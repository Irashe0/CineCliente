import React, { useState } from "react";
import { Lock, CreditCard, Wallet, DollarSign, Eye, EyeOff, CreditCardIcon, ShieldCheck, CheckCircle } from "lucide-react";

const Pago = () => {
  const [step, setStep] = useState("details");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [showCardNumber, setShowCardNumber] = useState(false);

  const formatCardNumber = (value) => {
    return value.replace(/\s+/g, '').replace(/(\d{4})/g, '$1 ').trim();
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-6">

        <div className="rounded-lg border border-[#3a3a3a] bg-[#14130f] text-white shadow-lg w-full lg:w-2/3">
          <div className="rounded-t-lg border-b border-[#3a3a3a] p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[#cdaa7d] text-2xl font-bold">Pasarela de Pago Segura</h3>
                <p className="text-gray-400">Complete su compra de forma segura</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-[#cdaa7d]" />
              <span className="text-gray-400 text-sm">Conexión segura</span>
            </div>
          </div>
        </div>
        <div className="p-6 space-y-6">
          <div className="w-full">
            <div className="flex rounded-md overflow-hidden mb-6 grid grid-cols-3 mb-6 bg-[#14130f]">
              <button
                onClick={() => step !== "details" && setStep("details")}
                disabled={false}
                className="flex-1 py-2 px-4 text-center data-[state=active]:bg-[#cdaa7d] data-[state=active]:text-[#14130f]"
                data-state={step === "details" ? "active" : "inactive"}
              >
                1. Detalles
              </button>
              <button
                onClick={() => step === "confirmation" && setStep("payment")}
                disabled={false}
                className="flex-1 py-2 px-4 text-center data-[state=active]:bg-[#cdaa7d] data-[state=active]:text-[#14130f]"
                data-state={step === "payment" ? "active" : "inactive"}
              >
                2. Pago
              </button>
              <button
                disabled
                className="flex-1 py-2 px-4 text-center data-[state=active]:bg-[#cdaa7d] data-[state=active]:text-[#14130f]"
                data-state={step === "confirmation" ? "active" : "inactive"}
              >
                3. Confirmación
              </button>
            </div>

            <div className={step === "details" ? "" : "hidden"}>
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
                    />
                  </div>

                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-white">
                    Correo electrónico
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    className="w-full px-3 py-2 border rounded-md bg-neutral-800 border-neutral-600 text-white focus:outline-none focus:ring-2 focus:ring-[var(--principal)]"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-white">
                    Teléfono
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="+34 600 000 000"
                    className="w-full px-3 py-2 border rounded-md bg-neutral-800 border-neutral-600 text-white focus:outline-none focus:ring-2 focus:ring-[var(--principal)]"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="address" className="block text-sm font-medium text-white">
                    Dirección
                  </label>
                  <input
                    id="address"
                    type="text"
                    placeholder="Calle, número"
                    className="w-full px-3 py-2 border rounded-md bg-neutral-800 border-neutral-600 text-white focus:outline-none focus:ring-2 focus:ring-[var(--principal)]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="postalCode" className="block text-sm font-medium text-white">
                      Código Postal
                    </label>
                    <input
                      id="postalCode"
                      type="text"
                      placeholder="28001"
                      className="w-full px-3 py-2 border rounded-md bg-neutral-800 border-neutral-600 text-white focus:outline-none focus:ring-2 focus:ring-[var(--principal)]"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label htmlFor="city" className="block text-sm font-medium text-white">
                      Ciudad
                    </label>
                    <input
                      id="city"
                      type="text"
                      placeholder="Madrid"
                      className="w-full px-3 py-2 border rounded-md bg-neutral-800 border-neutral-600 text-white focus:outline-none focus:ring-2 focus:ring-[var(--principal)]"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={step === "payment" ? "" : "hidden"}>
              <div className="space-y-4 mt-0">
                <div className="mb-6">
                  <h3 className="text-white font-medium mb-2">Método de pago</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <input
                        type="radio"
                        id="card"
                        name="paymentMethod"
                        value="card"
                        checked={paymentMethod === "card"}
                        onChange={() => setPaymentMethod("card")}
                        className="sr-only"
                      />
                      <button
                        onClick={() => setMetodoPago("card")}
                        className={`flex flex-col items-center justify-between rounded-md border-2 px-4 py-3 cursor-pointer transition ${paymentMethod === "card" ? "border-[var(--principal)] bg-neutral-800" : "border-gray-500 bg-neutral-900 hover:bg-neutral-800 hover:border-[var(--principal)]"
                          }`}
                      >
                        <CreditCard className="mb-2 h-6 w-6 text-[var(--principal)]" />
                        <span className="text-white text-sm">Tarjeta</span>
                      </button>

                    </div>
                    <div>
                      <input
                        type="radio"
                        id="wallet"
                        name="paymentMethod"
                        value="wallet"
                        checked={paymentMethod === "wallet"}
                        onChange={() => setPaymentMethod("wallet")}
                        className="sr-only"
                      />
                      <button
                        onClick={() => setMetodoPago("wallet")}
                        className={`flex flex-col items-center justify-between rounded-md border-2 px-4 py-3 cursor-pointer transition ${paymentMethod === "wallet" ? "border-[var(--principal)] bg-neutral-800" : "border-gray-500 bg-neutral-900 hover:bg-neutral-800 hover:border-[var(--principal)]"
                          }`}
                      >
                        <Wallet className="mb-2 h-6 w-6 text-[var(--principal)]" />
                        <span className="text-white text-sm">PayPal</span>
                      </button>

                    </div>
                    <div>
                      <input
                        type="radio"
                        id="transfer"
                        name="paymentMethod"
                        value="transfer"
                        checked={paymentMethod === "transfer"}
                        onChange={() => setPaymentMethod("transfer")}
                        className="sr-only"
                      />
                      <button
                        onClick={() => setMetodoPago("transfer")}
                        className={`flex flex-col items-center justify-between rounded-md border-2 px-4 py-3 cursor-pointer transition ${paymentMethod === "transfer" ? "border-[var(--principal)] bg-neutral-800" : "border-gray-500 bg-neutral-900 hover:bg-neutral-800 hover:border-[var(--principal)]"
                          }`}
                      >
                        <DollarSign className="mb-2 h-6 w-6 text-[var(--principal)]" />
                        <span className="text-white text-sm">Transferencia</span>
                      </button>
                    </div>
                  </div>
                </div>

                {paymentMethod === "card" && (
                  <div className="space-y-4 mt-4 bg-[#1a1a1a] p-4 rounded-md border border-[#3a3a3a]">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-white font-medium">Detalles de la tarjeta</h3>
                      <div className="flex gap-2">
                        <div className="bg-gray-200 h-6 w-10 rounded"></div>
                        <div className="bg-gray-200 h-6 w-10 rounded"></div>
                        <div className="bg-gray-200 h-6 w-10 rounded"></div>
                      </div>
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
                          onChange={(e) => {
                            e.target.value = formatCardNumber(e.target.value);
                          }}
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
                        <label htmlFor="expMonth" className="block text-sm font-medium text-white">
                          Mes
                        </label>
                        <select
                          id="expMonth"
                          className="w-full p-2 border rounded-md bg-neutral-800 border-neutral-600 text-white focus:outline-none focus:ring-2 focus:ring-[var(--principal)]"
                        >
                          <option value="">MM</option>
                          {Array.from({ length: 12 }, (_, i) => (
                            <option key={i} value={String(i + 1).padStart(2, "0")}>{String(i + 1).padStart(2, "0")}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2 col-span-1">
                        <label htmlFor="expYear" className="block text-sm font-medium text-white">
                          Año
                        </label>
                        <select
                          id="expYear"
                          className="w-full p-2 border rounded-md bg-neutral-800 border-neutral-600 text-white focus:outline-none focus:ring-2 focus:ring-[var(--principal)]"
                        >
                          <option value="">AA</option>
                          {Array.from({ length: 10 }, (_, i) => (
                            <option key={i} value={String(new Date().getFullYear() + i).slice(-2)}>{String(new Date().getFullYear() + i).slice(-2)}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2 col-span-1">
                        <label htmlFor="cvv" className="block text-sm font-medium text-white">
                          CVV
                        </label>
                        <input
                          id="cvv"
                          type="password"
                          placeholder="123"
                          maxLength={4}
                          className="w-full px-3 py-2 border rounded-md bg-neutral-800 border-neutral-600 text-white focus:outline-none focus:ring-2 focus:ring-[var(--principal)]"
                        />
                      </div>
                    </div>
                    <div className="flex items-center mt-4 text-gray-400 text-sm">
                      <ShieldCheck className="h-4 w-4 mr-2 text-[var(--principal)]" />
                      <span>Tus datos están protegidos con cifrado SSL de 256 bits</span>
                    </div>
                  </div>
                )}


                {paymentMethod === "wallet" && (
                  <div className="p-4 rounded-md bg-[#1a1a1a] border border-[#3a3a3a] mt-4">
                    <div className="flex items-center justify-center flex-col p-4">
                      <div className="bg-blue-100 h-12 w-24 rounded mb-4"></div>
                      <p className="text-gray-400 text-center mb-4">
                        Serás redirigido a PayPal para completar tu pago de forma segura.
                      </p>
                      <Button className="bg-[#0070ba] text-white hover:bg-[#005ea6] w-full">
                        Continuar a PayPal
                      </Button>
                    </div>
                  </div>
                )}

                {paymentMethod === "transfer" && (
                  <div className="p-4 rounded-md bg-[#1a1a1a] border border-[#3a3a3a] mt-4">
                    <h3 className="text-white font-medium mb-2">Datos bancarios</h3>
                    <div className="space-y-3 mt-4">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Banco:</span>
                        <span className="text-white font-medium">Banco Santander</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Beneficiario:</span>
                        <span className="text-white font-medium">Luxury Gold S.L.</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">IBAN:</span>
                        <span className="text-white font-mono font-medium">ES91 2100 0418 4502 0005 1332</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">BIC/SWIFT:</span>
                        <span className="text-white font-mono font-medium">BSCHESMMXXX</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Concepto:</span>
                        <span className="text-white font-mono font-medium">
                          ORD-{Math.floor(Math.random() * 1000000)}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-[#252525] rounded border border-[#3a3a3a]">
                      <p className="text-gray-400 text-sm">
                        <strong className="text-[#cdaa7d]">Importante:</strong> Por favor incluya el número de
                        referencia en el concepto de la transferencia. El procesamiento puede tardar 1-2 días hábiles.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className={step === "confirmation" ? "" : "hidden"}>
              <div className="space-y-4 mt-0">
                <div className="flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-[rgba(205,170,125,0.2)] flex items-center justify-center mb-4">
                    <CheckCircle className="h-10 w-10 text-[#cdaa7d]" />
                  </div>
                  <h3 className="text-xl font-bold text-white">¡Pago completado con éxito!</h3>
                  <p className="text-gray-400 mt-2 max-w-md">
                    Gracias por su compra. Hemos enviado un correo electrónico con los detalles de su transacción a su
                    dirección de correo.
                  </p>

                  <div className="w-full mt-8">
                    <div className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-md p-4 mb-4">
                      <h4 className="text-white font-medium mb-2">Detalles de la transacción</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Fecha:</span>
                          <span className="text-white">{new Date().toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Hora:</span>
                          <span className="text-white">{new Date().toLocaleTimeString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Método de pago:</span>
                          <span className="text-white">
                            {paymentMethod === "card"
                              ? "Tarjeta de crédito"
                              : paymentMethod === "wallet"
                                ? "PayPal"
                                : "Transferencia bancaria"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Importe:</span>
                          <span className="text-white font-medium">{orderDetails.total.toFixed(2)} €</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-md p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-white font-medium">Número de referencia</h4>
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-[#cdaa7d] text-[#14130f]">
                          Guardado
                        </span>
                      </div>
                      <div className="bg-[#252525] p-3 rounded border border-[#3a3a3a]">
                        <p className="text-white font-mono text-center">
                          TRX-{Math.random().toString(36).substring(2, 10).toUpperCase()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-[#3a3a3a] bg-[#14130f] text-white shadow-lg w-full lg:w-1/3">
        <div className="rounded-t-lg border-b border-[#3a3a3a] p-4">
          <h3 className="text-[#cdaa7d] text-2xl font-bold">Resumen de la compra</h3>
        </div>
        <div className="p-6 space-y-4">
          {orderDetails.items.map((item, index) => (
            <div key={index} className="flex justify-between items-center mb-2">
              <span className="text-gray-400">{item.name}</span>
              <span className="text-white font-medium">{(item.price * item.quantity).toFixed(2)} €</span>
            </div>
          ))}
          <hr className={`border-t border-[#3a3a3a] my-4 ${className || ""}`} />
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400">Subtotal</span>
            <span className="text-white font-medium">{orderDetails.subtotal.toFixed(2)} €</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400">Envío</span>
            <span className="text-white font-medium">{orderDetails.shipping.toFixed(2)} €</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400">Impuesto</span>
            <span className="text-white font-medium">{orderDetails.tax.toFixed(2)} €</span>
          </div>
          <hr className={`border-t border-[#3a3a3a] my-4 ${className || ""}`} />
          <div className="flex justify-between items-center mb-2">
            <span className="text-white font-bold">Total</span>
            <span className="text-[#cdaa7d] font-bold">{orderDetails.total.toFixed(2)} €</span>
          </div>
        </div>
        <div className="border-t border-[#3a3a3a] p-6 flex justify-between">
          <Button variant="outline" className="w-full">
            Ver detalles de la compra
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pago;