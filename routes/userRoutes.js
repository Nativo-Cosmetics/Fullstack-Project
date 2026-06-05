import express from 'express'
import { test, createUser, getAllUsers, getUser, deleteUser, updateUser } from '../controllers/userCon.js'

const router = express.Router()

router.get('/test', test)
router.post('/create', createUser)
router.get('/getAll', getAllUsers)
router.post('/getUser/', getUser)
router.delete('/delete/:id', deleteUser)
router.put('/update/:id', updateUser)

export default router