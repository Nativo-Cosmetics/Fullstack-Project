import { getProductos, getProductoById, getCategoriesSummary, createProducto, updateProducto, deleteProducto } from '../services/productService.js'

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

export const createProductoHandler = async (req, res, next) => {
  try {
    const { nombreProducto, descripcionProducto, precio, categoria, imagen, stock } = req.body

    if (!nombreProducto || !descripcionProducto || precio === undefined || !categoria || !imagen) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' })
    }

    if (typeof precio !== 'number' || precio < 0) {
      return res.status(400).json({ message: 'Precio debe ser un número válido' })
    }

    const product = await createProducto({ nombreProducto, descripcionProducto, precio, categoria, imagen, stock })
    return res.status(201).json(product)
  } catch (error) {
    next(error)
  }
}

export const updateProductoHandler = async (req, res, next) => {
  try {
    const { id } = req.params
    const { nombreProducto, descripcionProducto, precio, categoria, imagen, stock } = req.body

    if (!id) {
      return res.status(400).json({ message: 'ID del producto requerido' })
    }

    if (precio !== undefined && (typeof precio !== 'number' || precio < 0)) {
      return res.status(400).json({ message: 'Precio debe ser un número válido' })
    }

    const product = await updateProducto(id, { nombreProducto, descripcionProducto, precio, categoria, imagen, stock })
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' })
    }

    return res.json(product)
  } catch (error) {
    next(error)
  }
}

export const deleteProductoHandler = async (req, res, next) => {
  try {
    const { id } = req.params

    if (!id) {
      return res.status(400).json({ message: 'ID del producto requerido' })
    }

    const product = await deleteProducto(id)
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' })
    }

    return res.json({ message: 'Producto eliminado exitosamente', product })
  } catch (error) {
    next(error)
  }
}
