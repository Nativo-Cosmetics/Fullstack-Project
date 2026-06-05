import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/Nativo-Cosmetics')

        console.log('Database connected successfully')
    } catch(error) {
        throw new Error('Error connecting to the database:', error)
    }
}