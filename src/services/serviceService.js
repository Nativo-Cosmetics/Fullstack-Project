import Service from '../models/Service.js'

export const getServicios = async () => {
  return Service.find({ activo: true }).sort({ nombreServicio: 1 }).lean()
}

export const getServiceById = async (id) => {
  return Service.findById(id).lean()
}

export const seedServices = async (services) => {
  const operations = services.map((service) => ({
    updateOne: {
      filter: { nombreServicio: service.nombreServicio },
      update: { $set: service },
      upsert: true,
    },
  }))

  return Service.bulkWrite(operations)
}
