import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CinemaLuxeBackground from "../components/ComponentesExternos/bg";

export default function AboutUs() {
  return (
    <CinemaLuxeBackground className="relative min-h-screen flex flex-col">
      {/* Header */}
      <Header className="fixed top-0 left-0 w-full z-50" />

      {/* Contenido principal */}
      <div className="flex flex-grow items-center justify-center p-4 relative z-10">
        <div className="absolute top-6 left-0 right-0 mt-40 text-center">
          <Link to="/" className="text-4xl font-bold text-[#CDAA7D] hover:text-[#E6CBA8] transition-colors duration-300">
            CineLuxe
          </Link>
        </div>

        <div className="w-full max-w-2xl mt-60 mb-20 rounded-lg overflow-hidden shadow-[rgba(0,0,0,0.25)] border border-[#CDAA7D] border-opacity-50">
          <div className="bg-gradient-to-t from-[#0F0F0F] to-[#1E1E1E] p-8 flex flex-col items-center">
            <h2 className="text-3xl font-serif font-bold text-[#E0E0E0] mb-3">
              Sobre Nosotros
            </h2>
            <h6>Vive una experiencia de lujo al estilo madrileño</h6>
            <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-[#CDAA7D] to-transparent mb-6"></div>

            <p className="text-[#E0E0E0] text-center leading-relaxed">
              En <span className="text-[#CDAA7D] font-semibold">CineLuxe</span>, celebramos la magia del cine.
              Nuestro objetivo es brindar una experiencia cinematográfica única, donde cada película se vive
              como una obra de arte. Nos apasiona el séptimo arte y trabajamos cada día para hacer que el cine sea
              accesible, emocionante y envolvente.
            </p>

            <div className="mt-8">
              <h3 className="text-2xl font-serif font-bold text-[#CDAA7D] mb-3">Nuestro equipo</h3>
              <p className="text-[#E0E0E0]">
                CineLuxe está compuesto por cineastas, críticos, diseñadores y amantes del cine que trabajan juntos
                para ofrecer la mejor experiencia cinematográfica. Cada película que seleccionamos, cada espacio que
                creamos, está pensado para brindarte una noche inolvidable.
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-2xl font-serif font-bold text-[#CDAA7D] mb-3">Nuestro Horario</h3>
              <p className="text-[#E0E0E0]">
                Estamos abiertos todos los días de la semana, de <span className="text-[#CDAA7D] font-semibold">10:00 a 22:00 horas</span>. ¡Ven y disfruta de una película con nosotros!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer fijo en la parte inferior */}
      <Footer className="w-full relative z-10 mt-auto" />
    </CinemaLuxeBackground>
  );
}
