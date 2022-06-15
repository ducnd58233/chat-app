import asyncHandler from 'express-async-handler'
import Chat from '../models/chatModel.js'
import User from '../models/userModel.js'

const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body

  if (!userId) {
    console.log('UserId param not sent with request')
    return res.sendStatus(400)
  }

  let isChat = await Chat.find({
    isGroupChat: false,
    // both request has to be true
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } }
    ]
  })
    .populate('users', '-password')
    .populate('latestMessage')

  isChat = await User.populate(isChat, {
    path: 'latestMessage.sender',
    select: 'name pic email'
  })

  if (isChat.length > 0) {
    res.send(isChat[0])
  } else {
    let chatData = {
      chatName: 'sender',
      isGroupChat: false,
      users: [req.user._id, userId]
    }

    try {
      const createdChat = await Chat.create(chatData)

      const fullChat = await Chat.findOne({ _id: createdChat._id }).populate('user', '-password')
      res.status(200).send(fullChat)
    } catch (err) {
      res.status(400)
      throw new Error(err.message)
    }
  }
})

const fetchChats = asyncHandler(async (req, res) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate('users', '-password')
      .populate('groupAdmin', '-password')
      .populate('latestMessage')
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: 'latestMessage.sender',
          select: 'name pic email'
        })

        res.status(200).send(results)
      })
  } catch (err) {
    res.status(400)
    throw new Error(error.message)
  }
})

const createGroupChat = asyncHandler(async (req, res) => { })

const removeFromGroup = asyncHandler(async (req, res) => { })

const addToGroup = asyncHandler(async (req, res) => { })

const renameGroup = asyncHandler(async (req, res) => { })

export {
  accessChat,
  fetchChats,
  createGroupChat,
  removeFromGroup,
  addToGroup,
  renameGroup
}
