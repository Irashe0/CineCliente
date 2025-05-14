"use client"

import { Home, UserCircle, Settings, LogOut, Ticket } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function Sidebar({ user, selected, onSelect }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")

    onSelect("logout")
    navigate("/")
  }

  return (
    <aside className="flex flex-col p-6 h-full justify-center lg:justify-start">
      <div className="flex flex-col items-center">
        <UserCircle className="h-16 w-16 text-gray-500 mb-2" />
        {user && (
          <>
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-gray-400">{user.email}</p>
          </>
        )}
      </div>

      <nav className="flex-1">
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => navigate("/")}
              className={`w-full text-left flex items-center px-4 py-3 rounded-full font-semibold transition ${
                selected === "CineLuxe" ? "bg-[#C1A362] text-black" : "text-white hover:bg-[#2D2D2D]"
              }`}
            >
              <Home className="mr-3" /> CineLuxe
            </button>
          </li>
          <li>
            <button
              onClick={() => onSelect("perfil")}
              className={`w-full text-left flex items-center px-4 py-3 rounded-full font-semibold transition ${
                selected === "perfil" ? "bg-[#C1A362] text-black" : "text-white hover:bg-[#2D2D2D]"
              }`}
            >
              <UserCircle className="mr-3" /> Perfil
            </button>
          </li>
          <li>
            <button
              onClick={() => onSelect("configuracion")}
              className={`w-full text-left flex items-center px-4 py-3 rounded-full font-semibold transition ${
                selected === "configuracion" ? "bg-[#C1A362] text-black" : "text-white hover:bg-[#2D2D2D]"
              }`}
            >
              <Settings className="mr-3" /> Configuración
            </button>
          </li>
                    <li>
            <button
              onClick={() => onSelect("configuracion")}
              className={`w-full text-left flex items-center px-4 py-3 rounded-full font-semibold transition ${
                selected === "reservas" ? "bg-[#C1A362] text-black" : "text-white hover:bg-[#2D2D2D]"
              }`}
            >
              <Ticket className="mr-3" /> Mis reservas
            </button>
          </li>
        </ul>
      </nav>

      <button
        className="mt-auto flex items-center px-4 py-3 rounded-lg text-red-400 hover:text-red-800"
        onClick={handleLogout}
      >
        <LogOut className="mr-2" /> Cerrar sesión
      </button>
    </aside>
  )
}
