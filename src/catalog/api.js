const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000'

const buildUrl = (path, params = {}) => {
  const url = new URL(`${API_BASE}${path}`)
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, String(value))
    }
  })
  return url.toString()
}

export const fetchProducts = async ({ page, limit, search, categoria, minPrice, maxPrice, sort }) => {
  const url = buildUrl('/api/productos', {
    page,
    limit,
    search,
    categoria,
    minPrice,
    maxPrice,
    sort,
  })

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Error al cargar productos')
  }

  return response.json()
}

export const fetchProductById = async (id) => {
  const response = await fetch(`${API_BASE}/api/productos/${id}`)
  if (!response.ok) {
    throw new Error('Producto no encontrado')
  }
  return response.json()
}

export const fetchCategoriesSummary = async () => {
  const response = await fetch(`${API_BASE}/api/productos/categorias`)
  if (!response.ok) {
    throw new Error('Error al cargar categorías')
  }
  return response.json()
}

export const createProduct = async (productData) => {
  const response = await fetch(`${API_BASE}/api/productos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Error al crear producto')
  }

  return response.json()
}

export const updateProduct = async (id, productData) => {
  const response = await fetch(`${API_BASE}/api/productos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Error al actualizar producto')
  }

  return response.json()
}

export const deleteProduct = async (id) => {
  const response = await fetch(`${API_BASE}/api/productos/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Error al eliminar producto')
  }

  return response.json()
}