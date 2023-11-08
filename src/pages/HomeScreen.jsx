import React from "react";

import "../css/home.css";

const HomeScreen = () => {
  return (
    <div className="bg-home min-vh-100">
      <div className="container">
        <div className="row pt-5">
          <div className="col-12 col-md-6">
            <h1 className="title">Cursos disponibles</h1>
            <p className="texto">
              Aprende de profesionales con experiencia en cursos prácticos y sin
              rodeos. Mejora tus habilidades, especialízate, y sigue avanzando
              en tu carrera.
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-12"></div>
        </div>
        <div className="row">
          <div className="col my-3"></div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
