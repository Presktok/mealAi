import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import config from '../config/index.js'

export const protect = async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]

      // Verify token
      const decoded = jwt.verify(token, config.jwtSecret)

      // Get user from the token
      req.user = await User.findById(decoded.id).select('-password')

      if (!req.user) {
        return res.status(401).json({ success: false, error: 'Not authorized, user not found' })
      }

      next()
    } catch (error) {
      console.error(error)
      return res.status(401).json({ success: false, error: 'Not authorized, token failed' })
    }
  } else {
    return res.status(401).json({ success: false, error: 'Not authorized, no token' })
  }
}
