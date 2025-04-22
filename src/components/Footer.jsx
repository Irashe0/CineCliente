import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
<footer className="bg-gradient-to-t from-black via-black/95 to-transparent text-white mt-auto py-3 md:py-4">

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">

          <div>
            <h3 className="text-lg font-bold mb-2 text-left">CineLuxe</h3>
            <p className="text-xs text-gray-400 text-left">
              Vive una experiencia de lujo al puro estilo madrileño.
            </p>
          </div>

          <div>
            <h4 className="text-md font-semibold mb-2 text-left">Información Adicional</h4>
            <ul className="text-xs space-y-1 text-left">
              <li><a href="/SobreNosotros" className="text-gray-500 hover:text-[#CDAA7D] transition-colors">Sobre Nosotros</a></li>
              <li><a href="/faqs" className="text-gray-500 hover:text-[#CDAA7D] transition-colors">FAQs</a></li>
              <br />
              <li><a href="/cines" className="text-gray-500 hover:text-[#CDAA7D] transition-colors">Cines</a></li>
            </ul>
          </div>

          <div className="flex justify-center">
            <div className="rounded-lg overflow-hidden w-full max-w-xs">
              <iframe
                className="w-full h-24 md:h-32 border-none"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3102.3514780466813!2d-3.703790284654662!3d40.41677597936564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd4228774f68b31d%3A0x1e093f0988f3e6b!2sMadrid!5e0!3m2!1ses!2ses!4v1682000000000"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex justify-center gap-6">
            <a href="https://facebook.com" className="text-gray-400 hover:text-[#CDAA7D] transition-colors">
              <Facebook size={24} />
            </a>
            <a href="https://twitter.com" className="text-gray-400 hover:text-[#CDAA7D] transition-colors">
              <Twitter size={24} />
            </a>
            <a href="https://instagram.com" className="text-gray-400 hover:text-[#CDAA7D] transition-colors">
              <Instagram size={24} />
            </a>
            <a href="https://youtube.com" className="text-gray-400 hover:text-[#CDAA7D] transition-colors">
              <Youtube size={24} />
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-3 pt-2 text-center">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} CineLuxe. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
