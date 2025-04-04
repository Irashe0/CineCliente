"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

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
    console.log("Inicio de función handleSubmit");
  
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, password_confirmation: passwordConfirmation })
      })
  
      console.log("Solicitud enviada a API... esperando respuesta");
      const data = await response.json()
      console.log("Respuesta del servidor:", data);
  
      if (!response.ok) {
        if (data.errors) {
          if (data.errors.email) {
            throw new Error("El correo electrónico ya está registrado.")
          }
          if (data.errors.name) {
            throw new Error("El nombre de usuario ya está en uso.")
          }
          if (data.errors.password) {
            throw new Error("Las contraseñas no coinciden.")
          }
        }
        throw new Error(data.message || "Error en el registro")
      }
  
      console.log("Registro exitoso:", data);
  
      console.log("Redirigiendo al login...");
      navigate("/login") // 🔹 En lugar de generar un token, simplemente lo enviamos al login
  
    } catch (err) {
      console.error("Error durante el registro:", err.message);
      setError(err.message)
    }
  }
  

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-yellow-900 to-black p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 text-center">Registro</h2>
        <form onSubmit={handleSubmit} className="mt-4">

          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              id="name"
              type="text"
              placeholder="Ejemplo: Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded border border-gray-300 p-2 focus:border-red-500 focus:ring-1 focus:ring-red-500 text-black"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              placeholder="email@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded border border-gray-300 p-2 focus:border-red-500 focus:ring-1 focus:ring-red-500 text-black"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
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

          <div className="mb-4">
            <label htmlFor="passwordConfirmation" className="block text-sm font-medium text-gray-700">
              Confirmar contraseña
            </label>
            <input
              id="passwordConfirmation"
              type="password"
              placeholder="********"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required
              className="w-full rounded border border-gray-300 p-2 focus:border-red-500 focus:ring-1 focus:ring-red-500 text-black"
            />
          </div>

          <button type="submit" className="w-full rounded bg-yellow-600 text-white py-2 hover:bg-yellow-700">
            Registrarse
          </button>

          {error && <p className="text-red-600 text-center mt-2">{error}</p>}
        </form>
      </div>
    </div>
  )
}
