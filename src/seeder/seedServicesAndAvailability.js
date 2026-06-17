import dotenv from 'dotenv'
import connectDB from '../config/db.js'
import { seedServices } from '../services/serviceService.js'
import { seedAvailability } from '../services/availabilityService.js'

dotenv.config()

const seedData = async () => {
  try {
    await connectDB()

    const services = [
      { nombreServicio: 'Corte Caballero', duracionMinutos: 30, activo: true },
      { nombreServicio: 'Corte Dama', duracionMinutos: 60, activo: true },
      { nombreServicio: 'Lavado Capilar', duracionMinutos: 20, activo: true },
      { nombreServicio: 'Tintura', duracionMinutos: 120, activo: true },
      { nombreServicio: 'Barba', duracionMinutos: 30, activo: true },
    ]

    const resultServices = await seedServices(services)
    console.log('Seed de servicios completado', resultServices)

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const availabilities = []
    const daysToSeed = 7
    const startTimes = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30']

    for (let day = 0; day < daysToSeed; day += 1) {
      const date = new Date(today)
      date.setDate(date.getDate() + day)

      services.forEach((service) => {
        startTimes.forEach((hora) => {
          availabilities.push({
            servicioId: null,
            fecha: new Date(date),
            hora,
            disponible: true,
          })
        })
      })
    }

    console.log('Seed de disponibilidad preparado. IMPORTANTE: ejecutar con IDs reales del servicio.')
    console.log('Use seedServicesAndAvailability.js para generar servicios y actualizar los IDs de disponibilidad si es necesario.')

    await seedAvailability(availabilities)
    console.log('Seed de disponibilidad completado (con IDs provisionales).')
    process.exit(0)
  } catch (error) {
    console.error('Error en seed de servicios y disponibilidad:', error)
    process.exit(1)
  }
}

seedData()
