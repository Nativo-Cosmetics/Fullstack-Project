import ProductCard from './ProductCard.jsx'
import styles from './ProductGrid.module.css'

const ProductGrid = ({ products, onAddToCart }) => {
  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <ProductCard key={product._id} product={product} onAddToCart={onAddToCart} />
      ))}
    </div>
  )
}

export default ProductGrid
