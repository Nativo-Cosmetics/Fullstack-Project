import React, { useEffect, useState } from 'react'
import { fetchProducts } from '../catalog/api.js'
import './AdminShared.css'
import './AdminReports.css'

const AdminReports = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchProducts({ page: 1, limit: 1000 })
        setProducts(response.products || [])
      } catch (err) {
        setError('Error al cargar datos para reportes')
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  // KPIs
  const totalProducts = products.length
  const totalStock = products.reduce((acc, p) => acc + (p.stock || 0), 0)
  const totalValue = products.reduce((acc, p) => acc + (p.precio * (p.stock || 0)), 0)
  const lowStockProducts = products.filter(p => (p.stock || 0) < 5)

  // Gráficos simples (Lógica de datos)
  const categories = ['Capilar', 'Cremas', 'Higiene']
  const prodByCat = categories.map(cat => ({
    name: cat,
    count: products.filter(p => p.categoria === cat).length
  }))
  const stockByCat = categories.map(cat => ({
    name: cat,
    stock: products.filter(p => p.categoria === cat).reduce((acc, p) => acc + (p.stock || 0), 0)
  }))

  const handlePrint = () => {
    window.print()
  }

  if (loading) return <div className='admin-container'><p>Cargando reportes...</p></div>

  return (
    <div className='admin-container report-view'>
      <header className='admin-header'>
        <h1>Reportes del Sistema</h1>
        <button className='btn-print no-print' onClick={handlePrint}>
          Descargar PDF
        </button>
      </header>

      {error && <div className='error-message'>{error}</div>}

      <section className='kpi-container'>
        <div className='kpi-card'>
          <span className='kpi-title'>Total Productos</span>
          <span className='kpi-val'>{totalProducts}</span>
        </div>
        <div className='kpi-card'>
          <span className='kpi-title'>Stock Total</span>
          <span className='kpi-val'>{totalStock}</span>
        </div>
        <div className='kpi-card'>
          <span className='kpi-title'>Valor Inventario</span>
          <span className='kpi-val'>CLP ${totalValue.toLocaleString('es-CL')}</span>
        </div>
        <div className={`kpi-card ${lowStockProducts.length > 0 ? 'warning' : ''}`}>
          <span className='kpi-title'>Stock Bajo (&lt;5)</span>
          <span className='kpi-val'>{lowStockProducts.length}</span>
        </div>
      </section>

      <section className='charts-section'>
        <div className='chart-card'>
          <h3>Distribución por Categoría (Productos)</h3>
          <div className='simple-chart'>
            {prodByCat.map(item => (
              <div key={item.name} className='chart-row'>
                <div className='chart-label'>{item.name}</div>
                <div className='chart-bar-bg'>
                  <div className='chart-bar-fill' style={{ width: `${totalProducts > 0 ? (item.count / totalProducts) * 100 : 0}%` }}></div>
                </div>
                <div className='chart-number'>{item.count}</div>
              </div>
            ))}
          </div>
        </div>

        <div className='chart-card'>
          <h3>Distribución por Categoría (Stock)</h3>
          <div className='simple-chart'>
            {stockByCat.map(item => (
              <div key={item.name} className='chart-row'>
                <div className='chart-label'>{item.name}</div>
                <div className='chart-bar-bg'>
                  <div className='chart-bar-fill stock-bar' style={{ width: `${totalStock > 0 ? (item.stock / totalStock) * 100 : 0}%` }}></div>
                </div>
                <div className='chart-number'>{item.stock}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='table-section'>
        <h3>Lista de Productos con Stock Bajo</h3>
        <table className='report-table'>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Categoría</th>
              <th>Stock</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            {lowStockProducts.map(p => (
              <tr key={p._id}>
                <td>{p.nombreProducto}</td>
                <td>{p.categoria}</td>
                <td className='danger-text'>{p.stock || 0}</td>
                <td>CLP ${p.precio.toLocaleString('es-CL')}</td>
              </tr>
            ))}
            {lowStockProducts.length === 0 && (
              <tr>
                <td colSpan="4" className="empty-msg">No hay productos con stock bajo.</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default AdminReports