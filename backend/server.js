// Force public DNS so SRV lookups for MongoDB Atlas work on all networks
import dns from 'node:dns'
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1'])

import express from 'express'
import cors from 'cors'
import config from './config/index.js'
import connectDB from './config/db.js'
import passport from './config/passport.js'
import mealRoutes from './routes/mealRoutes.js'
import authRoutes from './routes/authRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import { recommendMeals } from './controllers/aiController.js'
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js'

const app = express()

// Parse JSON request bodies
app.use(express.json())

// Allow requests from the Vite frontend
app.use(
  cors({
    origin: config.corsOrigin,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
)

// Initialize Passport
app.use(passport.initialize())

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'MoodMeal API is running' })
})

// Meal resource routes
app.use('/api/meals', mealRoutes)

// Auth routes
app.use('/api/auth', authRoutes)

// Order routes
app.use('/api/orders', orderRoutes)

// AI routes
app.post('/api/ai/recommend', recommendMeals)

// 404 and centralized error handling
app.use(notFoundHandler)
app.use(errorHandler)

// Connect to MongoDB, then start the server
async function start() {
  await connectDB()
  app.listen(config.port, () => {
    console.log(`MoodMeal API listening on http://localhost:${config.port}`)
    console.log(`Environment: ${config.nodeEnv}`)
  })
}

start()
