import styles from './ProductDetail.module.css'

const formatPrice = (price) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
  }).format(price)
}

const ProductDetail = ({ product, onAddToCart }) => {
  return (
    <section className={styles.detailContainer}>
      <div className={styles.imageSection}>
        <img src={product.imagen} alt={product.nombreProducto} className={styles.image} />
      </div>
      <div className={styles.summarySection}>
        <span className={styles.category}>{product.categoria}</span>
        <h1 className={styles.name}>{product.nombreProducto}</h1>
        <p className={styles.price}>{formatPrice(product.precio)}</p>
        <p className={styles.description}>{product.descripcionProducto}</p>
        <div className={styles.actions}>
          <button type='button' className={styles.addButton} onClick={() => onAddToCart(product)}>
            Agregar al Carrito
          </button>
        </div>
      </div>
    </section>
  )
}

export default ProductDetail
