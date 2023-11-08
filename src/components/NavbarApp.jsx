import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import "../css/navbar.css";

const NavbarApp = ({ cerrarSesion, user }) => {
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img className="img-logo" src={logo} alt="logo" />
          <span> RollingCode Universe</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/">
                <i className="fa fa-home" aria-hidden="true"></i>
                Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                <i className="fa fa-users" aria-hidden="true"></i>
                Sobre nosotros
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/reserva">
                <i className="fa fa-star" aria-hidden="true"></i>
                Reservas
              </NavLink>
            </li>
            {user.rol === "ADMIN_ROLE" && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin">
                  <i className="fa fa-cog" aria-hidden="true"></i>
                  Admin
                </NavLink>
              </li>
            )}
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <button className="btn nav-link" onClick={cerrarSesion}>
                Cerrar sesión
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarApp;
