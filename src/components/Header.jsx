import { useState, useRef, useEffect } from "react"
import { Search, X } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState(null)
  const searchInputRef = useRef(null)
  const menuRef = useRef(null)
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [allMovies, setAllMovies] = useState([])
  const API_URL = "https://laravelcine-cine-zeocca.laravel.cloud/api/peliculas"

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(API_URL)
        const data = await response.json()
        setAllMovies(data || [])
      } catch (error) {
        console.error("Error cargando las películas:", error)
      }
      setIsLoading(false)
    }
    fetchMovies()
  }, [])

  useEffect(() => {
    if (searchQuery.trim()) {
      const filteredMovies = allMovies.filter((movie) =>
        movie.titulo.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setSearchResults(filteredMovies)
    } else {
      setSearchResults([])
    }
  }, [searchQuery, allMovies])

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

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
    if (isSearchOpen) {
      setSearchQuery("")
      setSearchResults([])
    }
  }

  return (
    <div>
      <header className="fixed top-0 left-0 w-full h-30 bg-gradient-to-b from-[#778899] to-transparent dark:from-black dark:to-transparent text-white shadow-[rgba(0,0,0,0.25)] z-10 flex items-center">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-[var(--principal)]">
            CineLuxe
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/cines"
              className="text-white hover:text-[var(--principal)] transition-colors"
            >
              Cines
            </Link>
            <Link
              to="/cartelera"
              className="text-white hover:text-[var(--principal)] transition-colors"
            >
              Cartelera
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSearch}
              className="p-2 rounded-full hover:bg-[var(--principal)] transition-colors"
              aria-label="Buscar"
            >
              {isSearchOpen ? <X size={20} /> : <Search size={20} />}
            </button>

            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  to={`/perfil/${user.id}`}
                  className="text-lg font-semibold text-[#CDAA7D]"
                >
                  {user.name}
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-[#CDAA7D] py-2 px-4 transition-all"
                >
                  Cerrar sesión
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-white hover:text-[#CDAA7D] py-2 px-4"
                >
                  Iniciar sesión
                </Link>
                <Link
                  to="/register"
                  className="text-white hover:text-[#CDAA7D] py-2 px-4"
                >
                  Registro
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      <div
        className={`absolute left-0 top-16 w-full transition-all duration-300 overflow-hidden z-10 ${
          isSearchOpen ? "max-h-[500px] py-4" : "max-h-0"
        }`}
      >
        <div className="container mx-auto px-4">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Buscar películas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 bg-[var(--gris-oscuro)] text-[var(--texto-claro)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--principal)]"
            autoFocus={isSearchOpen}
          />

          {isLoading && <p className="text-[var(--texto-claro)] mt-2">Cargando...</p>}

          {searchResults.length > 0 && (
            <div className="mt-4 rounded-lg overflow-hidden ">
              <ul className="divide-y divide-[var(--color-borde)]">
                {searchResults.map((movie) => (
                  <li
                    key={movie.id}
                    className="p-3 hover:bg-[var(--principal)] transition-colors"
                  >
                    <Link to={`/pelicula/${movie.id}`} className="block">
                      <span className="font-medium text-[var(--texto-claro)]">{movie.titulo}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {searchQuery && searchResults.length === 0 && !isLoading && (
            <div className="mt-4 p-4 rounded-lg text-[var(--texto-claro)]">
              No se encontraron resultados para "{searchQuery}"
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
