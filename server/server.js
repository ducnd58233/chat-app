import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import rfs from 'rotating-file-stream'
import path from 'path'
import { fileURLToPath } from 'url'
import helmet from 'helmet'
import morgan from 'morgan'
import connectMongoDB from './config/mongodb.js'

import { notFound, errorHandler } from './middleware/errorMiddleware.js'

import userRoutes from './routes/userRoutes.js'
import chatRoutes from './routes/chatRoutes.js'

dotenv.config()
connectMongoDB()
const PORT = process.env.PORT || 9000
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
app.use(express.json()) // accept json data

app.get('/', (req, res) => {
  res.send('API is Running')
})

app.use('/api/user', userRoutes)
app.use('/api/chat', chatRoutes)
app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`)
})