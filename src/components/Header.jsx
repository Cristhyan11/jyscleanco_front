import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Logoclean3.jpg';
import '../styles/Header.css';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="header-section">
      <div className="center">
        <div className="logo-container">
          <img src={logo} alt="Logo J&L Clean Co" className="logo" />
          <h1 className="company-name">J&L Clean Co</h1>
        </div>
        <div className="icon-container">
          <button className="icon-button" onClick={() => navigate('/car')} title="Carrito de compras" aria-label="Carrito de compras">
            <i className="fas fa-shopping-cart" aria-hidden="true"></i>
          </button>
          <button className="icon-button" onClick={() => navigate('/login')} title="Iniciar sesión / Registrarse" aria-label="Iniciar sesión / Registrarse">
            <i className="fas fa-user" aria-hidden="true"></i>
          </button>
          <button className="icon-button" onClick={() => navigate('/mensajeria')} title="Contacto" aria-label="Contacto">
            <i className="fas fa-envelope" aria-hidden="true"></i>
          </button>
        </div>
        <div className="search-container">
          <input className="search" type="text" name="search" placeholder="Buscar productos..." aria-label="Buscar productos" />
          <button type="submit" className="search-btn" title="Buscar">
            <i className="fas fa-search" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
