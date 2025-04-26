import  Breadcrumbs  from "../components/breadcrums";

export default function ReservaLayout({ children }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Reserva de Entradas</h1>
        <Breadcrumbs />
        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
}
