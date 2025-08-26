import React, { useState } from 'react';

const Departments = () => {
  const [activeDepartment, setActiveDepartment] = useState(null);
  
  const departments = [
    {
      id: 0,
      title: "Neumología",
      description: "Nos especializamos en la salud pulmonar, brindando diagnóstico y tratamiento de enfermedades respiratorias.",
      services: [
        "Electrocardiograma (ECG)",
        "Ecocardiograma (ultrasonido del corazón)",
        "Prueba de presión arterial de 24 horas",
        "Espirometría y pruebas de función pulmonar"
      ],
      image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 1,
      title: "Cardiología",
      description: "Brindamos atención integral del corazón con tecnología avanzada y especialistas experimentados.",
      services: [
        "Cateterismo cardíaco",
        "Angioplastia y colocación de stent",
        "Monitoreo del ritmo cardíaco",
        "Pruebas de esfuerzo"
      ],
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      title: "Neurología",
      description: "Atendemos trastornos que afectan el cerebro, la médula espinal y los nervios.",
      services: [
        "EEG (Electroencefalograma)",
        "EMG (Electromiografía)",
        "Estudios de conducción nerviosa",
        "Estudios del sueño"
      ],
      image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 3,
      title: "Pediatría",
      description: "Cuidamos la salud y el bienestar de los niños desde la infancia hasta la adolescencia.",
      services: [
        "Controles de crecimiento y vacunas",
        "Evaluaciones del desarrollo",
        "Tratamiento de enfermedades infantiles",
        "Apoyo y educación a padres"
      ],
      image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 4,
      title: "Ginecología y Obstetricia",
      description: "Cuidado integral de la salud femenina y acompañamiento durante el embarazo y parto.",
      services: [
        "Controles prenatales",
        "Ultrasonidos obstétricos",
        "Planificación familiar",
        "Atención en el parto"
      ],
      image: "https://images.unsplash.com/photo-1588776814546-44fd3a5e2f97?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 5,
      title: "Dermatología",
      description: "Prevención, diagnóstico y tratamiento de enfermedades de la piel, cabello y uñas.",
      services: [
        "Tratamiento de acné",
        "Cirugía menor de piel",
        "Control de lunares y lesiones",
        "Terapia para enfermedades crónicas de la piel"
      ],
      image: "https://images.unsplash.com/photo-1601597111158-2fce8563f8fc?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 6,
      title: "Traumatología y Ortopedia",
      description: "Atendemos lesiones óseas, musculares y articulares para una rápida recuperación.",
      services: [
        "Tratamiento de fracturas",
        "Cirugía ortopédica",
        "Rehabilitación física",
        "Prótesis y ortesis"
      ],
      image: "https://images.unsplash.com/photo-1620218596978-d48b893475c1?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 7,
      title: "Oncología",
      description: "Diagnóstico y tratamiento integral para pacientes con cáncer con un enfoque humano y especializado.",
      services: [
        "Quimioterapia",
        "Radioterapia",
        "Cirugía oncológica",
        "Cuidados paliativos"
      ],
      image: "https://images.unsplash.com/photo-1576765607924-3f7b6a4f3f3b?auto=format&fit=crop&w=600&q=80"
    }
  ];

  return (
    <section className="departments-section">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-subtitle">DEPARTAMENTOS</h2>
          <h3 className="section-title">Nuestros Servicios Médicos</h3>
          <p className="section-description">
            Contamos con diversas especialidades médicas para el cuidado integral de tu salud.
          </p>
        </div>

        <div className="department-selector">
          {/* Miniaturas en fila horizontal con scroll */}
          <div className="department-thumbnails">
            {departments.map((dept) => (
              <div 
                key={dept.id}
                className={`department-thumbnail ${activeDepartment === dept.id ? 'active' : ''}`}
                onClick={() => setActiveDepartment(dept.id)}
              >
                <img src={dept.image} alt={dept.title} />
                <div className="thumbnail-title">{dept.title}</div>
              </div>
            ))}
          </div>

          {/* Contenido dinámico debajo */}
          {activeDepartment !== null && (
            <div className="department-content">
              <button 
                className="close-btn"
                onClick={() => setActiveDepartment(null)}
                aria-label="Cerrar detalle de departamento"
              >
                ×
              </button>
              
              <h4 className="department-title">{departments[activeDepartment].title}</h4>
              <p className="department-description">{departments[activeDepartment].description}</p>
              
              <div className="department-services">
                {departments[activeDepartment].services.map((service, index) => (
                  <div key={index} className="service-item">
                    <span className="check-icon">✓</span>
                    <span>{service}</span>
                  </div>
                ))}
              </div>
              
              <button className="know-more-btn">Ver más</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Departments;
