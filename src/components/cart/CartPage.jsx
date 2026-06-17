import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import UserNav from '../navigation/userNav';
import CartLogo from '../../assets/icons/cart-2-svgrepo-com.svg'
import './cart.css'

// ─── Datos de ejemplo (reemplazar por los datos reales cuando el backend esté listo) ───
const MOCK_PRODUCTS = [
  { id: 1, name: 'Nombre del Producto 1', price: 3500, img: null },
  { id: 2, name: 'Nombre del Producto 2', price: 7200, img: null },
  { id: 3, name: 'Nombre del Producto 3', price: 1990, img: null },
];

function Cart() {
  const navigate = useNavigate();

  const [products, setProducts] = useState(
    MOCK_PRODUCTS.map(p => ({ ...p, quantity: 1, selected: false }))
  );

  const toggleSelect = (id) => {
    setProducts(prev =>
      prev.map(p => p.id === id ? { ...p, selected: !p.selected } : p)
    );
  };

  const changeQuantity = (id, delta) => {
    setProducts(prev =>
      prev.map(p => {
        if (p.id !== id) return p;
        return { ...p, quantity: Math.max(1, p.quantity + delta) };
      })
    );
  };

  const removeProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const removeAll = () => setProducts([]);

  const selectedProducts = products.filter(p => p.selected);
  const subtotal = selectedProducts.reduce((acc, p) => acc + p.price * p.quantity, 0);

  const handleCheckout = () => {
    navigate('/user/payment', {
      state: { selectedProducts, subtotal }
    });
  };

  return (
    <>
      <div>
        {/* Título */}
        <div className='title-container'>
          <img src={CartLogo} alt="logo para carrito" width='100px' />
          <div className='title-cart'>
            <h1>Carrito De Compras</h1>
          </div>
        </div>

        <br />

        <div className='cart-container'>
          {/* ─── Lista de productos ─── */}
          <div className='products-list'>
            {products.length === 0 ? (
              <div className='empty-cart'>
                <p>No hay productos en el carrito.</p>
              </div>
            ) : (
              products.map(product => (
                <div
                  key={product.id}
                  className={`products-container ${product.selected ? 'product-selected' : ''}`}
                >
                  {/* Barra izquierda + botón circular centrado */}
                  <div className='product-selector-bar'>
                    <button
                      className={`product-selector-btn ${product.selected ? 'selector-active' : ''}`}
                      onClick={() => toggleSelect(product.id)}
                      title={product.selected ? 'Deseleccionar' : 'Seleccionar'}
                      aria-label={product.selected ? 'Deseleccionar producto' : 'Seleccionar producto'}
                    />
                  </div>

                  <div className='product-container'>

                    {/* Imagen */}
                    <div className='product-img'>
                      <img
                        src={product.img || CartLogo}
                        alt={`imagen de ${product.name}`}
                        width="106px"
                        height="94px"
                      />
                    </div>

                    {/* Nombre con link a la vista del producto */}
                    <div className='product-name'>
                      <Link to={`/user/product/${product.id}`} className='product-name-link'>
                        <h2>{product.name}</h2>
                      </Link>
                    </div>

                    {/* Precio */}
                    <div className='product-price'>
                      <p>${(product.price * product.quantity).toLocaleString('es-CL')}</p>
                      {product.quantity > 1 && (
                        <span className='unit-price'>
                          ${product.price.toLocaleString('es-CL')} c/u
                        </span>
                      )}
                    </div>

                    {/* Botón eliminar */}
                    <div className='product-delete'>
                      <button onClick={() => removeProduct(product.id)} aria-label="Eliminar producto">✕</button>
                    </div>

                    {/* Contador */}
                    <div className='product-counter'>
                      <div className="counterProducts">
                        <button onClick={() => changeQuantity(product.id, 1)}>+</button>
                        <span>{product.quantity}</span>
                        <button onClick={() => changeQuantity(product.id, -1)}>−</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Vaciar carrito */}
            {products.length > 0 && (
              <div className='remove-all-container'>
                <button className='btn-remove-all' onClick={removeAll}>
                  Vaciar carrito
                </button>
              </div>
            )}
          </div>

          {/* ─── Resumen de compra ─── */}
          <div className='resume-cart'>
            <h1>Resumen de Compra</h1>

            {selectedProducts.length === 0 ? (
              <p className='resume-empty'>Seleccioná los productos que querés comprar.</p>
            ) : (
              <ul className='resume-list'>
                {selectedProducts.map(p => (
                  <li key={p.id} className='resume-item'>
                    <span className='resume-item-name'>{p.name}</span>
                    <span className='resume-item-qty'>x{p.quantity}</span>
                    <span className='resume-item-price'>
                      ${(p.price * p.quantity).toLocaleString('es-CL')}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            <div className='resume-divider' />
            <div className='resume-total'>
              <span>Total</span>
              <span>${subtotal.toLocaleString('es-CL')}</span>
            </div>

            <button
              className='btn-checkout'
              disabled={selectedProducts.length === 0}
              onClick={handleCheckout}
            >
              Proceder al pago →
            </button>
          </div>

        </div>
      </div>
    </>
  );
}

export default Cart;