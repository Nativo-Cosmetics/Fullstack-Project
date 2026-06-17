import express from 'express'
import { fetchReservations, fetchReservationById, createReservationHandler, updateReservationHandler, deleteReservationHandler } from '../controllers/reservationController.js'

const router = express.Router()

router.get('/:id', fetchReservationById)
router.get('/', fetchReservations)
router.post('/', createReservationHandler)
router.put('/:id', updateReservationHandler)
router.delete('/:id', deleteReservationHandler)

export default router
