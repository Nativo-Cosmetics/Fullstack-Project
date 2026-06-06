import express from 'express'
import { fetchProductos, fetchProductoById, fetchCategoriesSummary, createProductoHandler, updateProductoHandler, deleteProductoHandler } from '../controllers/productController.js'

const router = express.Router()

router.get('/categorias', fetchCategoriesSummary)
router.get('/:id', fetchProductoById)
router.get('/', fetchProductos)

router.post('/', createProductoHandler)
router.put('/:id', updateProductoHandler)
router.delete('/:id', deleteProductoHandler)

export default router
