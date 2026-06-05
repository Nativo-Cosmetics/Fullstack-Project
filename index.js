import { connectDB } from './db/conecction.js';

import express from 'express';
import cors from 'cors';


import path from 'path';

// init conection database
connectDB();

const app = express();
const port = 8080;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get('/testing', (req, res) => {
    return res.status(200).json([{
        name: 'Sable Ward',
        email: 'sable.ward@example.com',
        phone: '555-123-4567',
    },
    {
        name: 'La forma',
        email: 'el.deforme@gmail.com'
    }
    ])
})

app.listen(port, () =>{
    console.log(`Server running on port ${port}`)
})