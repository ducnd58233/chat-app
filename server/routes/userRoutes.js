import { Router } from 'express'
import { protect } from '../middleware/authMiddleware.js'
import {
  registerUser,
  authUser,
  allUsers
} from '../controllers/userControllers.js'

const router = Router()

router.post('/login', authUser)

router.post('/register', registerUser)

router.get('/', protect, allUsers)

export default router