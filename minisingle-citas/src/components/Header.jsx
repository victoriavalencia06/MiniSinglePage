import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm">
      <div className="container">
        <Link className="navbar-brand" to="/">MediClinic</Link>
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

        <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item mx-2">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
            <li className="nav-item mx-2">
              <a className="nav-link" href="#">Servicios</a>
            </li>
            <li className="nav-item mx-2">
              <a className="nav-link" href="#">Contactanos</a>
            </li>
            <li className="nav-item mx-2">
              <a className="nav-link" href="#">Sobre Nosotros</a>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link" to="/citas">Citas</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;