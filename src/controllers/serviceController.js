import { getServicios } from '../services/serviceService.js'

export const fetchServicios = async (req, res, next) => {
  try {
    const servicios = await getServicios()
    res.json(servicios)
  } catch (error) {
    next(error)
  }
}
