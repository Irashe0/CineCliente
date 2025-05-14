"use client"

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function DashboardConfiguracion({ user }) {
  const [activeTab, setActiveTab] = useState("password");
  const [showCur, setShowCur] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConf, setShowConf] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newEmail, setNewEmail] = useState(user.email || "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const API_URL = import.meta.env.VITE_API_URL || "https://laravelcine-cine-zeocca.laravel.cloud/api";
  const navigate = useNavigate();

  const validarContraseña = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{6,}$/;
    return regex.test(password);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!currentPassword) {
      setError("Debes ingresar tu contraseña actual.");
      return;
    }

    if (newPassword === currentPassword) {
      setError("La nueva contraseña no puede ser igual a la anterior.");
      return;
    }

    if (!validarContraseña(newPassword)) {
      setError("La nueva contraseña debe tener al menos 6 caracteres, incluir una mayúscula, un número y un carácter especial.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/usuarios/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ password: newPassword })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Error al actualizar la contraseña.");

      setSuccess("Contraseña actualizada exitosamente.");
      setTimeout(() => setSuccess(""), 2000);

    } catch (err) {
      setError(err.message);
    }
  };

  const handleEmailChange = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!newEmail) {
      setError("El correo no puede estar vacío.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/usuarios/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ email: newEmail })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Error al actualizar el correo.");

      setSuccess("Correo actualizado exitosamente.");
      setTimeout(() => setSuccess(""), 2000);

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center">Configuración</h2>

      <div className="flex border-b border-gray-700 mb-6 text-sm sm:text-base">
        <button
          className={`p-3 flex-1 text-center font-semibold ${
            activeTab === "password" ? "text-[var(--principal)] border-b-2 border-[var(--principal)]" : "text-gray-400"
          }`}
          onClick={() => {
            setActiveTab("password");
            setError("");
            setSuccess("");
          }}
        >
          Cambiar Contraseña
        </button>
        <button
          className={`p-3 flex-1 text-center font-semibold ${
            activeTab === "email" ? "text-[var(--principal)] border-b-2 border-[var(--principal)]" : "text-gray-400"
          }`}
          onClick={() => {
            setActiveTab("email");
            setError("");
            setSuccess("");
          }}
        >
          Cambiar Correo
        </button>
      </div>

      <div className="bg-[#1A1A1A] p-6 rounded-lg border border-gray-700 space-y-6 w-full max-w-xl mx-auto px-4 sm:px-6">
        {activeTab === "password" && (
          <form onSubmit={handlePasswordChange} className="space-y-5">
            <div className="relative">
              <label className="block text-lg mb-1">Contraseña Actual</label>
              <input
                type={showCur ? "text" : "password"}
                className="w-full p-2 bg-[#121212] border border-gray-700 rounded"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-2 top-8"
                onClick={() => setShowCur(!showCur)}
              >
                {showCur ? <Eye /> : <EyeOff />}
              </button>
            </div>

            <div className="relative">
              <label className="block text-lg mb-1">Nueva Contraseña</label>
              <input
                type={showNew ? "text" : "password"}
                className="w-full p-2 bg-[#121212] border border-gray-700 rounded"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-2 top-8"
                onClick={() => setShowNew(!showNew)}
              >
                {showNew ? <Eye /> : <EyeOff />}
              </button>
            </div>

            <div className="relative">
              <label className="block text-lg mb-1">Confirmar Nueva Contraseña</label>
              <input
                type={showConf ? "text" : "password"}
                className="w-full p-2 bg-[#121212] border border-gray-700 rounded"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-2 top-8"
                onClick={() => setShowConf(!showConf)}
              >
                {showConf ? <Eye /> : <EyeOff />}
              </button>
            </div>

            {error && <p className="text-red-500 text-center">{error}</p>}
            {success && <p className="text-green-500 text-center">{success}</p>}

            <button type="submit" className="w-full bg-[var(--principal)] text-black px-4 py-2 rounded font-semibold hover:bg-opacity-80">
              Actualizar Contraseña
            </button>
          </form>
        )}

        {activeTab === "email" && (
          <form onSubmit={handleEmailChange} className="space-y-4">
            <div>
              <label className="block text-lg mb-1">Correo Nuevo</label>
              <input
                type="email"
                className="w-full p-2 bg-[#121212] border border-gray-700 rounded"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                required
              />
            </div>

            {error && <p className="text-red-500 text-center">{error}</p>}
            {success && <p className="text-green-500 text-center">{success}</p>}

            <button type="submit" className="w-full bg-[var(--principal)] text-black px-4 py-2 rounded font-semibold hover:bg-opacity-80">
              Guardar Correo
            </button>
          </form>
        )}
      </div>
    </>
  );
}
