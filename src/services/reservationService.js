import mongoose from 'mongoose'
import Reservation from '../models/Reservation.js'
import { reserveSlot, releaseSlot } from './availabilityService.js'

const parseDateOnly = (value) => {
  const date = new Date(value)
  date.setHours(0, 0, 0, 0)
  return date
}

export const getReservations = async () => {
  return Reservation.find().populate('servicioId').sort({ fecha: 1, hora: 1 }).lean()
}

export const getReservationById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) return null
  return Reservation.findById(id).populate('servicioId').lean()
}

export const createReservation = async (reservationData) => {
  const { servicioId, fecha, hora, nombreCliente, correoCliente, telefonoCliente, observaciones } = reservationData

  const dateOnly = parseDateOnly(fecha)

  const reservedSlot = await reserveSlot({ servicioId, fecha: dateOnly, hora })
  if (!reservedSlot) {
    throw new Error('No fue posible completar la reserva porque el horario seleccionado ya fue reservado.')
  }

  const newReservation = new Reservation({
    servicioId,
    fecha: dateOnly,
    hora,
    nombreCliente,
    correoCliente,
    telefonoCliente,
    observaciones: observaciones || '',
    estado: 'Asistencia Pendiente',
    estilistaId: null,
  })

  await newReservation.save()
  return Reservation.findById(newReservation._id).populate('servicioId').lean()
}

export const updateReservation = async (id, updates) => {
  if (!mongoose.Types.ObjectId.isValid(id)) return null

  const reservation = await Reservation.findById(id)
  if (!reservation) return null

  const now = new Date()
  const reservationDateTime = new Date(reservation.fecha)
  const [hours, minutes] = reservation.hora.split(':').map(Number)
  reservationDateTime.setHours(hours, minutes, 0, 0)

  const canReschedule = reservationDateTime.getTime() - now.getTime() > 2 * 60 * 60 * 1000
  const canCancel = reservationDateTime.getTime() - now.getTime() > 1 * 60 * 60 * 1000

  if (updates.estado === 'Cancelada') {
    if (!canCancel) {
      throw new Error('No se puede cancelar la reserva dentro de la última hora.')
    }
    reservation.estado = 'Cancelada'
    await releaseSlot({ servicioId: reservation.servicioId, fecha: reservation.fecha, hora: reservation.hora })
    await reservation.save()
    return Reservation.findById(reservation._id).populate('servicioId').lean()
  }

  if (updates.fecha || updates.hora || updates.servicioId) {
    if (!canReschedule) {
      throw new Error('No se puede reprogramar la reserva dentro de las 2 horas previas.')
    }
    const newFecha = updates.fecha ? parseDateOnly(updates.fecha) : reservation.fecha
    const newHora = updates.hora || reservation.hora
    const newServicioId = updates.servicioId || reservation.servicioId

    const reservedSlot = await reserveSlot({ servicioId: newServicioId, fecha: newFecha, hora: newHora })
    if (!reservedSlot) {
      throw new Error('No fue posible reprogramar porque el nuevo horario ya fue reservado.')
    }

    await releaseSlot({ servicioId: reservation.servicioId, fecha: reservation.fecha, hora: reservation.hora })
    reservation.servicioId = newServicioId
    reservation.fecha = newFecha
    reservation.hora = newHora
  }

  if (updates.nombreCliente !== undefined) reservation.nombreCliente = updates.nombreCliente
  if (updates.correoCliente !== undefined) reservation.correoCliente = updates.correoCliente
  if (updates.telefonoCliente !== undefined) reservation.telefonoCliente = updates.telefonoCliente
  if (updates.observaciones !== undefined) reservation.observaciones = updates.observaciones
  if (updates.estado === 'Confirmada') reservation.estado = 'Confirmada'

  await reservation.save()
  return Reservation.findById(reservation._id).populate('servicioId').lean()
}

export const deleteReservation = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) return null

  const reservation = await Reservation.findById(id)
  if (!reservation) return null

  if (reservation.estado !== 'Cancelada') {
    await releaseSlot({ servicioId: reservation.servicioId, fecha: reservation.fecha, hora: reservation.hora })
  }

  return Reservation.findByIdAndDelete(id).lean()
}
