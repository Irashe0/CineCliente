"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

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

      // 🔹 Petición segura para obtener datos del usuario
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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-yellow-900 to-black p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 text-center">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded border border-gray-300 p-2 focus:border-red-500 focus:ring-1 focus:ring-red-500 text-black"
            />
          </div>
          
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <a href="/forgot-password" className="text-sm text-yellow-600 hover:text-red-700">
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
              className="w-full rounded border border-gray-300 p-2 focus:border-red-500 focus:ring-1 focus:ring-red-500 text-black"
            />
          </div>
          
          <div className="flex items-center mb-4">
            <input
              id="remember"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
              Recordar sesión
            </label>
          </div>

          <button type="submit" className="w-full rounded bg-yellow-600 text-white py-2 hover:bg-yellow-700">
            Iniciar Sesión
          </button>

          {error && <p className="text-red-600 text-center mt-2">{error}</p>}
        </form>
      </div>
    </div>
  )
}
