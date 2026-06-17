import { useState, useEffect } from "react";
import "./reviewsProduct.css";

// ─── Datos de ejemplo (reemplazar cuando el backend esté listo) ───
const MOCK_REVIEWS = [
    {
    id: 1,
    initials: "MA",
    name: "María A.",
    date: "hace 3 días",
    rating: 5,
    body: "Excelente producto. La calidad superó mis expectativas y llegó muy bien empaquetado. Lo recomiendo totalmente.",
    helpful: 12,
    notHelpful: 1,
    avatarColor: "#DBEAFE",
    avatarTextColor: "#1D4ED8",
    },
    {
        id: 2,
        initials: "JR",
        name: "Jorge R.",
        date: "hace 1 semana",
        rating: 4,
        body: "Muy bueno en general. El envío tardó un poco más de lo esperado, pero el producto en sí es de buena calidad. Volvería a comprar.",
        helpful: 8,
        notHelpful: 0,
        avatarColor: "#FEF3C7",
        avatarTextColor: "#92400E",
    },
    {
        id: 3,
        initials: "CL",
        name: "Catalina L.",
        date: "hace 2 semanas",
        rating: 3,
        body: "El producto cumple su función pero las tallas son un poco pequeñas. Recomendaría pedir una talla más de lo normal.",
        helpful: 22,
        notHelpful: 2,
        avatarColor: "#D1FAE5",
        avatarTextColor: "#065F46",
    },
];

const RATING_BARS = [
    { star: 5, pct: 70 },
    { star: 4, pct: 18 },
    { star: 3, pct: 7 },
    { star: 2, pct: 3 },
    { star: 1, pct: 2 },
];

// ─── Componente Stars ───
function Stars({ rating, size = 16 }) {
  return (
    <div className="rv-stars-row">
      {[1, 2, 3, 4, 5].map((n) => (
        <svg
          key={n}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={n <= Math.floor(rating) ? "#EF9F27" : n - 0.5 <= rating ? "url(#half-rv)" : "none"}
          stroke="#EF9F27"
          strokeWidth={1.5}
          strokeLinejoin="round"
        >
          <defs>
            <linearGradient id="half-rv">
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

// ─── Componente ReviewCard ───
function ReviewCard({ review }) {
  const [helpful, setHelpful] = useState(review.helpful);
  const [notHelpful, setNotHelpful] = useState(review.notHelpful);
  const [voted, setVoted] = useState(null);

  const vote = (type) => {
    if (voted) return;
    if (type === "yes") setHelpful((n) => n + 1);
    else setNotHelpful((n) => n + 1);
    setVoted(type);
  };

  return (
    <div className="rv-card">
      <div className="rv-card-top">
        <div className="rv-reviewer">
          <div
            className="rv-avatar"
            style={{ background: review.avatarColor, color: review.avatarTextColor }}
          >
            {review.initials}
          </div>
          <div>
            <div className="rv-name">{review.name}</div>
            <div className="rv-date">{review.date}</div>
          </div>
        </div>
        <Stars rating={review.rating} size={14} />
      </div>
      <p className="rv-body">{review.body}</p>
      <div className="rv-helpful">
        <span>¿Fue útil?</span>
        <button
          className="rv-help-btn"
          style={{ opacity: voted && voted !== "yes" ? 0.4 : 1 }}
          onClick={() => vote("yes")}
        >
          👍 Sí ({helpful})
        </button>
        <button
          className="rv-help-btn"
          style={{ opacity: voted && voted !== "no" ? 0.4 : 1 }}
          onClick={() => vote("no")}
        >
          👎 No ({notHelpful})
        </button>
      </div>
    </div>
  );
}

// ─── Componente principal Reviews ───
export default function Reviews({ productId, rating, reviewCount }) {
  const [reviews, setReviews] = useState(MOCK_REVIEWS);
  const [showForm, setShowForm] = useState(false);
  const [starPick, setStarPick] = useState(0);
  const [hoverStar, setHoverStar] = useState(0);
  const [reviewText, setReviewText] = useState("");

  // ─── Fetch reseñas (conectar al backend) ───
  useEffect(() => {
    if (!productId) return;

    // TODO: reemplazar con fetch real
    // fetch(`/api/products/${productId}/reviews`)
    //   .then(res => res.json())
    //   .then(data => setReviews(data));

    setReviews(MOCK_REVIEWS);
  }, [productId]);

  // ─── Publicar reseña (conectar al backend) ───
  const submitReview = async () => {
    if (!reviewText.trim() || starPick === 0) {
      alert("Por favor selecciona una puntuación y escribe un comentario.");
      return;
    }

    const newReview = {
      id: Date.now(),
      initials: "TÚ",
      name: "Tú",
      date: "ahora mismo",
      rating: starPick,
      body: reviewText.trim(),
      helpful: 0,
      notHelpful: 0,
      avatarColor: "#DBEAFE",
      avatarTextColor: "#1D4ED8",
    };

    // TODO: reemplazar con fetch real
    // await fetch(`/api/products/${productId}/reviews`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ rating: starPick, body: reviewText.trim() }),
    // });

    setReviews((prev) => [newReview, ...prev]);
    setReviewText("");
    setStarPick(0);
    setShowForm(false);
  };

  return (
    <div className="rv-section">

      {/* Header */}
      <div className="rv-header">
        <span className="rv-title">Reseñas de clientes</span>
        <button className="rv-write-btn" onClick={() => setShowForm((v) => !v)}>
          ✏️ Escribir reseña
        </button>
      </div>

      {/* Formulario nueva reseña */}
      {showForm && (
        <div className="rv-form">
          <div className="rv-form-title">Tu reseña</div>
          <div className="rv-form-label">Puntuación</div>
          <div className="rv-star-pick">
            {[1, 2, 3, 4, 5].map((n) => (
              <span
                key={n}
                className={`rv-star-item ${n <= (hoverStar || starPick) ? "rv-star-lit" : ""}`}
                onClick={() => setStarPick(n)}
                onMouseEnter={() => setHoverStar(n)}
                onMouseLeave={() => setHoverStar(0)}
              >
                ★
              </span>
            ))}
          </div>
          <div className="rv-form-label">Comentario</div>
          <textarea
            className="rv-textarea"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Cuéntanos tu experiencia con este producto..."
          />
          <button className="rv-submit-btn" onClick={submitReview}>
            Publicar reseña
          </button>
        </div>
      )}

      {/* Resumen calificaciones */}
      <div className="rv-summary">
        <div className="rv-summary-score">
          <div className="rv-big-score">{rating ?? "—"}</div>
          <Stars rating={rating ?? 0} size={16} />
          <div className="rv-count-label">{reviewCount ?? 0} reseñas</div>
        </div>
        <div className="rv-bars">
          {RATING_BARS.map(({ star, pct }) => (
            <div key={star} className="rv-bar-row">
              <span className="rv-bar-label">{star} ★</span>
              <div className="rv-bar-track">
                <div className="rv-bar-fill" style={{ width: `${pct}%` }} />
              </div>
              <span className="rv-bar-pct">{pct}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Lista reseñas */}
      <div className="rv-list">
        {reviews.length === 0 ? (
          <p className="rv-empty">Aún no hay reseñas para este producto.</p>
        ) : (
          reviews.map((r) => <ReviewCard key={r.id} review={r} />)
        )}
      </div>
    </div>
  );
}