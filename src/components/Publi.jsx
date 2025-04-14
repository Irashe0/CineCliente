import Boton from "./ComponentesExternos/Boton";

const Publi = () => {
  return (
    <div className="w-full max-w-md mx-auto overflow-hidden shadow-[rgba(0,0,0,0.25)] border border-[#FFD700] border-opacity-50 rounded-lg">
      <div className="bg-gradient-to-t from-[#2D2D2D] to-black p-6 flex flex-col items-center">
        
        <h2 className="text-2xl font-serif text-center font-bold text-[#F8F8FF] mb-3">
          ¿Quieres comprar tus entradas?
        </h2>

        <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mb-4"></div>

        <p className="text-[#778899] text-center mb-6">
          Experiencia exclusiva para nuestros miembros distinguidos
        </p>

        <div className="w-full flex justify-center">
          <Boton className="bg-[#FFD700] hover:bg-[#E1B900] text-black font-medium py-5 px-6 rounded-md shadow-md">
            REGÍSTRATE
          </Boton>
        </div>
      </div>
    </div>
  );
};

export default Publi;
