// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Citas from './pages/Citas';
import FormCitas from './components/FormCitas'


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/citas" element={<Citas />} />
          <Route path="/citas/nueva" element={<FormCitas />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;