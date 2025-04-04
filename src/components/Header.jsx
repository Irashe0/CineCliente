import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect, useRef } from "react"

export default function Header() {
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [user, setUser] = useState(null)
    const searchInputRef = useRef(null)
    const menuRef = useRef(null)
    const navigate = useNavigate()

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
                setIsSearchOpen(false)
            }
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"))
        if (storedUser) {
            setUser(storedUser)
        }
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUser(null)
        navigate("/")
    }

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-[#778899] to-transparent dark:from-black dark:to-transparent">
            <div className="container mx-auto flex justify-between items-center h-16 px-4 sm:px-6">

                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-white hover:text-[var(--principal)]">
                    CineLuxe
                </Link>

                {/* MENU RESPONSIVE */}
                <nav
                    ref={menuRef}
                    className={`${isMenuOpen
                        ? "flex flex-col absolute top-24 left-0 w-full bg-black bg-opacity-40 items-center justify-center transition-all duration-300 ease-in-out shadow-lg"
                        : "hidden"
                        } lg:flex lg:flex-row lg:items-center lg:space-x-6 lg:static lg:w-auto lg:bg-transparent lg:backdrop-none`}
                >
                    {["Cines", "Cartelera"].map((item) => (
                        <a
                            key={item}
                            href="#"
                            className="relative text-white hover:text-[var(--principal)] group py-2 px-4"
                        >
                            {item}
                            <span className="absolute bottom-[-12px] left-0 block w-0 h-[2px] bg-[var(--principal)] transition-all duration-300 group-hover:w-full"></span>
                        </a>
                    ))}

                    {/* Usuario en menú móvil */}
                    <div className="flex flex-col items-center lg:hidden">
                        {user ? (
                            <>
                                <p className="text-white py-2 px-4"><span className="font-semibold text-[var(--principal)]">{user.name}</span></p>
                                <button
                                    onClick={handleLogout}
                                    className="text-white hover:text-[var(--principal)] py-2 px-4 transition-all"
                                >
                                    Cerrar sesión
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-white hover:text-[var(--principal)] py-2 px-4">
                                    Iniciar Sesión
                                </Link>
                                <Link to="/register" className="text-white hover:text-[var(--principal)] py-2 px-4">
                                    Registro
                                </Link>
                            </>
                        )}
                    </div>
                </nav>

                {/* Barra de búsqueda y Login en escritorio */}
                <div className="flex items-center space-x-4">
                    {/* Barra de búsqueda */}
                    <div className="relative" ref={searchInputRef}>
                        <button
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className="p-2 text-white hover:text-[var(--principal)] transition-all duration-300"
                            aria-label="Alternar búsqueda"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </button>

                        {/* Campo de búsqueda que se expande */}
                        <input
                            type="text"
                            placeholder="Buscar películas..."
                            className={`absolute top-1 right-0 -translate-y-[30%] mt-2 px-2 py-1 text-sm border border-[var(--principal)] rounded-md shadow-md focus:outline-none focus:ring focus:border-[var(--principal)] transition-all duration-500 ease-in-out bg-black text-white ${isSearchOpen ? "w-48 sm:w-72 opacity-100" : "w-0 opacity-0"}`}
                        />
                    </div>

                    {/* Login en escritorio */}
                    <div className="hidden lg:flex items-center space-x-4">
                        {user ? (
                            <>
                                <p className="text-white mb-0"><span className="font-semibold text-[var(--principal)]">{user.name}</span></p>
                                <button
                                    onClick={handleLogout}
                                    className="text-white hover:text-[var(--principal)] transition-all"
                                >
                                    Cerrar sesión
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-white hover:text-[var(--principal)]">
                                    Iniciar Sesión
                                </Link>
                                <Link to="/register" className="text-white hover:text-[var(--principal)]">
                                    Registro
                                </Link>
                            </>
                        )}
                    </div>


                    {/* Botón para alternar el menú móvil */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden p-2 text-white hover:text-[var(--principal)] transition-all duration-300"
                        aria-label="Alternar menú"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    )
}
