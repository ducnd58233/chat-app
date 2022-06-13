import mongoose from 'mongoose'

const connectMongoDB = async () => {
  try {
    console.log('Connecting to MongoDB')
    const mongodb = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log(`MongoDB Connected: ${mongodb.connection.host}`)
  } catch (err) {
    console.log(`Error: ${err.message}`)
    process.exit()
  }
}

export default connectMongoDB