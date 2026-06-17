import { getReservations, getReservationById, createReservation, updateReservation, deleteReservation } from '../services/reservationService.js'

export const fetchReservations = async (req, res, next) => {
  try {
    const reservations = await getReservations()
    res.json(reservations)
  } catch (error) {
    next(error)
  }
}

export const fetchReservationById = async (req, res, next) => {
  try {
    const reservation = await getReservationById(req.params.id)
    if (!reservation) {
      return res.status(404).json({ message: 'Reserva no encontrada' })
    }
    res.json(reservation)
  } catch (error) {
    next(error)
  }
}

export const createReservationHandler = async (req, res, next) => {
  try {
    const { servicioId, fecha, hora, nombreCliente, correoCliente, telefonoCliente, observaciones } = req.body

    if (!servicioId || !fecha || !hora || !nombreCliente || !correoCliente || !telefonoCliente) {
      return res.status(400).json({ message: 'Faltan campos obligatorios para crear la reserva' })
    }

    const reservation = await createReservation({ servicioId, fecha, hora, nombreCliente, correoCliente, telefonoCliente, observaciones })
    res.status(201).json(reservation)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const updateReservationHandler = async (req, res, next) => {
  try {
    const updates = req.body
    const reservation = await updateReservation(req.params.id, updates)
    if (!reservation) {
      return res.status(404).json({ message: 'Reserva no encontrada' })
    }
    res.json(reservation)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const deleteReservationHandler = async (req, res, next) => {
  try {
    const reservation = await deleteReservation(req.params.id)
    if (!reservation) {
      return res.status(404).json({ message: 'Reserva no encontrada' })
    }
    res.json({ message: 'Reserva eliminada exitosamente', reservation })
  } catch (error) {
    next(error)
  }
}
