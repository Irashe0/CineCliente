"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Boton from "../components/ComponentesExternos/Boton"

export default function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [error, setError] = useState("")

  const API_URL = import.meta.env.VITE_API_URL || "https://laravelcine-cine-zeocca.laravel.cloud/api"
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
  
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, password_confirmation: passwordConfirmation })
      })
  
      const data = await response.json()
  
      if (!response.ok) {
        if (data.errors) {
          if (data.errors.email) throw new Error("El correo electrónico ya está registrado.")
          if (data.errors.name) throw new Error("El nombre de usuario ya está en uso.")
          if (data.errors.password) throw new Error("Las contraseñas no coinciden.")
        }
        throw new Error(data.message || "Error en el registro")
      }

      navigate("/login")

    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#1A1A2E] via-[#82642b] to-[#16213E] p-4">
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
                className="w-full rounded border border-gray-600 bg-[#232323] text-white p-2 focus:border-[#CDAA7D] focus:ring-1 focus:ring-[#CDAA7D]"
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
                className="w-full rounded border border-gray-600 bg-[#232323] text-white p-2 focus:border-[#CDAA7D] focus:ring-1 focus:ring-[#CDAA7D]"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-[#E0E0E0]">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded border border-gray-600 bg-[#232323] text-white p-2 focus:border-[#CDAA7D] focus:ring-1 focus:ring-[#CDAA7D]"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="passwordConfirmation" className="block text-sm font-medium text-[#E0E0E0]">
                Confirmar contraseña
              </label>
              <input
                id="passwordConfirmation"
                type="password"
                placeholder="********"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                required
                className="w-full rounded border border-gray-600 bg-[#232323] text-white p-2 focus:border-[#CDAA7D] focus:ring-1 focus:ring-[#CDAA7D]"
              />
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
  )
}
