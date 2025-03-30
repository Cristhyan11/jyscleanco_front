import React, { useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import '../styles/registro.css';

Modal.setAppElement('#root');

function Registro() {
  const [nombre, setNombre] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [cedula, setCedula] = useState('');
  const [celular, setCelular] = useState('');
  const [email, setEmail] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [apartamento, setApartamento] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', { nombre, fechaNacimiento, cedula, celular, email, ciudad, password, confirmPassword });

 // Validar nombre solo con letras
    const nombreRegex = /^[A-Za-z\s]+$/;
    if (!nombreRegex.test(nombre)) {
      setModalMessage('El nombre solo puede contener letras.');
      return;
    }

    // Validar fecha de nacimiento para mayores de 18 años
    const currentDate = new Date();
    const birthDate = new Date(fechaNacimiento);
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDifference = currentDate.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())) {
      age--;
    }
    if (age < 18) {
      setModalMessage('Debes tener al menos 18 años para registrarte.');
      return;
    }

    if (!email.includes('@')) {
      setModalMessage('El correo electrónico debe contener un @.');
      return;
    }

    if (password.length < 7 || /[^A-Za-z0-9]/.test(password)) {
      setModalMessage('La contraseña debe tener al menos 7 caracteres y no debe contener caracteres especiales.');
      return;
    }

    if (password !== confirmPassword) {
      setModalMessage('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, fechaNacimiento, cedula, celular, email, ciudad, apartamento, password })
      });
      const result = await response.json();
      if (result.status === "UsuarioRegistrado") {
        console.log(`User: ${result.user}, Role: ${result.role}`);
        localStorage.setItem('user', result.user);
        localStorage.setItem('role', result.role);
        setModalMessage('Su registro es un éxito.');
        setTimeout(() => {
          navigate('/login');
        }, 2000); // Redirect after 2 seconds
      } else {
        setModalMessage(result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setModalMessage('Error en el registro');
    }
  };

  const handleCelularChange = (e) => {
    let value = e.target.value;
    value = value.replace(/\D/g, ''); // Remove non-numeric characters
    if (value.length > 3) {
      value = `${value.slice(0, 3)}-${value.slice(3)}`;
    }
    setCelular(value);
  };

  const closeModal = () => {
    setModalMessage('');
  };

  const ciudadesPorApartamento =
  {
    'Amazonas': ['Leticia', 'Puerto Nariño'],
    'Antioquia': ['Medellín', 'Bello', 'Itagüí', 'Envigado', 'Rionegro'],
    'Arauca': ['Arauca', 'Tame', 'Saravena', 'Arauquita'],
    'Atlántico': ['Barranquilla', 'Soledad', 'Malambo', 'Puerto Colombia'],
    'Bolívar': ['Cartagena', 'Magangué', 'Turbaco', 'Arjona'],
    'Boyacá': ['Tunja', 'Duitama', 'Sogamoso', 'Chiquinquirá'],
    'Caldas': ['Manizales', 'Villamaría', 'Chinchiná', 'La Dorada'],
    'Caquetá': ['Florencia', 'San Vicente del Caguán', 'Cartagena del Chairá'],
    'Casanare': ['Yopal', 'Aguazul', 'Villanueva', 'Tauramena'],
    'Cauca': ['Popayán', 'Santander de Quilichao', 'Puerto Tejada'],
    'Cesar': ['Valledupar', 'Aguachica', 'La Jagua de Ibirico'],
    'Chocó': ['Quibdó', 'Istmina', 'Tadó'],
    'Córdoba': ['Montería', 'Cereté', 'Lorica', 'Sahagún'],
    'Cundinamarca': ['Bogotá', 'Soacha', 'Fusagasugá', 'Zipaquirá'],
    'Guainía': ['Inírida'],
    'Guaviare': ['San José del Guaviare'],
    'Huila': ['Neiva', 'Pitalito', 'Garzón'],
    'La Guajira': ['Riohacha', 'Maicao', 'Uribia'],
    'Magdalena': ['Santa Marta', 'Ciénaga', 'Fundación'],
    'Meta': ['Villavicencio', 'Granada', 'Acacías'],
    'Nariño': ['Pasto', 'Tumaco', 'Ipiales'],
    'Norte de Santander': ['Cúcuta', 'Ocaña', 'Pamplona'],
    'Putumayo': ['Mocoa', 'Puerto Asís', 'Orito'],
    'Quindío': ['Armenia', 'Calarcá', 'Montenegro'],
    'Risaralda': ['Pereira', 'Dosquebradas', 'Santa Rosa de Cabal'],
    'San Andrés y Providencia': ['San Andrés', 'Providencia'],
    'Santander': ['Bucaramanga', 'Floridablanca', 'Girón', 'Piedecuesta'],
    'Sucre': ['Sincelejo', 'Corozal', 'San Marcos'],
    'Tolima': ['Ibagué', 'Espinal', 'Melgar'],
    'Valle del Cauca': ['Cali', 'Buenaventura', 'Palmira', 'Tuluá'],
    'Vaupés': ['Mitú'],
    'Vichada': ['Puerto Carreño', 'La Primavera']
}


  const handleApartamentoChange = (e) => {
    setApartamento(e.target.value);
    setCiudad('');
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="ai-agent-form">
        <h2 className="form-title">Digita Tus Datos</h2>
        <div className="form-columns">
          <div className="column">
            <div className="form-group">
              <label htmlFor="nombre">Nombre y apellido</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
              <input
                type="date"
                id="fechaNacimiento"
                name="fechaNacimiento"
                value={fechaNacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="cedula">Cédula</label>
              <input
                type="text"
                id="cedula"
                name="cedula"
                value={cedula}
                onChange={(e) => setCedula(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="celular">Celular</label>
              <input
                type="text"
                id="celular"
                name="celular"
                value={celular}
                onChange={handleCelularChange}
                required
              />
            </div>
          </div>
          <div className="column">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="apartamento">Apartamento</label>
              <select
                id="apartamento"
                name="apartamento"
                value={apartamento}
                onChange={handleApartamentoChange}
                required
              >
                <option value="">Seleccione</option>
                {Object.keys(ciudadesPorApartamento).map((region) => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="ciudad">Ciudad</label>
              <select
                id="ciudad"
                name="ciudad"
                value={ciudad}
                onChange={(e) => setCiudad(e.target.value)}
                required
              >
                <option value="">Seleccione</option>
                {ciudadesPorApartamento[apartamento]?.map((city, index) => (
                  <option key={index} value={city}>{city}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmar Contraseña</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
        </div>
      </div>
    </div>
    <button type="submit" className="submit-button">Registrar</button>
    <label htmlFor="">                     </label>
    <button type="button" className="submit-button" onClick={() => navigate('/home')}>Home</button>
    </form>

      <Modal
        isOpen={!!modalMessage}
        onRequestClose={closeModal}
        contentLabel="Message Modal"
        className="modal1"
        overlayClassName="overlay"
      >
        <div className="modal-content">
          <h2>Mensaje</h2>
          <p>{modalMessage}</p>
          <button onClick={closeModal} className="submit-button">Cerrar</button>
        </div>
      </Modal>
    </div>
  );
}

export default Registro;
