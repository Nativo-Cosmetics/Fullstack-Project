import React, { useMemo, useState } from 'react'
import './catalog.css'
import { Productos } from '../../data/catalog.js'

const priceOptions = [
  { label: 'Todos', value: 'Todos' },
  { label: 'Bajo (menos de $10.000)', value: 'Bajo' },
  { label: 'Medio ($10.000 - $15.000)', value: 'Medio' },
  { label: 'Alto (más de $15.000)', value: 'Alto' }
]

function Catalog() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('Todos')
  const [filterCategory, setFilterCategory] = useState('Todos')
  const [filterPrice, setFilterPrice] = useState('Todos')

  const productTypes = useMemo(
    () => ['Todos', ...new Set(Productos.map((product) => product.tipoProducto))],
    []
  )

  const categories = useMemo(
    () => ['Todos', ...new Set(Productos.map((product) => product.categoria))],
    []
  )

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    return Productos.filter((product) => {
      const matchesSearch =
        query === '' ||
        product.nombre.toLowerCase().includes(query) ||
        product.descripcion.toLowerCase().includes(query)

      const matchesType = filterType === 'Todos' || product.tipoProducto === filterType
      const matchesCategory = filterCategory === 'Todos' || product.categoria === filterCategory
      const matchesPrice =
        filterPrice === 'Todos' ||
        (filterPrice === 'Bajo' && product.precio < 10000) ||
        (filterPrice === 'Medio' && product.precio >= 10000 && product.precio <= 15000) ||
        (filterPrice === 'Alto' && product.precio > 15000)

      return matchesSearch && matchesType && matchesCategory && matchesPrice
    })
  }, [searchQuery, filterType, filterCategory, filterPrice])

  const formatPrice = (value) =>
    new Intl.NumberFormat('es-CL').format(value)

  return (
    <div className="catalog-page">
      <aside className="catalog-sidebar">
        <h2>Filtros</h2>

        <div className="sidebar-group">
          <label htmlFor="filterType">Tipo de producto</label>
          <select
            id="filterType"
            value={filterType}
            onChange={(event) => setFilterType(event.target.value)}
          >
            {productTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="sidebar-group">
          <label htmlFor="filterCategory">Categoría</label>
          <select
            id="filterCategory"
            value={filterCategory}
            onChange={(event) => setFilterCategory(event.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="sidebar-group">
          <label htmlFor="filterPrice">Precio</label>
          <select
            id="filterPrice"
            value={filterPrice}
            onChange={(event) => setFilterPrice(event.target.value)}
          >
            {priceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </aside>

      <main className="catalog-main">
        <div className="catalog-header">
          <div>
            <h2>Catálogo de Productos</h2>
            
          </div>
          <div className="catalog-search-wrapper">
            <input
              type="text"
              className="catalog-search"
              placeholder="Buscar producto..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </div>
        </div>

        <div className="catalog-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <article className="catalog-card" key={product.id}>
                <img
                  className="catalog-image"
                  src={product.imagen}
                  alt={product.nombre}
                />
                <div className="catalog-card-body">
                  <p className="catalog-badge">{product.tipoProducto}</p>
                  <h3>{product.nombre}</h3>
                  <p className="catalog-description">{product.descripcion}</p>
                  <div className="catalog-footer">
                    <span className="catalog-category">{product.categoria}</span>
                    <span className="catalog-price">${formatPrice(product.precio)}</span>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="catalog-empty">
              No se encontraron productos con esos criterios.
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Catalog
