import express from 'express'
import { fetchServicios } from '../controllers/serviceController.js'

const router = express.Router()

router.get('/', fetchServicios)

export default router
