import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProductView.css";

const MOCK_PRODUCT = {
  name: "Nombre del producto genérico",
  price: 89990,
  rating: 4.5,
  reviewCount: 128,
  stock: true,
  image: null,
};

function Stars({ rating, size = 16 }) {
  return (
    <div className="stars-row">
      {[1, 2, 3, 4, 5].map((n) => (
        <svg
          key={n}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={n <= Math.floor(rating) ? "#EF9F27" : n - 0.5 <= rating ? "url(#half)" : "none"}
          stroke="#EF9F27"
          strokeWidth={1.5}
          strokeLinejoin="round"
        >
          <defs>
            <linearGradient id="half">
              <stop offset="50%" stopColor="#EF9F27" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  );
}

function Toast({ message, visible }) {
  return (
    <div className={`toast ${visible ? "toast-visible" : ""}`}>
      ✓ {message}
    </div>
  );
}

export default function ProductView() {
  const { productId } = useParams();

  const [product, setProduct] = useState(MOCK_PRODUCT);
  const [loading, setLoading] = useState(false);
  const [qty, setQty] = useState(1);
  const [wished, setWished] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: "" });

  // ─── Fetch producto (conectar al backend) ───
  useEffect(() => {
    if (!productId) return;
    setLoading(true);

    // TODO: reemplazar con fetch real
    // fetch(`/api/products/${productId}`)
    //   .then(res => res.json())
    //   .then(data => setProduct(data))
    //   .finally(() => setLoading(false));

    setProduct(MOCK_PRODUCT);
    setLoading(false);
  }, [productId]);

  const showToast = (msg) => {
    setToast({ visible: true, message: msg });
    setTimeout(() => setToast({ visible: false, message: "" }), 2500);
  };

  // ─── Agregar al carrito (conectar al backend) ───
  const addToCart = async () => {
    // TODO: reemplazar con fetch real
    // await fetch('/api/cart', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ productId, quantity: qty }),
    // });

    showToast(`${qty} producto${qty > 1 ? "s" : ""} agregado${qty > 1 ? "s" : ""} al carrito`);
  };

  if (loading) return <div className="product-loading">Cargando producto...</div>;
  if (!product) return <div className="product-loading">Producto no encontrado.</div>;

  return (
    <div className="product-page">
      <div className="product-wrap">

        {/* Imagen */}
        <div className="image-col">
          <div className="img-area">
            {product.image ? (
              <img src={product.image} alt={product.name} className="img-main" />
            ) : (
              <>
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth={1}>
                  <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.57a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.57a2 2 0 00-1.34-2.23z" />
                </svg>
                <span className="img-placeholder-text">imagen del producto</span>
              </>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="info-col">
          <div className="stock-badge">{product.stock ? "✓ En stock" : "✗ Sin stock"}</div>

          <div className="name-price-group">
            <h1 className="product-name">{product.name}</h1>
            <span className="price">${product.price?.toLocaleString("es-CL")}</span>
          </div>

          <hr className="divider" />

          <div className="rating-row">
            <Stars rating={product.rating} size={18} />
            <span className="rating-count">{product.rating} · {product.reviewCount} reseñas</span>
          </div>

          <hr className="divider" />

          {/* Cantidad y carrito */}
          <div className="option-group">
            <span className="section-label">Cantidad</span>
            <div className="cart-row">
              <div className="qty-ctrl">
                <button className="qty-btn" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Disminuir">−</button>
                <span className="qty-val">{qty}</span>
                <button className="qty-btn" onClick={() => setQty((q) => q + 1)} aria-label="Aumentar">+</button>
              </div>
              <button
                className="add-btn"
                style={{ opacity: product.stock ? 1 : 0.5, cursor: product.stock ? "pointer" : "not-allowed" }}
                onClick={addToCart}
                disabled={!product.stock}
              >
                Agregar al carrito
              </button>
              <button
                className={`wish-btn ${wished ? "wish-btn-active" : ""}`}
                onClick={() => setWished((w) => !w)}
                aria-label="Favoritos"
              >
                {wished ? "♥" : "♡"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Toast message={toast.message} visible={toast.visible} />
    </div>
  );
}