import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    nombreProducto: {
      type: String,
      required: true,
      trim: true,
    },
    descripcionProducto: {
      type: String,
      required: true,
      trim: true,
    },
    precio: {
      type: Number,
      required: true,
      min: 0,
    },
    categoria: {
      type: String,
      required: true,
      trim: true,
    },
    imagen: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
)

const Product = mongoose.models.Product || mongoose.model('Product', productSchema)
export default Product
