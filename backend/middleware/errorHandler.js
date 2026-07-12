/**
 * Custom application error with an HTTP status code.
 */
export class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = true
  }
}

/**
 * Wrap async route handlers so rejected promises reach the error middleware.
 */
export function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}

/**
 * Centralized error handler — must be registered after all routes.
 * Handles Mongoose-specific errors (CastError, ValidationError) alongside
 * application-level AppError instances.
 */
export function errorHandler(err, req, res, next) {
  let statusCode = err.statusCode || 500
  let message = err.message || 'Internal Server Error'

  // Mongoose: invalid ObjectId format (e.g. "abc" passed as :id)
  if (err.name === 'CastError') {
    statusCode = 400
    message = `Invalid ${err.path}: ${err.value}`
  }

  // Mongoose: schema validation failure
  if (err.name === 'ValidationError') {
    statusCode = 400
    const messages = Object.values(err.errors).map((e) => e.message)
    message = messages.join(', ')
  }

  if (process.env.NODE_ENV !== 'production') {
    console.error(`[${req.method}] ${req.originalUrl} —`, err)
  }

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV !== 'production' && err.stack
      ? { stack: err.stack }
      : {}),
  })
}

/**
 * Catch requests to undefined routes.
 */
export function notFoundHandler(req, res, next) {
  next(new AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404))
}
