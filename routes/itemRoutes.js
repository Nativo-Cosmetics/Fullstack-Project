import express from 'express'

import { createItem, getItems, deleteItem, editItem, upload, image, browser } from '../controllers/itemCon.js'

const router = express.Router()

router.post('/item/create', createItem)
router.get('/item/getAll', getItems)
router.delete('/item/delete', deleteItem)
router.put('/item/edit', editItem)