"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import Perfil from "../components/DashboardPerfil"
import Configuracion from "../components/DashboardConfiguracion"

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState("perfil")
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const stored = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");

        if (!stored || !token) {
          navigate("/login");
          return;
        }

        const res = await fetch(`https://laravelcine-cine-zeocca.laravel.cloud/api/usuarios/${stored.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!res.ok) throw new Error('No se pudo cargar la información del usuario.');

        const data = await res.json();
        setUser(data);
      } catch (err) {
        setError("No se pudo cargar la información del usuario.");
      } finally {
        setLoading(false); 
      }
    };

    fetchUser();
  }, [navigate]);

  if (error) return <div className="text-red-500 p-6">{error}</div>
  if (!user) return <div className="p-6 text-white">Cargando...</div>

  const handleSelect = (sel) => {
    if (sel === "logout") return navigate("/login")
    setPage(sel)
  }

  return (
    <div className="flex min-h-screen bg-[#0F0F0F] text-[#E0E0E0]">
      <Sidebar user={user} selected={page} onSelect={handleSelect} />

      <main className="flex-1 p-8 overflow-auto">
        {page === "perfil" && <Perfil user={user} />}
        {page === "configuracion" && <Configuracion user={user} />}
      </main>
    </div>
  )
}
