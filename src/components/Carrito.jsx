import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/carrito.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [user_id] = useState(localStorage.getItem('user_id'));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/car?user_id=${user_id}`);
        const result = await response.json();
        if (result.status === 'Success') {
          setCartItems(result.data);
        } else {
          console.error('Error al obtener productos del carrito:', result.message);
        }
      } catch (error) {
        console.error('Error al obtener productos del carrito:', error);
      }
    };

    fetchCartItems();
  }, [user_id]);

  const removeItem = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/car/${id}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (result.status === 'Success') {
        setCartItems(cartItems.filter(item => item._id !== id));
      } else {
        console.error('Error al eliminar producto del carrito:', result.message);
      }
    } catch (error) {
      console.error('Error al eliminar producto del carrito:', error);
    }
  };

  return (
    <section className="carrito">
      <h2>Tu Carrito</h2>
      <div className="carrito-items">
        {cartItems.map(item => (
          <div className="carrito-item" key={item._id}>
            <img src={`http://localhost:5000/images/${item.image}`} alt={item.nombre} className="carrito-imagen" />
            <h3 className="carrito-nombre">{item.nombre}</h3>
            <p className="carrito-precio">Precio: ${item.precio}</p>
            <p className="carrito-descripcion">{item.description}</p>
            <p className="carrito-cantidad">Cantidad: {item.quantity}</p>
            <button className="remove-from-cart-btn" onClick={() => removeItem(item._id)}>Eliminar</button>
          </div>
        ))}
      </div>
      <button onClick={() => navigate('/list')} className="go-to-home-btn">Volver a la tienda</button> {/* Botón para regresar a la tienda */}
    </section>
  );
};

export default Cart;
