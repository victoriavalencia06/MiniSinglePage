// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Departaments from './components/Departments';
import Contact from './components/Contact';
import AboutUs from './components/AboutUs';
import Citas from './pages/Citas';
import FormCitas from './components/FormCitas'


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servicios" element={<Departaments />} />
          <Route path="/contactanos" element={<Contact />} />
          <Route path="/sobre-nosotros" element={<AboutUs />} />
          <Route path="/citas" element={<Citas />} />
          <Route path="/citas/nueva" element={<FormCitas />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;