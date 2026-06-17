import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/navigation/navbar.jsx'
import Footer from '../components/navigation/footer.jsx'
import ProductDetail from '../components/catalog/ProductDetail.jsx'
import { fetchProductById } from '../components/catalog/api.js'
import styles from './ProductDetailPage.module.css'

const ProductDetailPage = () => {
  const { productId } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true)
      setError('')
      try {
        const productData = await fetchProductById(productId)
        setProduct(productData)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [productId])

  const handleAddToCart = (item) => {
    // Integración futura con módulo carrito
    console.log('Agregar al carrito desde detalle:', item._id)
  }

  return (
    <>
      <Navbar />
      <main className={styles.productDetailPage}>
        {loading && <p className={styles.statusMessage}>Cargando producto...</p>}
        {error && <p className={styles.statusMessage}>{error}</p>}
        {!loading && !error && product && (
          <>
            <ProductDetail product={product} onAddToCart={handleAddToCart} />
            <div className={styles.backButtonWrapper}>
              <Link to='/catalogo' className={styles.backButton}>
                Volver al Catálogo
              </Link>
            </div>
          </>
        )}
      </main>
      <Footer />
    </>
  )
}

export default ProductDetailPage
