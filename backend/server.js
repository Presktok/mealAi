import express from 'express'
import cors from 'cors'
import config from './config/index.js'
import mealRoutes from './routes/mealRoutes.js'
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

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'MoodMeal API is running' })
})

// Meal resource routes
app.use('/api/meals', mealRoutes)

// 404 and centralized error handling
app.use(notFoundHandler)
app.use(errorHandler)

app.listen(config.port, () => {
  console.log(`MoodMeal API listening on http://localhost:${config.port}`)
  console.log(`Environment: ${config.nodeEnv}`)
})
