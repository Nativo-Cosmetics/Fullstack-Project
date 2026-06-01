import { getProductos, getProductoById, getCategoriesSummary } from '../services/productService.js'

export const fetchProductos = async (req, res, next) => {
  try {
    const { page, limit, search, categoria, minPrice, maxPrice, sort } = req.query
    const result = await getProductos({ page, limit, search, categoria, minPrice, maxPrice, sort })
    return res.json(result)
  } catch (error) {
    next(error)
  }
}

export const fetchProductoById = async (req, res, next) => {
  try {
    const product = await getProductoById(req.params.id)
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' })
    }
    return res.json(product)
  } catch (error) {
    next(error)
  }
}

export const fetchCategoriesSummary = async (req, res, next) => {
  try {
    const summary = await getCategoriesSummary()
    return res.json(summary)
  } catch (error) {
    next(error)
  }
}
