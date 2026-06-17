import { getAvailableSlots } from '../services/availabilityService.js'

export const fetchAvailability = async (req, res, next) => {
  try {
    const { servicioId, fecha } = req.query

    if (!servicioId || !fecha) {
      return res.status(400).json({ message: 'servicioId y fecha son requeridos' })
    }

    const slots = await getAvailableSlots({ servicioId, fecha })
    res.json(slots)
  } catch (error) {
    next(error)
  }
}
