import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc
} from "firebase/firestore";
import { db } from "../dataServices";
import { useNavigate } from "react-router-dom";

export default function FormCitas() {
  const navigate = useNavigate();

  const [pacienteId, setPacienteId] = useState("");
  const [especializacionId, setEspecializacionId] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [fechaHora, setFechaHora] = useState("");
  const [motivo, setMotivo] = useState("");
  const [estado, setEstado] = useState("pendiente");

  const [pacientes, setPacientes] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [doctorAsignado, setDoctorAsignado] = useState(null);
  const [buscandoDoctor, setBuscandoDoctor] = useState(false);

  const [showPacienteForm, setShowPacienteForm] = useState(false);
  const [nuevoPaciente, setNuevoPaciente] = useState({
    nombre: "",
    edad: "",
    telefono: "",
    direccion: "",
  });

  // Fecha mínima en hora local (no UTC) para el input datetime-local
  const nowLocalISO = (() => {
    const now = new Date();
    const tzOffsetMs = now.getTimezoneOffset() * 60000;
    return new Date(Date.now() - tzOffsetMs).toISOString().slice(0, 16);
  })();

  // Cargar pacientes y especializaciones
  useEffect(() => {
    const fetchData = async () => {
      try {
        const pacienteSnap = await getDocs(collection(db, "Paciente"));
        setPacientes(pacienteSnap.docs.map((d) => ({ id: d.id, ...d.data() })));

        const especSnap = await getDocs(collection(db, "Especializacion"));
        setEspecialidades(especSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    };
    fetchData();
  }, []);

  // Seleccionar especialización → asignar doctor automáticamente
  const handleEspecializacionChange = async (id) => {
    setEspecializacionId(id);
    setDoctorAsignado(null);
    setDoctorId("");
    if (!id) return;

    setBuscandoDoctor(true);
    try {
      const doctoresCol = collection(db, "Doctor");

      // 1) Intento por 'especializacionId' (string)
      let snap = await getDocs(query(doctoresCol, where("especializacionId", "==", id)));

      // 2) Intento alterno por 'especialidadId' (string), por si el campo se guardó con ese nombre
      if (snap.empty) {
        snap = await getDocs(query(doctoresCol, where("especialidadId", "==", id)));
      }

      // 3) Intento por referencia: 'especializacionRef' === doc(db,'Especializacion', id)
      if (snap.empty) {
        const ref = doc(db, "Especializacion", id);
        snap = await getDocs(query(doctoresCol, where("especializacionRef", "==", ref)));
      }

      // 4) Fallback: traer todos y filtrar en memoria (por si hay espacios u otras claves)
      let docMatch = snap.docs[0];
      if (!docMatch) {
        const all = await getDocs(doctoresCol);
        docMatch = all.docs.find((d) => {
          const data = d.data();
          const a = (data.especializacionId || data.especialidadId || "").trim();
          return a === id;
        });
      }

      if (docMatch) {
        const data = docMatch.data();
        setDoctorAsignado({ id: docMatch.id, ...data });
        setDoctorId(docMatch.id);
        console.log("Doctor asignado:", docMatch.id, data);
      } else {
        setDoctorAsignado(null);
        setDoctorId("");
        console.warn("No se encontró doctor para especialización:", id);
      }
    } catch (error) {
      console.error("Error al buscar doctor:", error);
      setDoctorAsignado(null);
      setDoctorId("");
    } finally {
      setBuscandoDoctor(false);
    }
  };

  // Guardar cita
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pacienteId) {
      alert("Selecciona un paciente.");
      return;
    }
    if (!especializacionId) {
      alert("Selecciona una especialización.");
      return;
    }
    if (!doctorId) {
      alert("No hay doctor disponible para esta especialización ❌");
      return;
    }

    // Validar fecha futura (en local)
    const selected = new Date(fechaHora);
    const now = new Date();
    if (selected < now) {
      alert("No puedes seleccionar una fecha pasada ❌");
      return;
    }

    // Verificar disponibilidad exacta fecha/hora con el mismo doctor
    const qCita = query(
      collection(db, "Citas"),
      where("doctorId", "==", doctorId),
      where("fechaHora", "==", fechaHora)
    );
    const snapCita = await getDocs(qCita);
    if (!snapCita.empty) {
      alert("El doctor ya tiene una cita en esa fecha/hora ❌");
      return;
    }

    await addDoc(collection(db, "Citas"), {
      pacienteId,
      doctorId,
      especializacionId,
      fechaHora,
      motivo,
      estado,
    });

    alert("✅ Cita registrada correctamente");
    navigate("/citas");
  };

  // Guardar paciente nuevo
  const handleAddPaciente = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "Paciente"), nuevoPaciente);
      alert("✅ Paciente añadido");

      setPacientes((prev) => [...prev, { id: docRef.id, ...nuevoPaciente }]);
      setPacienteId(docRef.id);
      setNuevoPaciente({ nombre: "", edad: "", telefono: "", direccion: "" });
      setShowPacienteForm(false);
    } catch (error) {
      console.error("Error al añadir paciente:", error);
    }
  };

  const handleCancelarPrincipal = () => navigate("/citas");

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
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
                  <option key={p.id} value={p.id}>{p.nombre}</option>
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

          {/* Mini-form paciente */}
          {showPacienteForm && (
            <div className="border rounded p-3 mb-3 bg-light">
              <h6>Añadir nuevo paciente</h6>
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Nombre"
                value={nuevoPaciente.nombre}
                onChange={(e) => setNuevoPaciente({ ...nuevoPaciente, nombre: e.target.value })}
                required
              />
              <input
                type="number"
                className="form-control mb-2"
                placeholder="Edad"
                value={nuevoPaciente.edad}
                onChange={(e) => setNuevoPaciente({ ...nuevoPaciente, edad: e.target.value })}
                required
              />
              <input
                type="number"
                className="form-control mb-2"
                placeholder="Teléfono"
                value={nuevoPaciente.telefono}
                onChange={(e) => setNuevoPaciente({ ...nuevoPaciente, telefono: e.target.value })}
                required
              />
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Dirección"
                value={nuevoPaciente.direccion}
                onChange={(e) => setNuevoPaciente({ ...nuevoPaciente, direccion: e.target.value })}
              />
              <div className="d-flex gap-2">
                <button className="btn btn-success w-50" onClick={handleAddPaciente}>Guardar paciente</button>
                <button type="button" className="btn btn-secondary w-50" onClick={() => setShowPacienteForm(false)}>Cancelar</button>
              </div>
            </div>
          )}

          {/* Especialización */}
          <div className="mb-3">
            <label className="form-label">Especialización</label>
            <select
              className="form-select"
              value={especializacionId}
              onChange={(e) => handleEspecializacionChange(e.target.value)}
              required
            >
              <option value="">Seleccione una especialización</option>
              {especialidades.map((esp) => (
                <option key={esp.id} value={esp.id}>{esp.nombre}</option>
              ))}
            </select>
          </div>

          {/* Doctor asignado */}
          {buscandoDoctor && (
            <div className="alert alert-secondary">Buscando doctor asignado…</div>
          )}

          {doctorAsignado && !buscandoDoctor && (
            <div className="alert alert-info">
              <strong>Doctor asignado:</strong> {doctorAsignado.nombre}
            </div>
          )}

          {!doctorAsignado && especializacionId && !buscandoDoctor && (
            <div className="text-danger mb-3">No hay doctor disponible para esta especialización</div>
          )}

          {/* Fecha y hora */}
          <div className="mb-3">
            <label className="form-label">Fecha y hora</label>
            <input
              type="datetime-local"
              className="form-control"
              value={fechaHora}
              min={nowLocalISO}
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
            />
          </div>

          {/* Estado */}
          <div className="mb-3">
            <label className="form-label">Estado</label>
            <select className="form-select" value={estado} onChange={(e) => setEstado(e.target.value)}>
              <option value="pendiente">Pendiente</option>
              <option value="confirmada">Confirmada</option>
              <option value="reprogramada">Reprogramada</option>
              <option value="cancelada">Cancelada</option>
              <option value="atendida">Atendida</option>
            </select>
          </div>

          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary w-50" disabled={!doctorId}>Guardar Cita</button>
            <button type="button" className="btn btn-secondary w-50" onClick={handleCancelarPrincipal}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
