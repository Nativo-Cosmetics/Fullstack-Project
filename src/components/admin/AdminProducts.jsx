import { useEffect, useState } from 'react'
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../catalog/api.js'
import './AdminShared.css'
import './AdminProducts.css'

const AdminProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    nombreProducto: '',
    descripcionProducto: '',
    precio: '',
    categoria: '',
    imagen: '',
    stock: '',
  })

  // Cargar productos al montar componente
  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await fetchProducts({ page: 1, limit: 100 })
      setProducts(response.products)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const resetForm = () => {
    setFormData({
      nombreProducto: '',
      descripcionProducto: '',
      precio: '',
      categoria: '',
      imagen: '',
      stock: '',
    })
    setEditingId(null)
    setShowForm(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Validación
    if (!formData.nombreProducto || !formData.descripcionProducto || !formData.precio || !formData.categoria || !formData.imagen) {
      setError('Todos los campos excepto stock son obligatorios')
      return
    }

    const precio = parseFloat(formData.precio)
    if (isNaN(precio) || precio < 0) {
      setError('Precio debe ser un número válido')
      return
    }

    const stock = formData.stock ? parseInt(formData.stock, 10) : 0
    if (isNaN(stock) || stock < 0) {
      setError('Stock debe ser un número válido')
      return
    }

    try {
      const productData = {
        nombreProducto: formData.nombreProducto,
        descripcionProducto: formData.descripcionProducto,
        precio,
        categoria: formData.categoria,
        imagen: formData.imagen,
        stock,
      }

      if (editingId) {
        // Actualizar
        await updateProduct(editingId, productData)
      } else {
        // Crear
        await createProduct(productData)
      }

      await loadProducts()
      resetForm()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleEdit = (product) => {
    setFormData({
      nombreProducto: product.nombreProducto,
      descripcionProducto: product.descripcionProducto,
      precio: product.precio.toString(),
      categoria: product.categoria,
      imagen: product.imagen,
      stock: (product.stock || 0).toString(),
    })
    setEditingId(product._id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      try {
        setError('')
        await deleteProduct(id)
        await loadProducts()
      } catch (err) {
        setError(err.message)
      }
    }
  }

  const handleNewProduct = () => {
    resetForm()
    setShowForm(true)
  }

  return (
    <div className='admin-container'>
      <div className='admin-header'>
        <h1>Gestión de Productos</h1>
        <button className='btn-new' onClick={handleNewProduct}>
          + Nuevo Producto
        </button>
      </div>

      {error && <div className='error-message'>{error}</div>}

      {showForm && (
        <div className='form-container'>
          <div className='form-header'>
            <h2>{editingId ? 'Editar Producto' : 'Crear Producto'}</h2>
            <button className='btn-close' onClick={resetForm}>×</button>
          </div>

          <form onSubmit={handleSubmit} className='product-form'>
            <div className='form-group'>
              <label>Nombre del Producto *</label>
              <input
                type='text'
                name='nombreProducto'
                value={formData.nombreProducto}
                onChange={handleInputChange}
                placeholder='Ej: Shampoo Nutritivo'
                required
              />
            </div>

            <div className='form-group'>
              <label>Descripción *</label>
              <textarea
                name='descripcionProducto'
                value={formData.descripcionProducto}
                onChange={handleInputChange}
                placeholder='Descripción del producto'
                rows='3'
                required
              />
            </div>

            <div className='form-group'>
              <label>Precio (ARS) *</label>
              <input
                type='number'
                name='precio'
                value={formData.precio}
                onChange={handleInputChange}
                placeholder='0'
                step='0.01'
                min='0'
                required
              />
            </div>

            <div className='form-group'>
              <label>Categoría *</label>
              <select
                name='categoria'
                value={formData.categoria}
                onChange={handleInputChange}
                required
              >
                <option value=''>Selecciona una categoría</option>
                <option value='Capilar'>Capilar</option>
                <option value='Cremas'>Cremas</option>
                <option value='Higiene'>Higiene</option>
              </select>
            </div>

            <div className='form-group'>
              <label>URL de Imagen *</label>
              <input
                type='url'
                name='imagen'
                value={formData.imagen}
                onChange={handleInputChange}
                placeholder='https://ejemplo.com/imagen.jpg'
                required
              />
            </div>

            <div className='form-group'>
              <label>Stock</label>
              <input
                type='number'
                name='stock'
                value={formData.stock}
                onChange={handleInputChange}
                placeholder='0'
                min='0'
              />
            </div>

            <div className='form-actions'>
              <button type='submit' className='btn-submit'>
                {editingId ? 'Actualizar' : 'Crear'}
              </button>
              <button type='button' className='btn-cancel' onClick={resetForm}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {loading && <p className='loading'>Cargando productos...</p>}

      {!loading && products.length === 0 && <p className='empty-message'>No hay productos registrados</p>}

      {!loading && products.length > 0 && (
        <div className='products-table'>
          <div className='table-header'>
            <div className='col-nombre'>Nombre</div>
            <div className='col-categoria'>Categoría</div>
            <div className='col-precio'>Precio</div>
            <div className='col-stock'>Stock</div>
            <div className='col-acciones'>Acciones</div>
          </div>

          <div className='table-body'>
            {products.map(product => (
              <div key={product._id} className='table-row'>
                <div className='col-nombre'>{product.nombreProducto}</div>
                <div className='col-categoria'>{product.categoria}</div>
                <div className='col-precio'>CLP ${product.precio.toLocaleString('es-CL')}</div>
                <div className='col-stock'>{product.stock || 0}</div>
                <div className='col-acciones'>
                  <button
                    className='btn-edit'
                    onClick={() => handleEdit(product)}
                  >
                    Editar
                  </button>
                  <button
                    className='btn-delete'
                    onClick={() => handleDelete(product._id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminProducts
