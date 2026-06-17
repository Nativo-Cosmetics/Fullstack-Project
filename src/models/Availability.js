import mongoose from 'mongoose'

const availabilitySchema = new mongoose.Schema(
  {
    servicioId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: true,
    },
    fecha: {
      type: Date,
      required: true,
    },
    hora: {
      type: String,
      required: true,
      trim: true,
    },
    disponible: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

availabilitySchema.index({ servicioId: 1, fecha: 1, hora: 1 }, { unique: true })

const Availability = mongoose.models.Availability || mongoose.model('Availability', availabilitySchema)
export default Availability
