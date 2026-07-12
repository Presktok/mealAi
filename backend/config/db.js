import mongoose from 'mongoose'
import config from './index.js'

/**
 * Connect to MongoDB Atlas.
 * The server should not start until this resolves successfully.
 */
async function connectDB() {
  try {
    const conn = await mongoose.connect(config.mongoUri)
    console.log(`MongoDB connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`)
    process.exit(1)
  }
}

export default connectDB
