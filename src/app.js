import express from 'express'
import cors from 'cors'
import productRoutes from './routes/productRoutes.js'
import { notFound, errorHandler } from './middlewares/errorMiddleware.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/productos', productRoutes)

app.use(notFound)
app.use(errorHandler)

export default app
