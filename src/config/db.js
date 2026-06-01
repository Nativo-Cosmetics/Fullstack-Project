import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI
    if (!uri) {
      throw new Error('La variable de entorno MONGODB_URI no está configurada')
    }

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  } catch (error) {
    console.error('Error al conectar con MongoDB:', error.message)
    process.exit(1)
  }
}

export default connectDB
