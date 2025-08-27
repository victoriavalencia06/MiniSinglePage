import React from "react";
import { useNavigate } from "react-router-dom";
import ListCitas from "../components/ListCitas";
import Header from "../components/Header";

export default function Citas() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="container py-4">
        <h2 className="text-center mb-4">Gestión de Citas</h2>

        <div className="d-flex justify-content-center mb-3">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/citas/nueva")}
          >
            Agenda tu cita
          </button>
        </div>

        {/* Aquí mostramos la lista de citas */}
        <ListCitas />

      </div>
    </>
  );
}
