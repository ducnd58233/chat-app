import { Router } from 'express'
import { protect } from '../middleware/authMiddleware.js'
import {
  accessChat,
  fetchChats,
  createGroupChat,
  removeFromGroup,
  addToGroup,
  renameGroup
} from '../controllers/chatControllers.js'

const router = Router()

router.post('/', protect, accessChat)

router.get('/', protect, fetchChats)

router.post('/group', protect, createGroupChat)

router.put('/group/remove', protect, removeFromGroup)

router.put('/group/add', protect, addToGroup)

router.put('/rename', protect, renameGroup)

export default router