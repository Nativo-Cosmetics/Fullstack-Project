import express from 'express'
import cors from 'cors'
import productRoutes from './routes/productRoutes.js'
import serviceRoutes from './routes/serviceRoutes.js'
import availabilityRoutes from './routes/availabilityRoutes.js'
import reservationRoutes from './routes/reservationRoutes.js'
import { notFound, errorHandler } from './middlewares/errorMiddleware.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/productos', productRoutes)
app.use('/api/servicios', serviceRoutes)
app.use('/api/disponibilidad', availabilityRoutes)
app.use('/api/reservas', reservationRoutes)

app.use(notFound)
app.use(errorHandler)

export default app
