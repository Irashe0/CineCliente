"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import Perfil from "../components/DashboardPerfil"
import Configuracion from "../components/DashboardConfiguracion"
import Reservas from "../components/MisReservas"
import MisEntradas from "../components/MisEntradas"
import Footer from "../components/Footer"
import { AlignJustify, X } from "lucide-react"

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState("perfil")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const stored = JSON.parse(localStorage.getItem("user"))
        const token = localStorage.getItem("token")

        if (!stored || !token) {
          navigate("/login")
          return
        }

        const res = await fetch(`https://laravelcine-cine-zeocca.laravel.cloud/api/usuarios/${stored.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (!res.ok) throw new Error("No se pudo cargar la información del usuario.")

        const data = await res.json()
        setUser(data)
      } catch (err) {
        setError("No se pudo cargar la información del usuario.")
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [navigate])

  if (error) return <div className="text-red-500 p-6">{error}</div>
  if (!user) return <div className="p-6 text-white">Cargando...</div>

  const handleSelect = (sel) => {
    if (sel === "logout") return navigate("/login")
    setPage(sel)
    setIsSidebarOpen(false)
  }

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  return (
    <div className="grid min-h-screen bg-[#0F0F0F] text-[#E0E0E0] 
  grid-cols-1 lg:grid-cols-[250px_1fr] grid-rows-[auto_1fr_auto]">

      <button className="lg:hidden fixed top-4 left-4 z-30 text-white" onClick={toggleSidebar}>
        {isSidebarOpen ? <X size={32} /> : <AlignJustify size={32} />}
      </button>

      {isSidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden" onClick={toggleSidebar} />}

      <div className={` row-span-2 transition-all duration-300 ease-in-out z-20  ${isSidebarOpen ? "fixed inset-y-0 left-0 w-64 h-screen bg-[#1A1A1A]" : "w-0 h-0 overflow-hidden"} lg:w-60 lg:h-auto lg:static`}>
        <Sidebar user={user} selected={page} onSelect={handleSelect} />
      </div>

      <main className="p-8 overflow-auto flex-grow">
        {page === "perfil" && <Perfil user={user} />}
        {page === "configuracion" && <Configuracion user={user} />}
        {page === "reservas" && <Reservas user={user} />}
        {page === "entradas" && <MisEntradas user={user} />}
      </main>

      <Footer className="col-span-2" />
    </div>

  )
}
