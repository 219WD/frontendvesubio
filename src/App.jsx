import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import LoginScreen from "./pages/LoginScreen";
import RoutesDos from "./routes/RoutesDos";
import ReservaForm from './pages/ReservaForm';

import ErrorScreen from "./pages/ErrorScreen";

function App() {
  //Estados para manejar el login y datos del usuario
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(null);

  //funcion para guarsar datos del usuario
  const guardarUsuario = (datos) => {
    setUser(datos);
  };

  //funcion para iniciar sesion
  const iniciarSesion = () => {
    setLogin(true);
  };

  //funcion para cerrar sesion
  const cerrarSesion = () => {
    setLogin(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas proteg para login, datos de usuario y func cerrar sesion */}
        <Route
          path="/*"
          element={
            <ProtectedRoutes login={login}>
              <RoutesDos cerrarSesion={cerrarSesion} user={user} />
            </ProtectedRoutes>
          }
        />
        <Route path="*" element={<ErrorScreen />} />
        
        <Route path="/reserva" element={<ReservaForm />} />

        {/* Ruta login que recibe funcion iniciar sesion y guardar datos */}
        <Route
          path="/login"
          element={
            <LoginScreen
              iniciarSesion={iniciarSesion}
              guardarUsuario={guardarUsuario}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;