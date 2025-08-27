import { useEffect, useState } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../dataServices";

export default function ListCitas() {
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    const fetchCitas = async () => {
      const querySnapshot = await getDocs(collection(db, "Citas"));

      const data = await Promise.all(
        querySnapshot.docs.map(async (docSnap) => {
          const citaData = docSnap.data();

          // Traer datos del paciente
          let pacienteNombre = "Desconocido";
          if (citaData.pacienteId) {
            const pacienteRef = doc(db, "Paciente", citaData.pacienteId);
            const pacienteSnap = await getDoc(pacienteRef);
            if (pacienteSnap.exists()) {
              pacienteNombre = pacienteSnap.data().nombre;
            }
          }

          // Traer datos del doctor
          let doctorNombre = "Desconocido";
          if (citaData.doctorId) {
            const doctorRef = doc(db, "Doctor", citaData.doctorId);
            const doctorSnap = await getDoc(doctorRef);
            if (doctorSnap.exists()) {
              doctorNombre = doctorSnap.data().nombre;
            }
          }

          return {
            id: docSnap.id,
            ...citaData,
            pacienteNombre,
            doctorNombre,
          };
        })
      );

      // Ordenar citas: más recientes primero
      data.sort((a, b) => {
        const fechaA = a.fechaHora?.seconds || 0;
        const fechaB = b.fechaHora?.seconds || 0;
        return fechaB - fechaA;
      });

      setCitas(data);
    };

    fetchCitas();
  }, []);

  // color según el estado de la cita
  const getBadgeClass = (estado) => {
    switch (estado?.toLowerCase()) {
      case "pendiente":
        return "bg-warning text-dark"; // Amarillo
      case "confirmada":
        return "bg-success"; // Verde
      case "reprogramada":
        return "bg-info text-dark"; // Celeste
      case "cancelada":
        return "bg-danger"; // Rojo
      case "atendida":
        return "bg-primary"; // Azul
      default:
        return "bg-secondary"; // Gris si algo falla
    }
  };

  return (
    <div className="container my-4">
      <h3 className="mb-3">Listado de Citas</h3>
      {citas.length === 0 ? (
        <p>No hay citas registradas todavía.</p>
      ) : (
        <div className="row">
          {citas.map((cita) => (
            <div key={cita.id} className="col-md-4 mb-3">
              <div className="card shadow-sm p-3">
                <h5>Paciente: {cita.pacienteNombre}</h5>
                <p>Doctor: {cita.doctorNombre}</p>
                <p>
                  Fecha y Hora:{" "}
                  {cita.fechaHora
                    ? new Date(cita.fechaHora.seconds * 1000).toLocaleString()
                    : "Sin fecha"}
                </p>
                <p>Motivo: {cita.motivo}</p>
                <span className={`badge ${getBadgeClass(cita.estado)}`}>
                  {cita.estado}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
