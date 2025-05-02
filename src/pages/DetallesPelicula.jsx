import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  const [multimedia, setMultimedia] = useState(null);
  const [movieTrailer, setMovieTrailer] = useState(null);
  const navigate = useNavigate();

  const irAReserva = () => {
    navigate("/reserva");
  };
  
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

    fetch(`https://laravelcine-cine-zeocca.laravel.cloud/api/multimedia?id_pelicula=${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Datos de multimedia recibidos:", data);
        setMultimedia(data);

        const trailer = data.find(item => item.id_pelicula === parseInt(id) && item.id_multimedia && item.trailer);
        console.log("Trailer encontrado:", trailer);

        if (trailer) {
          const trailerUrl = trailer.trailer;
          if (trailerUrl && trailerUrl.includes("youtube.com/watch?v=")) {
            const videoId = trailerUrl.split("v=")[1].split("&")[0];
            setMovieTrailer(`https://www.youtube.com/embed/${videoId}`);
          } else {
            setMovieTrailer("");
          }
        } else {
          console.log("No se encontró tráiler.");
          setMovieTrailer("");
        }
      })
      .catch((err) => {
        console.error("Error al obtener multimedia:", err);
      });
  }, [id]);

  if (loading) return <div className="text-white text-center py-10">Cargando...</div>;
  if (!movie) return <div className="text-white text-center py-10">Película no encontrada.</div>;

  const movieMultimedia = multimedia?.filter(m => m.id_pelicula === parseInt(id));
  const movieBanner = movieMultimedia?.find(m => m.banner)?.banner || banner;
  const moviePoster = movieMultimedia?.find(m => m.portada)?.portada || imagen;

  return (
    <>

      <main className="min-h-screen flex flex-col text-white bg-black">
        <Header />
        <div className="relative w-full h-[50vh] md:h-[60vh]">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10 pointer-events-none" />
          <img
            src={movieBanner}
            alt={`Banner de ${movie.titulo}`}
            className="absolute inset-0 w-full h-full object-cover z-0 rounded-t-md"
          />
          <div className="absolute bottom-0 left-0 right-0 z-20 px-4 md:px-12 pb-6">
            <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-wide text-[var(--principal)]">
              {movie.titulo}
            </h1>
          </div>
        </div>

        <section className="w-full max-w-6xl mx-auto mt-10 mb-10 px-4 py-12 bg-neutral-800 border-2 border-[#CDAA7D] rounded-lg border-opacity-50 shadow grid grid-cols-1 shadow-xl shadow shadow-neutral md:grid-cols-3 gap-12">

          <div className="md:col-span-1 flex justify-center">
            <div className="aspect-[2/3] w-full max-w-[300px] rounded-lg overflow-hidden">
              <img
                src={moviePoster}
                alt={`Póster de ${movie.titulo}`}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

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

            {movieTrailer && movieTrailer !== "" ? (
              <div className="flex justify-center">
                <div className="leading-relaxed rounded-lg overflow-hidden shadow-lg w-full max-w-[80%]">
                  <iframe
                    width="100%"
                    height="300"
                    src={movieTrailer}
                    title={`Tráiler de ${movie.titulo}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            ) : (
              <p className="text-white">Tráiler no disponible o con restricciones.</p>
            )}

            <div className="pt-8 flex justify-center">
              <Boton onClick={irAReserva} className="py-4 px-8 text-xl font-semibold">
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
