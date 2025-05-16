import { Link } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"

export default function SobreNosotros() {
  return (
    <>
      <Header className="fixed top-0 left-0 w-full z-50" />

      <div className="flex min-h-screen items-center justify-center p-4">
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
            <h6 className="italic text-lg text-[#CDAA7D]">
              Vive una experiencia de lujo al puro estilo madrileño
            </h6>
            <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-[#CDAA7D] to-transparent mb-6"></div>

            <p className="text-[#E0E0E0] text-center leading-relaxed">
              En <span className="text-[#CDAA7D] font-semibold">CineLuxe</span>, el cine no es solo entretenimiento, es un ritual.
              Aquí, cada proyección es un evento, cada asiento un palco de honor, y cada detalle está pensado para
              ofrecerte una experiencia digna de la más alta sociedad madrileña. No venimos a cambiar el cine,
              venimos a perfeccionarlo.
            </p>

            <div className="mt-6 text-center">
              <h3 className="text-2xl font-serif font-bold text-[#CDAA7D] mb-3">La distinción hecha cine</h3>
              <p className="text-[#E0E0E0]">
                No se trata solo de ver una película, sino de sentir el lujo en cada fotograma, 
                de dejarse envolver por la atmósfera selecta de Madrid y sumergirse en un cine que no es para cualquiera, 
                sino para aquellos que saben apreciar lo extraordinario.
              </p>
            </div>

            <div className="mt-8 text-center">
              <h3 className="text-2xl font-serif font-bold text-[#CDAA7D] mb-3">El cine con sello madrileño</h3>
              <p className="text-[#E0E0E0]">
                En CineLuxe, el carácter castizo se mezcla con la exquisitez del séptimo arte.
                Salas diseñadas con la elegancia de los grandes teatros, un ambiente de exclusividad que te envuelve
                desde el primer momento y una cartelera seleccionada con el más fino criterio. Porque aquí,
                el cine no es para todos, es para los que saben disfrutarlo.
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-2xl font-serif font-bold text-[#CDAA7D] mb-3">Nuestro Horario</h3>
              <p className="text-[#E0E0E0]">
                Cada día abrimos nuestras puertas de <span className="text-[#CDAA7D] font-semibold">10:00 a 22:00</span>,
                ofreciéndote el lujo de disfrutar el cine como solo Madrid lo sabe hacer. Ven, acomódate y déjate envolver por la grandeza de CineLuxe.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
