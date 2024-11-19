import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import '../styles/ProductsList.css';

Modal.setAppElement('#root');

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [user_id] = useState(localStorage.getItem('user_id'));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/list');
        const result = await response.json();
        if (result.status === 'Success') {
          setProducts(result.data);
        } else {
          console.error('Error al obtener productos:', result.message);
        }
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    setSelectedProduct(product);
    setModalIsOpen(true);
  };

  const addToCart = async () => {
    if (!selectedProduct) return;
    try {
      const response = await fetch('http://localhost:5000/api/list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user_id,
          producto_id: selectedProduct._id,
          cantidad: quantity,
          fecha_hora: new Date().toISOString(),
        }),
      });

      const result = await response.json();
      if (result.status === 'Success') {
        setModalContent(`${selectedProduct.nombre} ha sido agregado al carrito.`);
      } else {
        console.error('Error al agregar producto al carrito:', result.message);
        setModalContent('Error al agregar producto al carrito.');
      }
    } catch (error) {
      console.error('Error al agregar producto al carrito:', error);
      setModalContent('Error al agregar producto al carrito.');
    } finally {
      setModalIsOpen(false);
      setQuantity(1); // Reset quantity
    }
  };

  const goToCart = () => {
    navigate('/car'); // Redirigir a la ruta /cart (carrito)
  };

  return (
    <section className="productos-lista">
      <h2>Productos Disponibles</h2>
      <div className="productos-grid">
        {products.map(product => (
          <div className="producto" key={product._id}>
            <img src={`http://localhost:5000/images/${product.image}`} alt={product.nombre} className="producto-imagen" />
            <h3 className="producto-nombre">{product.nombre}</h3>
            <p className="producto-precio">Precio: ${product.precio}</p>
            <p className="producto-descripcion">{product.description}</p>
            <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>Agregar al carrito</button>
          </div>
        ))}
      </div>
      <button onClick={goToCart} className="go-to-cart-btn">Ir al carrito</button> {/* Botón para ir al carrito */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Seleccione cantidad"
        className="modal"
        overlayClassName="overlay"
      >
        {selectedProduct && (
          <div>
            <h2>{`Agregar ${selectedProduct.nombre} al carrito`}</h2>
            <label>
              Cantidad:
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                min="1"
              />
            </label>
            <button onClick={addToCart}>Agregar</button>
            <button onClick={() => setModalIsOpen(false)}>Cancelar</button>
          </div>
        )}
        {modalContent && <h2>{modalContent}</h2>}
      </Modal>
    </section>
  );
};

export default ProductsList;
