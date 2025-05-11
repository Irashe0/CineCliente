import { Link } from "react-router-dom";

const ModalTikets = ({ message, onClose, onLoginClick }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 p-4">


      <div className="absolute top-6 left-0 right-0 text-center">
        <h1 className="text-4xl font-bold text-[#CDAA7D] hover:text-[#E6CBA8] transition-colors duration-300">
          CineLuxe
        </h1>
      </div>

      <div className="w-full max-w-md rounded-lg overflow-hidden shadow-[rgba(0,0,0,0.25)] border border-[#CDAA7D] border-opacity-50">
        <div className="bg-gradient-to-t from-[#0F0F0F] to-[#1E1E1E] p-6 flex flex-col items-center">

          <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-[#CDAA7D] to-transparent mb-4"></div>

          <p className="text-[#E0E0E0] text-center mb-4">{message}</p>

          <div className="flex justify-center space-x-4">
            <button
              className="bg-[var(--principal)] hover:bg-[#232323] text-white py-2 px-6 rounded-md shadow-md transition-colors duration-300"
              onClick={onLoginClick}
            >
              Iniciar sesión
            </button>
            <button
              className="bg-[#232323] hover:bg-[#383838] text-[#E0E0E0] py-2 px-6 rounded-md border border-[#CDAA7D] shadow-md transition-colors duration-300"
              onClick={onClose}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ModalTikets;
