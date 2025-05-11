
const ModalTikets = ({ message, onClose, onLoginClick }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[90%] max-w-md">
        <h2 className="text-xl font-semibold mb-4">{message}</h2>
        <div className="flex justify-center space-x-4">
          <button
            className="bg-[#0077B6] text-white py-2 px-6 rounded-md"
            onClick={onLoginClick}
          >
            Iniciar sesión
          </button>
          <button
            className="bg-gray-300 text-black py-2 px-6 rounded-md"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalTikets;
