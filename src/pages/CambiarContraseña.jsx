"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Boton from "../components/ComponentesExternos/Boton"

export default function CambiarContraseña() {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const API_URL = import.meta.env.VITE_API_URL || "https://laravelcine-cine-zeocca.laravel.cloud/api"
  const navigate = useNavigate()

  const validarContraseña = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{6,}$/
    return regex.test(password)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!currentPassword) {
      setError("Debes ingresar tu contraseña actual")
      return
    }

    if (newPassword === currentPassword) {
      setError("La nueva contraseña no puede ser igual a la anterior")
      return
    }

    if (!validarContraseña(newPassword)) {
      setError("La nueva contraseña debe tener al menos 6 caracteres, incluir una mayúscula, un número y un carácter especial")
      return
    }

    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden")
      return
    }

    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${API_URL}/change-password`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ currentPassword, newPassword })
      })

      const data = await response.json()

      if (!response.ok) throw new Error(data.message || "Error al cambiar la contraseña")

      setSuccess("Contraseña actualizada exitosamente")
      navigate("/")

    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#1A1A2E] via-[#82642b] to-[#1A1A2E] p-4">
      <div className="w-full max-w-md rounded-lg overflow-hidden shadow-[rgba(0,0,0,0.25)] border border-[#CDAA7D] border-opacity-50">
        <div className="bg-gradient-to-t from-[#0F0F0F] to-[#1E1E1E] p-6 flex flex-col items-center">
          <h2 className="text-2xl font-serif text-center font-bold text-[#E0E0E0] mb-3">
            Cambiar Contraseña
          </h2>

          <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-[#CDAA7D] to-transparent mb-4"></div>

          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-4">
              <label htmlFor="currentPassword" className="block text-sm font-medium text-[#E0E0E0]">
                Contraseña actual
              </label>
              <input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                className="w-full rounded border border-gray-600 bg-[#232323] text-white p-2 focus:border-[#CDAA7D] focus:ring-1 focus:ring-[#CDAA7D]"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="newPassword" className="block text-sm font-medium text-[#E0E0E0]">
                Nueva contraseña
              </label>
              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full rounded border border-gray-600 bg-[#232323] text-white p-2 focus:border-[#CDAA7D] focus:ring-1 focus:ring-[#CDAA7D]"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#E0E0E0]">
                Confirmar nueva contraseña
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full rounded border border-gray-600 bg-[#232323] text-white p-2 focus:border-[#CDAA7D] focus:ring-1 focus:ring-[#CDAA7D]"
              />
            </div>

            <div className="w-full flex justify-center">
              <Boton className="bg-[#0077B6] hover:bg-[#005F8B] text-white font-medium py-3 px-6 rounded-md shadow-md">
                Cambiar Contraseña
              </Boton>
            </div>

            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
            {success && <p className="text-green-500 text-center mt-2">{success}</p>}
          </form>
        </div>
      </div>
    </div>
  )
}
