import '@fortawesome/fontawesome-free/css/all.min.css';
import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
<<<<<<< HEAD
import Carrito from './components/Carrito';
import Home from './components/home';
import Login from './components/login';
import ProductsList from './components/ProductsList';
import RegistrarAdmin from './components/RegistrarAdmin';
import Registro from './components/registro';
import Rifa from './components/rifa';
import VistaGanadores from './components/vista_ganadores';
=======
import Carrito from './pages/Car';
import Home from './pages/home';
import Login from './pages/login';
import ProductsList from './pages/ProductsList';
import RegistrarAdmin from './pages/RegisterAdmin';
import Registro from './pages/Register';
import Header from './components/Header';
import Footer from './components/Footer';
>>>>>>> master
import './styles/App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
<<<<<<< HEAD
=======
      <Header />
>>>>>>> master
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/registrar_Admin" element={<RegistrarAdmin />} />
<<<<<<< HEAD
        <Route path="/rifa" element={<Rifa />} />
        <Route path="/list" element={<ProductsList />} />
        <Route path="/car" element={<Carrito />} />
        <Route path="/ganadores" element={<VistaGanadores />} />
      </Routes>
=======
        <Route path="/list" element={<ProductsList />} />
        <Route path="/car" element={<Carrito />} />
      </Routes>
      <Footer />
>>>>>>> master
    </Router>
  );
}

export default App;
