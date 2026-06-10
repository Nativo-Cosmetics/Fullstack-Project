import { Schema, model } from 'mongoose'

const itemSchema = new Schema({
    name: {
        type: String,
        required: true,
    },

    desc: {
        type: String,
    },

    category: {
        type: String,
        default: 'Producto capilar',
        required: true,
    },

    price: {
        type: Number,
        required: true,
    },

    descuento: {
        type: Number,
        default: 0.00,
    },

    img: {
        type: String,
        default: 'item.webp',
    }
})

export default model('Item', itemSchema, 'items')