import { Router } from 'express'
import {
  registerUser,
  authUser,
  allUsers
} from '../controllers/userControllers.js'

const router = Router()

router.post('/login', authUser)

router.post('/register', registerUser)

router.get('/', allUsers)

export default router