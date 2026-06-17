import express from 'express'
import { fetchAvailability } from '../controllers/availabilityController.js'

const router = express.Router()

router.get('/', fetchAvailability)

export default router
