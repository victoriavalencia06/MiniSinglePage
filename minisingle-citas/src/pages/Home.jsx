import React from "react";
import Header from "../components/Header.jsx";
import Departments from "../components/Departments.jsx";
import Contact from "../components/Contact.jsx"
import AboutUs from "../components/AboutUs.jsx";
import Footer from "../components/Footer.jsx";

const Home = () => {
  return (
    <>
      <Header />

      {/* Encabezado principal */}
      <section className="home-header">
        <h2>Bienvenido a MediClinic</h2>
        <p>
          Cuidamos tu salud con los mejores especialistas y un trato cercano y humano.
        </p>
      </section>

      {/* Departamentos */}
      <Departments />

      {/* Contacto */}
      <Contact />

      {/* Sección Sobre Nosotros */}
      <AboutUs />

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Home;
