import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import '../styles/rifa.css';

Modal.setAppElement('#root');

function Rifa() {
  const [numero, setNumero] = useState('');
  const [registros, setRegistros] = useState([]);
  const [user_id] = useState(localStorage.getItem('user_id'));
  const [loading, setLoading] = useState(true);
  const [intentos, setIntentos] = useState(0);
  const [modalMessage, setModalMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem('role');
    if (userRole?.toLowerCase() !== 'client') {
      navigate('/');
      return;
    }
    console.log("User_id", user_id);

    const fetchRegistros = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/rifa?user_id=${user_id}`);
        const result = await response.json();
        if (result.status === "Success") {
          setRegistros(result.data);
          setIntentos(result.data.length);
        } else {
          setRegistros([]);
        }
      } catch (error) {
        console.error('Error al obtener registros:', error);
        setRegistros([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRegistros();
  }, [navigate, user_id]);

  const handleRegister = async () => {
    if (intentos >= 5) {
      setModalMessage('Has alcanzado el límite de 5 intentos');
      return;
    }
    if (!/^[1-9]\d{0,2}$/.test(numero)) { // Validar número
      setModalMessage('El número debe ser un entero positivo sin ceros a la izquierda y entre 000 y 999');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/rifa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user_id,
          numero_registrado: numero,
          fecha_hora: new Date().toISOString(),
        }),
      });
      const result = await response.json();
      if (result.status === "RegistroExitoso") {
        setModalMessage('Número registrado exitosamente');
        setRegistros([...registros, result.registro]);
        setNumero('');
        setIntentos(intentos + 1);
      } else if (result.status === "NumeroYaRegistrado") {
        setModalMessage('Número ya registrado');
      } else {
        setModalMessage('Error al registrar el número');
      }
    } catch (error) {
      console.error('Error al registrar número:', error);
      setModalMessage('Error al registrar número');
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setModalMessage('');
  };

  const handleLogout = () => {
    localStorage.removeItem('user_id');
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <div className="rifa-container">
      <h2 className="rifa-title">Registro de Rifa</h2>
      <div className="rifa-input">
        <input
          type="number"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          placeholder="Número (000-999)"
          min="1" // No permitir 0
          max="999"
        />
        <button onClick={handleRegister} className="register-button">Registrar Número</button>
      </div>
      <button onClick={handleLogout} className="logout-button">Cerrar Sesión</button>
      {loading ? (
        <p>Cargando registros...</p>
      ) : (
        <table className="rifa-table">
          <thead>
            <tr>
              <th>Fecha y Hora</th>
              <th>Número Registrado</th>
              <th>Premio</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(registros) && registros.map((registro, index) => (
              <tr key={index}>
                <td>{new Date(registro.fecha_hora).toLocaleString('es-CO', { timeZone: 'America/Bogota' })}</td>
                <td>{registro.numero_registrado}</td>
                <td>{registro.premio_register}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
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
  );
}

export default Rifa;
