import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Clock } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Boton from "../components/ComponentesExternos/Boton";
import imagen from "../assets/PlaceHolder.webp";
import banner from "../assets/Banner1.jpg";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://laravelcine-cine-zeocca.laravel.cloud/api/peliculas/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al obtener detalles:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-white text-center py-10">Cargando...</div>;
  if (!movie) return <div className="text-white text-center py-10">Película no encontrada.</div>;

  return (
    <>
      <Header className="fixed top-0 left-0 w-full z-50" />
      <main className="min-h-screen flex flex-col bg-[var(--gris-oscuro)] text-white">
        {/* Hero */}
        <div className="relative w-full h-[50vh] md:h-[60vh]">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10 pointer-events-none" />
          <img
            src={banner}
            alt={`Banner de ${movie.titulo}`}
            className="absolute inset-0 w-full h-full object-cover z-0]"
          />
          <div className="absolute bottom-0 left-0 right-0 z-20 px-4 md:px-12 pb-6">
            <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-wide text-[var(--principal)]">
              {movie.titulo}
            </h1>

          </div>
        </div>

        {/* Detalles */}
        <section className="w-full max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Poster */}
          <div className="md:col-span-1 flex justify-center">
            <div className="aspect-[2/3] w-full max-w-[300px] rounded-md bg-neutral-800 overflow-hidden">
              <img
                src={imagen}
                alt={`Póster de ${movie.titulo}`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Info */}
          <div className="md:col-span-2 space-y-6 text-sm md:text-base">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h2 className="text-[var(--principal)] uppercase font-semibold">Director</h2>
                <p>{movie.director?.nombre} {movie.director?.apellidos}</p>
              </div>
              <div>
                <h2 className="text-[var(--principal)] uppercase font-semibold">Duración</h2>
                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {movie.duracion}
                </p>
              </div>
              <div>
                <h2 className="text-[var(--principal)] uppercase font-semibold">Clasificación</h2>
                <p>{movie.clasificacion}</p>
              </div>
              <div>
                <h2 className="text-[var(--principal)] uppercase font-semibold">Productora</h2>
                <p>{movie.productora}</p>
              </div>
            </div>

            <div>
              <h2 className="text-[var(--principal)] uppercase font-semibold mb-2">Sinopsis</h2>
              <p className="leading-relaxed">{movie.sinopsis}</p>
            </div>

            <div className="pt-4">
              <Boton>
                Comprar entradas
              </Boton>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
