import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where
} from "firebase/firestore";
import { db } from "../dataServices";

export default function FormCitas() {
  const [pacienteId, setPacienteId] = useState("");
  const [especialidadId, setEspecialidadId] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [fechaHora, setFechaHora] = useState("");
  const [motivo, setMotivo] = useState("");
  const [estado, setEstado] = useState("pendiente");

  // Datos de selects
  const [pacientes, setPacientes] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [doctorAsignado, setDoctorAsignado] = useState(null);

  // Control modal paciente
  const [showPacienteForm, setShowPacienteForm] = useState(false);
  const [nuevoPaciente, setNuevoPaciente] = useState({
    nombre: "",
    edad: "",
    telefono: "",
    direccion: "",
  });

  // Cargar pacientes y especialidades
  useEffect(() => {
    const fetchData = async () => {
      try {
        const pacienteSnapshot = await getDocs(collection(db, "Paciente"));
        setPacientes(
          pacienteSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );

        const especializacionSnapshot = await getDocs(
          collection(db, "Especializacion")
        );
        setEspecialidades(
          especializacionSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    };
    fetchData();
  }, []);

  // Seleccionar especialidad → asignar doctor automáticamente
  const handleEspecialidadChange = async (id) => {
    setEspecialidadId(id);
    if (!id) return setDoctorAsignado(null);

    const q = query(
      collection(db, "Doctores"),
      where("especialidadId", "==", id)
    );
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const doctor = snapshot.docs[0];
      setDoctorAsignado({ id: doctor.id, ...doctor.data() });
      setDoctorId(doctor.id);
    } else {
      setDoctorAsignado(null);
      setDoctorId("");
    }
  };

  // Guardar cita
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!doctorId) {
      alert("No hay doctor disponible ❌");
      return;
    }

    // Verificar disponibilidad
    const q = query(
      collection(db, "Citas"),
      where("doctorId", "==", doctorId),
      where("fechaHora", "==", fechaHora)
    );
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      alert("El doctor ya tiene una cita en esa fecha/hora ❌");
      return;
    }

    await addDoc(collection(db, "Citas"), {
      pacienteId,
      doctorId,
      fechaHora,
      motivo,
      estado,
    });

    alert("✅ Cita registrada correctamente");
    setPacienteId("");
    setEspecialidadId("");
    setDoctorId("");
    setDoctorAsignado(null);
    setFechaHora("");
    setMotivo("");
    setEstado("pendiente");
  };

  // Guardar paciente nuevo
  const handleAddPaciente = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "Paciente"), nuevoPaciente);
      alert("✅ Paciente añadido");

      // actualizar lista
      setPacientes([...pacientes, { id: docRef.id, ...nuevoPaciente }]);
      setPacienteId(docRef.id);

      // reset y cerrar form
      setNuevoPaciente({ nombre: "", edad: "", telefono: "", direccion: "" });
      setShowPacienteForm(false);
    } catch (error) {
      console.error("Error al añadir paciente:", error);
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="card shadow p-4 w-100" style={{ maxWidth: "600px" }}>
        <form onSubmit={handleSubmit}>
          <h4 className="mb-4 text-center">Registrar nueva cita</h4>

          {/* Paciente */}
          <div className="mb-3">
            <label className="form-label">Paciente</label>
            <div className="d-flex gap-2">
              <select
                className="form-select"
                value={pacienteId}
                onChange={(e) => setPacienteId(e.target.value)}
                required
              >
                <option value="">Seleccione un paciente</option>
                {pacientes.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nombre}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="btn btn-outline-success"
                onClick={() => setShowPacienteForm(true)}
              >
                Nuevo
              </button>
            </div>
          </div>

          {/* Formulario inline para nuevo paciente */}
          {showPacienteForm && (
            <div className="border rounded p-3 mb-3 bg-light">
              <h6>Añadir nuevo paciente</h6>
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Nombre"
                value={nuevoPaciente.nombre}
                onChange={(e) =>
                  setNuevoPaciente({ ...nuevoPaciente, nombre: e.target.value })
                }
                required
              />
              <input
                type="number"
                className="form-control mb-2"
                placeholder="Edad"
                value={nuevoPaciente.edad}
                onChange={(e) =>
                  setNuevoPaciente({ ...nuevoPaciente, edad: e.target.value })
                }
                required
              />
              <input
                type="number"
                className="form-control mb-2"
                placeholder="Teléfono"
                value={nuevoPaciente.telefono}
                onChange={(e) =>
                  setNuevoPaciente({
                    ...nuevoPaciente,
                    telefono: e.target.value,
                  })
                }
                required
              />
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Dirección"
                value={nuevoPaciente.direccion}
                onChange={(e) =>
                  setNuevoPaciente({
                    ...nuevoPaciente,
                    direccion: e.target.value,
                  })
                }
              />
              <button
                className="btn btn-success w-100"
                onClick={handleAddPaciente}
              >
                Guardar paciente
              </button>
            </div>
          )}

          {/* Especialidad */}
          <div className="mb-3">
            <label className="form-label">Especialidad</label>
            <select
              className="form-select"
              value={especialidadId}
              onChange={(e) => handleEspecialidadChange(e.target.value)}
              required
            >
              <option value="">Seleccione una especialidad</option>
              {especialidades.map((esp) => (
                <option key={esp.id} value={esp.id}>
                  {esp.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Doctor asignado */}
          {doctorAsignado && (
            <div className="alert alert-info">
              <strong>Doctor asignado:</strong> {doctorAsignado.nombre}
            </div>
          )}

          {/* Fecha y hora */}
          <div className="mb-3">
            <label className="form-label">Fecha y hora</label>
            <input
              type="datetime-local"
              className="form-control"
              value={fechaHora}
              onChange={(e) => setFechaHora(e.target.value)}
              required
            />
          </div>

          {/* Motivo */}
          <div className="mb-3">
            <label className="form-label">Motivo de la cita</label>
            <textarea
              className="form-control"
              rows="3"
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              required
            ></textarea>
          </div>

          {/* Estado */}
          <div className="mb-3">
            <label className="form-label">Estado</label>
            <select
              className="form-select"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
            >
              <option value="pendiente">Pendiente</option>
              <option value="confirmada">Confirmada</option>
              <option value="cancelada">Cancelada</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Guardar Cita
          </button>
        </form>
      </div>
    </div>
  );
}
