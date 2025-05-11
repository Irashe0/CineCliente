import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CambiarContraseña from "./pages/CambiarContraseña";
import DetallesPelicula from "./pages/DetallesPelicula";
import SobreNosotros from "./pages/SobreNosotros";
import FAQs from "./pages/FAQs";
import Cines from "./pages/Cines";
import Dashboard from "./pages/Dashboard";

import ReservaLayout from "./layouts/ReservaLayout";
import Cinesreserva from "./components/SelectCine";
import HorarioPage from "./components/Horarios";
import ButacasPage from "./components/Butacas";
import PagoPage from "./components/Pago";
import Confirmacion from "./pages/Confirmacion";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cambiar-password" element={<CambiarContraseña />} />
      <Route path="/peliculas/:id" element={<DetallesPelicula />} />
      <Route path="/sobreNosotros" element={<SobreNosotros />} />
      <Route path="/faqs" element={<FAQs />} />
      <Route path="/cines" element={<Cines />} />
      <Route path="/dashboard/:userId" element={<Dashboard />} />
      <Route path="/confirmacion-compra" element={<Confirmacion />} />

      <Route path="/reserva/:id" element={<ReservaLayout />}>
        <Route index element={<Cinesreserva />} />
        <Route path="horario" element={<HorarioPage />} />
        <Route path="butacas" element={<ButacasPage />} />
        <Route path="pago" element={<PagoPage />} />
      </Route>

    </Routes>
  );
}

export default App;
