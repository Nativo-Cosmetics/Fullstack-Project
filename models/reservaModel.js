import { Schema, model } from 'mongoose'

const reservaSchema = new Schema ({
    idUser: {
        type: String,
        required: true,
    },
    idWorker: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    service: {
        type: String,
        required: true,
    },
})

export default model('Reserva', reservaSchema, 'reservas');