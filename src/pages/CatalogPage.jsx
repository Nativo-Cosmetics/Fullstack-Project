import { useEffect, useMemo, useState } from 'react'
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import Navbar from '../components/navigation/navbar.jsx'
import SearchBar from '../catalog/SearchBar.jsx'
import FiltersSidebar from '../catalog/FiltersSidebar.jsx'
import SortSelector from '../catalog/SortSelector.jsx'
import ProductGrid from '../catalog/ProductGrid.jsx'
import Pagination from '../catalog/Pagination.jsx'
import { fetchProducts, fetchCategoriesSummary } from '../catalog/api.js'
import styles from './CatalogPage.module.css'

const DEFAULT_LIMIT = 16

const CatalogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  const [products, setProducts] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalProducts, setTotalProducts] = useState(0)
  const [categories, setCategories] = useState([])
  const [priceBounds, setPriceBounds] = useState({ min: 0, max: 0 })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const currentFilters = useMemo(() => {
    const page = Number(searchParams.get('page')) || 1
    const search = searchParams.get('search') || ''
    const categoria = searchParams.get('categoria') || ''
    const sort = searchParams.get('sort') || 'priceAsc'
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')

    return {
      page,
      search,
      categoria,
      sort,
      minPrice: minPrice !== null ? Number(minPrice) : undefined,
      maxPrice: maxPrice !== null ? Number(maxPrice) : undefined,
    }
  }, [searchParams])

  useEffect(() => {
    const loadSummary = async () => {
      try {
        const summary = await fetchCategoriesSummary()
        setCategories(summary.categories)
        setPriceBounds({
          min: summary.minPrice ?? 0,
          max: summary.maxPrice ?? 0,
        })
      } catch (err) {
        setError(err.message)
      }
    }

    loadSummary()
  }, [])

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true)
      setError('')
      try {
        const response = await fetchProducts({
          page: currentFilters.page,
          limit: DEFAULT_LIMIT,
          search: currentFilters.search,
          categoria: currentFilters.categoria,
          minPrice: currentFilters.minPrice,
          maxPrice: currentFilters.maxPrice,
          sort: currentFilters.sort,
        })

        setProducts(response.products)
        setCurrentPage(response.currentPage)
        setTotalPages(response.totalPages)
        setTotalProducts(response.totalProducts)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [currentFilters])

  const updateQuery = (updates) => {
    const nextSearchParams = new URLSearchParams(searchParams)
    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined || value === null || value === '') {
        nextSearchParams.delete(key)
      } else {
        nextSearchParams.set(key, String(value))
      }
    })

    if (!updates.page) {
      nextSearchParams.set('page', '1')
    }

    setSearchParams(nextSearchParams)
  }

  const currentMinPrice = currentFilters.minPrice ?? priceBounds.min
  const currentMaxPrice = currentFilters.maxPrice ?? priceBounds.max

  const handleSearchChange = (value) => {
    updateQuery({ search: value, page: '1' })
  }

  const handleCategoryChange = (category) => {
    updateQuery({ categoria: category, page: '1' })
  }

  const handlePriceChange = (min, max) => {
    updateQuery({ minPrice: min, maxPrice: max, page: '1' })
  }

  const handleSortChange = (value) => {
    updateQuery({ sort: value, page: '1' })
  }

  const handlePageChange = (page) => {
    updateQuery({ page })
  }

  const handleClearFilters = () => {
    const resetParams = new URLSearchParams()
    if (currentFilters.sort) {
      resetParams.set('sort', currentFilters.sort)
    }
    resetParams.set('page', '1')
    setSearchParams(resetParams)
  }

  const handleAddToCart = (product) => {
    // Integración futura con módulo carrito
    console.log('Agregar al carrito:', product._id)
  }

  return (
    <>
      <Navbar />
      <main className={styles.catalogPage}>
        <div className={styles.topSection}>
          <div>
            <h1 className={styles.pageTitle}>Catálogo de productos</h1>
            <p className={styles.subtitle}>Encuentra productos de cuidado personal por nombre, categoría y precio.</p>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end' }}>
            <SortSelector value={currentFilters.sort} onChange={handleSortChange} />
            <Link to='/cart' className='redirectBtn storeBtn'>Ver Carrito</Link>
          </div>
        </div>

        <SearchBar value={currentFilters.search} onChange={handleSearchChange} />

        <div className={styles.contentGrid}>
          <FiltersSidebar
            categories={categories}
            currentCategory={currentFilters.categoria}
            minPrice={currentMinPrice}
            maxPrice={currentMaxPrice}
            bounds={priceBounds}
            onCategoryChange={handleCategoryChange}
            onPriceChange={handlePriceChange}
            onClearFilters={handleClearFilters}
          />

          <section className={styles.productsArea}>
            {loading && <p className={styles.statusMessage}>Cargando productos...</p>}
            {error && <p className={styles.statusMessage}>{error}</p>}
            {!loading && !error && products.length === 0 && (
              <p className={styles.statusMessage}>No se encontraron productos con los filtros seleccionados.</p>
            )}

            {!loading && !error && products.length > 0 && (
              <>
                <p className={styles.resultInfo}>
                  Mostrando {products.length} de {totalProducts} productos
                </p>
                <ProductGrid products={products} onAddToCart={handleAddToCart} />
                <Pagination currentPage={currentPage} totalPages={totalPages} onChangePage={handlePageChange} />
              </>
            )}
          </section>
        </div>
      </main>
    </>
  )
}

export default CatalogPage
