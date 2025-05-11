import Breadcrumbs from "../components/breadcrums";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ModalTikets from "../components/modal/modalTikets";

export default function ReservaLayout() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const userToken = localStorage.getItem("token");
    if (!userToken) {
      setIsModalOpen(true);
    }
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[var(--gris-oscuro)] flex flex-col relative">
      <Header />
      <div className="reserva-container container mb-8 px-4 py-8 bg-gradient-to-t from-[#0F0F0F] to-[#1E1E1E] overflow-hidden rounded-md shadow-[rgba(0,0,0,0.25)] border-2 border-[#CDAA7D]">
        <h1 className="text-3xl font-bold m-8 text-center">Reserva de Entradas</h1>
        <Breadcrumbs />
        <div className="mt-8 mb-8">
          <Outlet />
        </div>
      </div>
      <Footer />

      {isModalOpen && (
        <ModalTikets 
          message="Debes iniciar sesión para continuar con la compra."
          onClose={closeModal}
          onLoginClick={() => navigate("/login")}
        />
      )}
    </div>
  );
}
