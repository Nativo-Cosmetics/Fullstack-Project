import mongoose from 'mongoose'

const reservationSchema = new mongoose.Schema(
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
    estado: {
      type: String,
      enum: ['Asistencia Pendiente', 'Confirmada', 'Cancelada'],
      default: 'Asistencia Pendiente',
    },
    nombreCliente: {
      type: String,
      required: true,
      trim: true,
    },
    correoCliente: {
      type: String,
      required: true,
      trim: true,
    },
    telefonoCliente: {
      type: String,
      required: true,
      trim: true,
    },
    observaciones: {
      type: String,
      trim: true,
      default: '',
    },
    estilistaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Estilista',
      default: null,
    },
  },
  {
    timestamps: true,
  }
)

reservationSchema.index({ servicioId: 1, fecha: 1, hora: 1 })

const Reservation = mongoose.models.Reservation || mongoose.model('Reservation', reservationSchema)
export default Reservation
