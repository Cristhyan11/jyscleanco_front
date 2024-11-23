import React, { useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import Header from './Header';

Modal.setAppElement('#root');

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/home');
  };

  const handleRegisterClick = () => {
    navigate('/registro');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', { email, password });
    try {
      const response = await fetch('https://jyscleanco-back.vercel.app/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();
      console.log('Respuesta del servidor:', result);
      if (result.status === 'Bienvenido') {
        localStorage.setItem('user_id', result._id);
        localStorage.setItem('user', result.user);
        localStorage.setItem('role', result.role);
        if (onLoginSuccess) {
          onLoginSuccess();
        }
        if (result.role === 'client') {
          navigate('/list');
        } else {
          navigate('/ganadores');
        }
        setModalMessage('Bienvenido');
        setTimeout(() => {
          closeModal();
        }, 2000);
      } else {
        setModalMessage(result.message || 'No es bienvenido');
      }
    } catch (error) {
      console.error('Error:', error);
      setModalMessage('Error en las credenciales');
    }
  };

  const closeModal = () => {
    setModalMessage('');
  };

  return (
    <div className="login-page">
      <Header />
      <div className="form-container">
        <form onSubmit={handleSubmit} className="ai-agent-form">
          <h2 className="form-title">Entrar</h2>
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
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-button">Login</button>
          <button type="button" className="submit-button" onClick={handleRegisterClick}>Registrar</button>
          <button type="button" className="submit-button" onClick={handleHomeClick}>Home</button>
        </form>
        <Modal
          isOpen={!!modalMessage}
          onRequestClose={closeModal}
          contentLabel="Message Modal"
          className="modal"
          overlayClassName="overlay"
        >
          <div className="modal-content">
            <h2>Mensaje</h2>
            <p>{modalMessage}</p>
            <button onClick={closeModal} className="submit-button">Cerrar</button>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default Login;
