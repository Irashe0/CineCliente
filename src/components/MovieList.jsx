import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

export default function ListadoPeliculas() {
  const [peliculas, setPeliculas] = useState([]);

  useEffect(() => {
    const fetchPeliculasConMultimedia = async () => {
      try {
        const resPeliculas = await fetch("https://laravelcine-cine-zeocca.laravel.cloud/api/peliculas");
        const dataPeliculas = await resPeliculas.json();
        console.log("Películas cargadas:", dataPeliculas);

        const peliculasConMedia = await Promise.all(
          dataPeliculas.map(async (peli) => {
            const resMultimedia = await fetch(
              `https://laravelcine-cine-zeocca.laravel.cloud/api/multimedia?id_pelicula=${peli.id_pelicula}`
            );
            const multimedia = await resMultimedia.json();
            const multimediaFiltrada = multimedia.filter(m => m.id_pelicula === peli.id_pelicula);

            const poster = multimediaFiltrada.find((m) => m.portada)?.portada || "https://via.placeholder.com/300";
            const trailer = multimediaFiltrada.find((m) => m.trailer)?.trailer || "";

            return {
              ...peli,
              posterUrl: poster.startsWith("http") ? poster : "https://via.placeholder.com/300",
              trailerUrl: trailer,
            };
          })
        );

        setPeliculas(peliculasConMedia);
      } catch (err) {
        console.error("Error cargando películas:", err);
      }
    };

    fetchPeliculasConMultimedia();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 p-4 justify-items-center">
      {peliculas.map((peli) => (
        <MovieCard
          key={peli.id_pelicula || peli.titulo} 
          id={peli.id_pelicula}
          title={peli.titulo}
          rating={peli.rating || "N/A"}
          posterUrl={peli.posterUrl}
          trailerUrl={peli.trailerUrl}
        />
      ))}
    </div>
  );
  
}
