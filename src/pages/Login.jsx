"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Boton from "../components/ComponentesExternos/Boton"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState("")

  const API_URL = import.meta.env.VITE_API_URL || "https://laravelcine-cine-zeocca.laravel.cloud/api"
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (!response.ok) throw new Error(data.message || "Correo o contraseña incorrectos")

      console.log("Login exitoso:", data)
      localStorage.setItem("token", data.token)

      const userResponse = await fetch(`${API_URL}/user`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${data.token}` }
      })

      const userData = await userResponse.json()
      localStorage.setItem("user", JSON.stringify({ name: userData.name }))

      if (rememberMe) {
        localStorage.setItem("rememberMe", JSON.stringify({ email, password }))
      }

      navigate("/")

    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#1A1A2E] via-[#82642b] to-[#16213E] p-4">
      <div className="w-full max-w-md rounded-lg overflow-hidden shadow-[rgba(0,0,0,0.25)] border border-[#CDAA7D] border-opacity-50">
        <div className="bg-gradient-to-t from-[#0F0F0F] to-[#1E1E1E] p-6 flex flex-col items-center">
          <h2 className="text-2xl font-serif text-center font-bold text-[#E0E0E0] mb-3">
            Iniciar Sesión
          </h2>

          <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-[#CDAA7D] to-transparent mb-4"></div>

          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-[#E0E0E0]">
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded border border-gray-600 bg-[#232323] text-white p-2 focus:border-[#CDAA7D] focus:ring-1 focus:ring-[#CDAA7D]"
              />
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-[#E0E0E0]">
                  Contraseña
                </label>
                <a href="/forgot-password" className="text-sm text-[#CDAA7D] hover:text-[#A68256]">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
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

            <div className="flex items-center mb-4">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-[#CDAA7D] focus:ring-[#CDAA7D]"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember" className="ml-2 text-sm text-[#E0E0E0]">
                Recordar sesión
              </label>
            </div>

            <div className="w-full flex justify-center">
              <Boton className="bg-[#0077B6] hover:bg-[#005F8B] text-white font-medium py-3 px-6 rounded-md shadow-md">
                Iniciar Sesión
              </Boton>
            </div>

            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  )
}
