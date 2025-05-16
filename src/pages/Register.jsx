"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"
import Boton from "../components/ComponentesExternos/Boton"
import Header from "../components/Header"
import Footer from "../components/Footer"


export default function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)

  const API_URL = import.meta.env.VITE_API_URL || "https://laravelcine-cine-zeocca.laravel.cloud/api"
  const navigate = useNavigate()

  const validarContraseña = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{6,}$/
    return regex.test(password)
  }

  const sanitizarEntrada = (input) => {
    return input.replace(/[<>]/g, "")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    const sanitizedName = sanitizarEntrada(name)
    const sanitizedEmail = sanitizarEntrada(email)
    const sanitizedPassword = sanitizarEntrada(password)
    const sanitizedPasswordConfirmation = sanitizarEntrada(passwordConfirmation)

    if (!validarContraseña(sanitizedPassword)) {
      setError("La contraseña debe tener al menos 6 caracteres, incluir una mayúscula, un número y un carácter especial.")
      return
    }

    if (sanitizedPassword !== sanitizedPasswordConfirmation) {
      setError("Las contraseñas no coinciden.")
      return
    }

    try {
      console.log("Verificando si el nombre de usuario ya existe...")
      const checkResponse = await fetch(`${API_URL}/check-username`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: sanitizedName })
      })

      if (!checkResponse.ok) {
        throw new Error("Error al verificar el nombre de usuario.")
      }

      const checkData = await checkResponse.json()
      console.log("Respuesta de verificación:", checkData)

      if (checkData.exists) {
        setError("El nombre de usuario ya está en uso.")
        return
      }

      console.log("Enviando datos de registro...")
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: sanitizedName,
          email: sanitizedEmail,
          password: sanitizedPassword,
          password_confirmation: sanitizedPasswordConfirmation
        }),
      })

      if (!response.ok) {
        throw new Error("Error en el registro.")
      }

      const data = await response.json()
      console.log("Respuesta de la API de registro:", data)

      setSuccess("Registro exitoso. Ahora puedes iniciar sesión.")
      setTimeout(() => navigate("/login"), 2000)

    } catch (err) {
      console.error("Error en el registro:", err.message)
      setError(`Hubo un problema con el registro: ${err.message}`)
    }
  };

  return (
    <>
      <Header />
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md rounded-lg overflow-hidden shadow-[rgba(0,0,0,0.25)] border border-[#CDAA7D] border-opacity-50">
          <div className="bg-gradient-to-t from-[#0F0F0F] to-[#1E1E1E] p-6 flex flex-col items-center">
            <h2 className="text-2xl font-serif text-center font-bold text-[#E0E0E0] mb-3">
              Registro
            </h2>

            <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-[#CDAA7D] to-transparent mb-4"></div>

            <form onSubmit={handleSubmit} className="w-full">
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-[#E0E0E0]">
                  Nombre
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Ejemplo: Nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className={`w-full rounded border ${error.includes("nombre") ? "border-red-500" : "border-gray-600"} bg-[#232323] text-white p-2 focus:border-[#CDAA7D] focus:ring-1 focus:ring-[#CDAA7D]`}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-[#E0E0E0]">
                  Correo electrónico
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="email@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={`w-full rounded border ${error.includes("correo") ? "border-red-500" : "border-gray-600"} bg-[#232323] text-white p-2 focus:border-[#CDAA7D] focus:ring-1 focus:ring-[#CDAA7D]`}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-[#E0E0E0]">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={`w-full rounded border ${error.includes("contraseña") ? "border-red-500" : "border-gray-600"} bg-[#232323] text-white p-2 focus:border-[#CDAA7D] focus:ring-1 focus:ring-[#CDAA7D]`}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Eye /> : <EyeOff />}
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="passwordConfirmation" className="block text-sm font-medium text-[#E0E0E0]">
                  Confirmar contraseña
                </label>
                <div className="relative">
                  <input
                    id="passwordConfirmation"
                    type={showPasswordConfirmation ? "text" : "password"}
                    placeholder="********"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    required
                    className={`w-full rounded border ${error.includes("contraseña") ? "border-red-500" : "border-gray-600"} bg-[#232323] text-white p-2 focus:border-[#CDAA7D] focus:ring-1 focus:ring-[#CDAA7D]`}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white"
                    onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                  >
                    {showPasswordConfirmation ? <Eye /> : <EyeOff />}
                  </button>
                </div>
              </div>

              <div className="w-full flex justify-center">
                <Boton className="bg-[#0077B6] hover:bg-[#005F8B] text-white font-medium py-3 px-6 rounded-md shadow-md">
                  Registrarse
                </Boton>
              </div>

              {error && <p className="text-red-500 text-center mt-2">{error}</p>}
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
