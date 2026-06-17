import mongoose from 'mongoose'

const serviceSchema = new mongoose.Schema(
  {
    nombreServicio: {
      type: String,
      required: true,
      trim: true,
    },
    duracionMinutos: {
      type: Number,
      required: true,
      min: 1,
    },
    activo: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema)
export default Service
