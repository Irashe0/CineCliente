import { Home, UserCircle, Settings, LogOut } from "lucide-react"
import { useNavigate } from "react-router-dom";


export default function Sidebar({ user, selected, onSelect }) {
  const navigate = useNavigate();

  return (
    <aside className="w-60 bg-[#1A1A1A] flex flex-col p-6">
      <div className="flex flex-col items-center mb-8">
        <UserCircle className="h-16 w-16 text-gray-500 mb-2" />
        {user && (
          <>
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-gray-400">{user.email}</p>
          </>
        )}
      </div>

      <nav className="flex-1">
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => navigate("/")}
              className={`w-full text-left flex items-center px-4 py-2 rounded-full font-semibold transition ${selected === "CineLuxe"
                  ? "bg-[#C1A362] text-black"
                  : "text-white hover:bg-[#2D2D2D]"
                }`}
            >
              <Home className="mr-3" /> CineLuxe
            </button>
          </li>
          <li>
            <button
              onClick={() => onSelect("perfil")}
              className={`w-full text-left flex items-center px-4 py-2 rounded-full font-semibold transition ${selected === "perfil"
                  ? "bg-[#C1A362] text-black"
                  : "text-white hover:bg-[#2D2D2D]"
                }`}
            >
              <UserCircle className="mr-3" /> Perfil
            </button>
          </li>
          <li>
            <button
              onClick={() => onSelect("configuracion")}
              className={`w-full text-left flex items-center px-4 py-2 rounded-full font-semibold transition ${selected === "configuracion"
                  ? "bg-[#C1A362] text-black"
                  : "text-white hover:bg-[#2D2D2D]"
                }`}
            >
              <Settings className="mr-3" /> Configuración
            </button>
          </li>
        </ul>
      </nav>

      <button
        className="mt-auto flex items-center px-4 py-2 rounded-lg text-red-400 hover:text-red-800"
        onClick={() => {
          localStorage.removeItem("user")
          localStorage.removeItem("token")
          onSelect("logout")
          navigate("/")
        }}
      >
        <LogOut className="mr-3" /> Cerrar sesión
      </button>
    </aside>
  )
}
