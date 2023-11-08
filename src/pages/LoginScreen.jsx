import React, { useState } from "react";
//importar navigate
import { useNavigate } from "react-router-dom";
//Funcion authLogin
import { authLogin } from "../helpers/ApiLogin";

import logo from "../assets/logo.png";
import "../css/login.css";

//compoente del mesaje
import MessageApp from "../components/MessageApp";

const LoginScreen = ({ iniciarSesion, guardarUsuario }) => {
  //variable para navigate
  const navigate = useNavigate();
  //estados para guardar correo y password
  const [inputCorreo, setInputCorreo] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  //Estado para obtener el mens del resultado de la peticion
  const [resultado, setResultado] = useState(null);

  //Estdo para manejar el loading
  const [loading, setLoading] = useState(false);

  //Funcion para el formulario
  const handleLogin = async (e) => {
    e.preventDefault();
    //ejecutar setLoading
    setLoading(true);

    //obtener datos ingresados
    const datos = {
      correo: inputCorreo,
      password: inputPassword,
    };

    //peticion a la API
    const resp = await authLogin(datos);
    console.log(resp);

    if (resp?.token) {
      //Guardar en localStorage
      localStorage.setItem("token", JSON.stringify(resp.token));
      //Ejecutar F iniciarSesion
      iniciarSesion();

      //guardar datos de usuario
      guardarUsuario(resp.usuario);

      //navigate redireccionar al HOME
      navigate("/");
    }

    //enviamos la respuesta "resultado"
    setResultado(resp);

    //loading a false para q se vuelva a habilitar el boton
    setLoading(false);
  };

  return (
    <div className="bg-dark">
      <div className="container container-login">
        <div className="row px-2">
          <div className="col-12 col-md-4 offset-md-4 card-login">
            <div className="d-flex justify-content-center align-items-center">
              <img src={logo} alt="logo" />
            </div>
            <h3 className="text-center mt-2">
              <span>
                <i className="fa fa-user-circle" aria-hidden="true"></i>
              </span>
              Inicio de sesión
            </h3>
            <form onSubmit={handleLogin}>
              <div className="mt-3">
                <label className="fw-bold">Correo</label>
                <input
                  type="email"
                  className="form-control"
                  value={inputCorreo}
                  onChange={(e) => setInputCorreo(e.target.value)}
                />
              </div>
              <div className="mt-3">
                <label className="fw-bold">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  value={inputPassword}
                  onChange={(e) => setInputPassword(e.target.value)}
                />
              </div>
              <div className="mt-3 d-grid">
                <button className="btn btn-dark" disabled={loading && true}>
                  Iniciar
                </button>
              </div>
            </form>
            {/* ternario para mostrar mensaje con el "resultado" */}
            {resultado?.msg && (
              <div className="mt-2">
                <MessageApp mensaje={resultado.msg} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
