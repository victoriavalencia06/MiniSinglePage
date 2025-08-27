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
          if (citaData.PacienteId) {
            const pacienteRef = doc(db, "Paciente", citaData.PacienteId);
            const pacienteSnap = await getDoc(pacienteRef);
            if (pacienteSnap.exists()) {
              pacienteNombre = pacienteSnap.data().Nombre;
            }
          }

          // Traer datos del doctor
          let doctorNombre = "Desconocido";
          if (citaData.DoctorId) {
            const doctorRef = doc(db, "Doctor", citaData.DoctorId);
            const doctorSnap = await getDoc(doctorRef);
            if (doctorSnap.exists()) {
              doctorNombre = doctorSnap.data().Nombre;
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

      setCitas(data);
    };

    fetchCitas();
  }, []);

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
                  {cita.FechaHora
                    ? new Date(cita.FechaHora.seconds * 1000).toLocaleString()
                    : "Sin fecha"}
                </p>
                <p>Motivo: {cita.Motivo}</p>
                <span className="badge bg-info">{cita.Estado}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
