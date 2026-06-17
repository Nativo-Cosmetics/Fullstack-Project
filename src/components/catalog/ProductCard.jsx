import { Link } from 'react-router-dom'
import styles from './ProductCard.module.css'

const formatPrice = (price) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
  }).format(price)
}

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={product.imagen} alt={product.nombreProducto} className={styles.image} />
        <span className={styles.categoryBadge}>{product.categoria}</span>
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{product.nombreProducto}</h3>
        <p className={styles.price}>{formatPrice(product.precio)}</p>
        <div className={styles.actions}>
          <Link className={styles.detailButton} to={`/catalogo/${product._id}`}>
            Ver detalle
          </Link>
          <button className={styles.cartButton} type='button' onClick={() => onAddToCart(product)}>
            Agregar al Carrito
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
