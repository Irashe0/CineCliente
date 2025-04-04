"use client"

import { useState, useEffect, useRef } from "react"

export default function Navbar() {
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const searchInputRef = useRef(null)
    const menuRef = useRef(null)

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

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-[#778899] to-transparent dark:from-black dark:to-transparent">
            <div className="container mx-auto flex justify-between items-center h-16 px-4 sm:px-6">

                {/* Logo */}
                <a href="/" className="text-2xl font-bold text-white hover:text-[var(--principal)]">
                    CineLuxe
                </a>

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

                    {/* Login dentro del menú */}
                    <a href="/login" className="text-white hover:text-[var(--principal)] py-2 px-4 lg:hidden">
                        Login
                    </a>

                    <a href="/register" className="text-white hover:text-[var(--principal)] py-2 px-4 lg:hidden">
                        Registro
                    </a>
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
                    <a href="/login" className="hidden lg:inline-block text-white hover:text-[var(--principal)]">
                        Iniciar Sesión
                    </a>
                    <a href="/register" className="hidden lg:inline-block text-white hover:text-[var(--principal)]">
                        Registro
                    </a>


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
