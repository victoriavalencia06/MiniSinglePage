import React from "react";
import Header from "./Header.jsx";

const Home = () => {
  return (
    <>
      <Header />

      {/* Home Header */}
      <section className="home-header">
        <h2>Bienvenido a MediClinic</h2>
        <p>
          Cuidamos tu salud con los mejores especialistas y un trato personalizado.
        </p>
      </section>

      {/* Home Info */}
      <section className="home-info container-fluid">
        <div className="row text-center g-4">
          {/* Email */}
          <div className="col-sm-6 col-md-3 info-item">
            <div className="info-icon" aria-hidden="true">
              {/* ícono de correo */}
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#7cc5e7" viewBox="0 0 24 24" stroke="#7cc5e7" strokeWidth="1.5"><path d="M4 4h16v16H4z" fill="none"/><polyline points="22,6 12,13 2,6"/></svg>
            </div>
            <div className="info-title">Email</div>
            <div className="info-text">
              hello@gomedic.com <br /> business@gomedic.com
            </div>
          </div>

          {/* Teléfono */}
          <div className="col-sm-6 col-md-3 info-item">
            <div className="info-icon" aria-hidden="true">
              {/* ícono de teléfono */}
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="#7cc5e7" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13 1.21.38 2.39.73 3.52a2 2 0 01-.45 2.11L9 10.91a16 16 0 006 6l1.57-1.57a2 2 0 012.11-.45c1.13.35 2.31.6 3.52.73a2 2 0 012 2z"/></svg>
            </div>
            <div className="info-title">Teléfonos</div>
            <div className="info-text">
              (300) 1234 3431 <br /> (300) 4578 9341
            </div>
          </div>

          {/* Ubicación */}
          <div className="col-sm-6 col-md-3 info-item">
            <div className="info-icon" aria-hidden="true">
              {/* ícono de ubicación */}
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="#7cc5e7" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 1118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <div className="info-title">Ubicación</div>
            <div className="info-text">
              Victoria Street, London, UK <br /> River Street, London, UK
            </div>
          </div>

          {/* Horarios */}
          <div className="col-sm-6 col-md-3 info-item">
            <div className="info-icon" aria-hidden="true">
              {/* ícono de reloj */}
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="#7cc5e7" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <div className="info-title">Horarios</div>
            <div className="info-text">
              Lun - Vie: 09:00 - 17:00 <br /> Sáb - Dom: 09:00 - 15:00
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
