import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export default function Header() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const searchInputRef = useRef(null);
    const menuRef = useRef(null);
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [allMovies, setAllMovies] = useState([]);
    const API_URL = "https://laravelcine-cine-zeocca.laravel.cloud/api/peliculas";

    useEffect(() => {
        const fetchMovies = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(API_URL);
                const data = await response.json();
                setAllMovies(data || []);
            } catch (error) {
                console.error("Error cargando las películas:", error);
            }
            setIsLoading(false);
        };

        fetchMovies();
    }, []);

    useEffect(() => {
        if (searchQuery.trim()) {
            const filteredMovies = allMovies.filter((movie) =>
                movie.titulo.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setSearchResults(filteredMovies);
        } else {
            setSearchResults([]);
        }
    }, [searchQuery, allMovies]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
                setIsSearchOpen(false);
            }
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        navigate("/");
    };

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

                <div className="flex items-center space-x-4 relative">
                    <div className="flex items-center w-full max-w-xs">
                    <input ref={searchInputRef} type="text" placeholder="Buscar películas..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className={`${ isSearchOpen ? "relative" : "absolute" } right-10 top-0 w-64 px-2 py-1 text-sm border border-[#CDAA7D] rounded-md shadow-md focus:outline-none focus:ring focus:border-[#CDAA7D] transition-all duration- ease-in-out bg-black text-white ${ isSearchOpen ? "opacity-100 visible" : "opacity-0 w-0 invisible" }`} />

                        {/* Lupa a la derecha */}
                        <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="ml-2 p-2 hover:text-[#CDAA7D] transition-all duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>

                    {/* Mostrar resultados de búsqueda debajo del input */}
                    <div className={`absolute left-0 w-full mt-2 bg-black text-white rounded-md shadow-md max-h-60 overflow-y-auto transition-all duration-300 ease-in-out ${searchQuery && (isLoading || searchResults.length > 0) ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                        {isLoading && (
                            <p className="text-center py-2 text-[#CDAA7D]">Buscando...</p>
                        )}
                        {searchResults.length === 0 && !isLoading && searchQuery && (
                            <p className="text-center text-red-500 py-2">No se encontraron resultados</p>
                        )}
                        {searchResults.length > 0 && !isLoading && (
                            <ul>
                                {searchResults.map((item, index) => (
                                    <li key={index} className="p-2 hover:bg-[#CDAA7D] cursor-pointer flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 19l-5-5m0 0a7 7 0 110-14 7 7 0 010 14z" />
                                        </svg>
                                        {item.titulo}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="hidden lg:flex items-center space-x-4">
                        {user ? (
                            <>
                                <Link to={`/perfil/${user.id}`} className="mb-0 font-semibold text-lg text-[#CDAA7D]">
                                    {user.name}
                                </Link>

                                <button onClick={handleLogout} className="whitespace-nowrap text-white hover:text-[#CDAA7D] transition-all">Cerrar sesión</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className=" text-white hover:text-[#CDAA7D]">Iniciar Sesión</Link>
                                <Link to="/register" className="text-white hover:text-[#CDAA7D]">Registro</Link>
                            </>
                        )}
                    </div>

                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 hover:text-[#CDAA7D] transition-all duration-300">
                        ☰
                    </button>
                </div>
            </div>
        </header>
    );
}
