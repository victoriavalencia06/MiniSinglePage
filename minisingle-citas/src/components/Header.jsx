import React from "react";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm">
      <div className="container">
        <a className="navbar-brand" href="#">MediClinic</a>
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

        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item mx-2">
              <a className="nav-link active" href="#">Inicio</a>
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
          </ul>
        </div>

        <div className="d-flex">
          <button className="btn btn-primary">Agenda tu cita con nosotros</button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
