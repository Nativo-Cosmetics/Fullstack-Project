import { Link } from 'react-router-dom'
import './store.css'

const Catalog = () => {
  return (
    <section className='store-catalog-preview'>
      <div className='store-catalog-content'>
        <h2>Catálogo de productos</h2>
        <p>Explora nuestro catálogo completo de productos de cuidado personal y encuentra shampoo, jabones, acondicionadores y cremas especialmente seleccionados.</p>
        <Link className='redirectBtn bookingBtn' to='/catalogo'>Ver catálogo completo</Link>
      </div>
    </section>
  )
}

export default Catalog
