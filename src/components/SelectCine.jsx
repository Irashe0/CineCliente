"use client"

import { useEffect, useState } from "react"
import CinesCard from "./CineCardReserva"

export default function CinesList() {
    const [cines, setCines] = useState([])

    useEffect(() => {
        const fetchCines = async () => {
            try {
                const res = await fetch("https://laravelcine-cine-zeocca.laravel.cloud/api/cines")
                const data = await res.json()
                console.log("Cines cargados:", data)
                setCines(data)
            } catch (err) {
                console.error("Error al obtener la lista de cines:", err)
            }
        }

        fetchCines()
    }, [])

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-20 justify-items-center">
            {Array.isArray(cines) && cines.map((cine) => (
                cine?.id_cine && (
                    <CinesCard
                        key={cine.id_cine}
                        id={cine.id_cine}
                        nombre={cine.nombre}
                        ubicacion={cine.direccion}
                        telefono={cine.telefono}
                    />
                )
            ))}
        </div>
    )
}
