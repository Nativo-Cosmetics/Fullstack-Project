import express from 'express'
import { fetchProductos, fetchProductoById, fetchCategoriesSummary } from '../controllers/productController.js'

const router = express.Router()

router.get('/categorias', fetchCategoriesSummary)
router.get('/:id', fetchProductoById)
router.get('/', fetchProductos)

export default router
