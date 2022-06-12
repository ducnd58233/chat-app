import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import rfs from 'rotating-file-stream'
import path from 'path'
import { fileURLToPath } from 'url'
import helmet from 'helmet'
import morgan from 'morgan'
import { chats } from './data/data.js'

dotenv.config()

const PORT = process.env.PORT || 8080
const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const isProduction = process.env.NODE_ENV === 'production' || false
const accessLogStream = rfs.createStream('access.log', {
  interval: '1d',
  path: path.join(__dirname, 'log')
})

app.use(helmet())
app.use(
  isProduction ?
    morgan('combined', {stream: accessLogStream})
    : morgan('dev')
)
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('API is Running')
})

app.get('/api/chat', (req, res) => {
  res.send(chats)
})

app.get('/api/chat/:id', (req, res) => {
  const singleChat = chats.find((c) => c._id === req.params.id)
  res.send(singleChat)
})


app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`)
})