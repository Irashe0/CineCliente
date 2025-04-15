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
        <header className="fixed top-0 left-0 w-full text-lg z-50 bg-gradient-to-b from-[#778899] to-transparent dark:from-black dark:to-transparent text-white shadow-[rgba(0,0,0,0.25)]">
            <div className="container mx-auto flex justify-between items-center h-16 px-4 sm:px-6">
                <Link to="/" className="text-2xl font-bold text-[#CDAA7D] hover:text-[#CDAA7D]">
                    CineLuxe
                </Link>

                <nav
                    ref={menuRef}
                    className={`${isMenuOpen ? "flex flex-col absolute top-24 left-0 w-full bg-black bg-opacity-40 items-center justify-center transition-all duration-300 ease-in-out shadow-lg" : "hidden"} lg:flex lg:flex-row lg:items-center lg:space-x-6 lg:static lg:w-auto lg:bg-transparent lg:backdrop-none`}
                >
                    {["Cines", "Cartelera"].map((item) => (
                        <a key={item} href="#" className="relative text-white  hover:text-[#CDAA7D] group py-2 px-4">
                            {item}
                            <span className="absolute bottom-[-12px] left-0 block w-0 h-[2px] bg-[#CDAA7D] transition-all duration-300 group-hover:w-full"></span>
                        </a>
                    ))}
                    <div className="flex flex-col items-center lg:hidden">
                        {user ? (
                            <>
                                <Link to={`/perfil/${user.id}`} className="mb-0 font-semibold text-lg text-[#CDAA7D]">
                                    {user.name}
                                </Link>

                                <button onClick={handleLogout} className=" text-white hover:text-[#CDAA7D] py-2 px-4 transition-all">
                                    Cerrar sesión
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-white hover:text-[#CDAA7D] py-2 px-4">Iniciar Sesión</Link>
                                <Link to="/register" className=" text-white  hover:text-[#CDAA7D] py-2 px-4">Registro</Link>
                            </>
                        )}
                    </div>
                </nav>

                <div className="flex items-center space-x-4">
                    <div className="relative" ref={searchInputRef}>
                        <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="p-2 hover:text-[#CDAA7D] transition-all duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                        <input type="text" placeholder="Buscar películas..." className={`absolute top-1 right-9 -translate-y-[30%] mt-2 px-2 py-1 text-sm border border-[#CDAA7D] rounded-md shadow-md focus:outline-none focus:ring focus:border-[#CDAA7D] transition-all duration-500 ease-in-out bg-black text-white ${isSearchOpen ? "w-20 sm:w-80 opacity-100" : "w-0 opacity-0"}`} />
                    </div>
                    <div className="hidden lg:flex items-center space-x-4">
                        {user ? (
                            <>
                                <Link to={`/perfil/${user.id}`} className="mb-0 font-semibold text-lg text-[#CDAA7D]">
                                    {user.name}
                                </Link>

                                <button onClick={handleLogout} className="text-white  hover:text-[#CDAA7D] transition-all">Cerrar sesión</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className=" text-white  hover:text-[#CDAA7D]">Iniciar Sesión</Link>
                                <Link to="/register" className="text-white  hover:text-[#CDAA7D]">Registro</Link>
                            </>
                        )}
                    </div>

                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 hover:text-[#CDAA7D] transition-all duration-300">
                        ☰
                    </button>
                </div>
            </div>
        </header>



    )
}
