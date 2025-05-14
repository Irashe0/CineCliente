import { Ticket, Info } from "lucide-react";

const reservas = [
  {
    id: 1,
    pelicula: "Dune: Parte 2",
    estado: "Confirmada",
    fecha: "jueves, 15 de mayo de 2025",
    hora: "18:30 hrs",
    sala: "Sala 3",
    butacas: ["F5", "F6", "F7"],
  },
  {
    id: 2,
    pelicula: "Deadpool & Wolverine",
    estado: "Pendiente",
    fecha: "martes, 20 de mayo de 2025",
    hora: "20:15 hrs",
    sala: "Sala VIP 1",
    butacas: ["D10", "D11"],
  },
  {
    id: 3,
    pelicula: "Gladiator II",
    estado: "Confirmada",
    fecha: "domingo, 25 de mayo de 2025",
    hora: "19:00 hrs",
    sala: "Sala IMAX",
    butacas: ["H8", "H9", "H10", "H11"],
  },
];

export default function MisReservas() {
  return (
    <div className="max-w-2xl mx-auto bg-[#1A1A1A] border border-[#CDAA7D] rounded-lg p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-center text-[#E0E0E0] mb-6">Mis Reservas</h2>
      
      {reservas.map((reserva) => (
        <div key={reserva.id} className="bg-[#2D2D2D] border border-[#CDAA7D] rounded-md p-4 mb-4">
          <h3 className="text-lg font-semibold text-[#CDAA7D]">{reserva.pelicula}</h3>
          <p className="text-gray-400"><span className="font-bold">Estado:</span> {reserva.estado}</p>
          <p className="text-gray-400"><span className="font-bold">Fecha:</span> {reserva.fecha}</p>
          <p className="text-gray-400"><span className="font-bold">Hora:</span> {reserva.hora} - <span className="font-bold">Sala:</span> {reserva.sala}</p>
          <p className="text-gray-400"><span className="font-bold">Butacas:</span> {reserva.butacas.join(", ")}</p>
          
          <div className="mt-4 flex space-x-4">
            <button className="flex items-center bg-[#0077B6] hover:bg-[#005F8B] text-white px-4 py-2 rounded-md">
              <Info className="mr-2" /> Ver detalles
            </button>
            <button className="flex items-center bg-[#0077B6] hover:bg-[#005F8B] text-white px-4 py-2 rounded-md">
              <Ticket className="mr-2" /> Ver boletos
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
