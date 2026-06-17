import Availability from '../models/Availability.js'

const toDateOnly = (value) => {
  const date = new Date(value)
  date.setHours(0, 0, 0, 0)
  return date
}

export const getAvailableSlots = async ({ servicioId, fecha }) => {
  const dateOnly = toDateOnly(fecha)
  return Availability.find({ servicioId, fecha: dateOnly, disponible: true }).sort({ hora: 1 }).lean()
}

export const reserveSlot = async ({ servicioId, fecha, hora }) => {
  const dateOnly = toDateOnly(fecha)
  return Availability.findOneAndUpdate(
    { servicioId, fecha: dateOnly, hora, disponible: true },
    { disponible: false },
    { new: true }
  ).lean()
}

export const releaseSlot = async ({ servicioId, fecha, hora }) => {
  const dateOnly = toDateOnly(fecha)
  return Availability.findOneAndUpdate(
    { servicioId, fecha: dateOnly, hora },
    { disponible: true },
    { new: true }
  ).lean()
}

export const seedAvailability = async (slots) => {
  const operations = slots.map((slot) => ({
    updateOne: {
      filter: {
        servicioId: slot.servicioId,
        fecha: toDateOnly(slot.fecha),
        hora: slot.hora,
      },
      update: {
        $set: {
          servicioId: slot.servicioId,
          fecha: toDateOnly(slot.fecha),
          hora: slot.hora,
          disponible: slot.disponible !== false,
        },
      },
      upsert: true,
    },
  }))

  return Availability.bulkWrite(operations)
}
