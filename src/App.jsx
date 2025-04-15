import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CambiarContraseña from "./pages/CambiarContraseña";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cambiar-password" element={<CambiarContraseña />} />
    </Routes>
  );
}

export default App;
