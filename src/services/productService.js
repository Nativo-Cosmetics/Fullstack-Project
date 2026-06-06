import Product from '../models/Product.js'

const SORT_MAP = {
  priceAsc: { precio: 1 },
  priceDesc: { precio: -1 },
  nameAsc: { nombreProducto: 1 },
  nameDesc: { nombreProducto: -1 },
}

export const getProductos = async ({ page = 1, limit = 16, search, categoria, minPrice, maxPrice, sort }) => {
  const filter = {}

  if (search) {
    filter.nombreProducto = { $regex: search, $options: 'i' }
  }

  if (categoria) {
    filter.categoria = categoria
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    filter.precio = {}
    if (minPrice !== undefined && !Number.isNaN(Number(minPrice))) {
      filter.precio.$gte = Number(minPrice)
    }
    if (maxPrice !== undefined && !Number.isNaN(Number(maxPrice))) {
      filter.precio.$lte = Number(maxPrice)
    }
    if (Object.keys(filter.precio).length === 0) {
      delete filter.precio
    }
  }

  const pageNumber = Math.max(1, Number(page) || 1)
  const limitNumber = Math.max(1, Number(limit) || 16)

  const totalProducts = await Product.countDocuments(filter)
  const totalPages = Math.max(1, Math.ceil(totalProducts / limitNumber))
  const products = await Product.find(filter)
    .sort(SORT_MAP[sort] || { nombreProducto: 1 })
    .skip((pageNumber - 1) * limitNumber)
    .limit(limitNumber)
    .lean()

  return {
    products,
    currentPage: pageNumber,
    totalPages,
    totalProducts,
  }
}

export const getProductoById = async (id) => {
  return Product.findById(id).lean()
}

export const getCategoriesSummary = async () => {
  const categories = await Product.distinct('categoria')
  const priceBounds = await Product.aggregate([
    {
      $group: {
        _id: null,
        minPrice: { $min: '$precio' },
        maxPrice: { $max: '$precio' },
      },
    },
  ])

  return {
    categories: categories.sort(),
    minPrice: priceBounds[0]?.minPrice ?? 0,
    maxPrice: priceBounds[0]?.maxPrice ?? 0,
  }
}

export const createProducto = async (productData) => {
  const { nombreProducto, descripcionProducto, precio, categoria, imagen, stock } = productData

  const newProduct = new Product({
    nombreProducto,
    descripcionProducto,
    precio,
    categoria,
    imagen,
    stock: stock !== undefined ? stock : 0,
  })

  await newProduct.save()
  return newProduct.toObject()
}

export const updateProducto = async (id, productData) => {
  const updateData = {}

  if (productData.nombreProducto !== undefined) updateData.nombreProducto = productData.nombreProducto
  if (productData.descripcionProducto !== undefined) updateData.descripcionProducto = productData.descripcionProducto
  if (productData.precio !== undefined) updateData.precio = productData.precio
  if (productData.categoria !== undefined) updateData.categoria = productData.categoria
  if (productData.imagen !== undefined) updateData.imagen = productData.imagen
  if (productData.stock !== undefined) updateData.stock = productData.stock

  const product = await Product.findByIdAndUpdate(id, updateData, { new: true }).lean()
  return product
}

export const deleteProducto = async (id) => {
  const product = await Product.findByIdAndDelete(id).lean()
  return product
}
