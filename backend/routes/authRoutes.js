import express from 'express'
import { registerUser, loginUser, getMe, updateUser, googleCallback } from '../controllers/authController.js'
import { protect } from '../middleware/authMiddleware.js'
import { body } from 'express-validator'
import rateLimit from 'express-rate-limit'
import passport from 'passport'

const router = express.Router()

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { success: false, error: 'Too many requests, please try again later' }
})

router.post(
  '/signup',
  authLimiter,
  [
    body('name').notEmpty().withMessage('Please include a name'),
    body('email').isEmail().withMessage('Please include a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
  ],
  registerUser
)

router.post(
  '/login',
  authLimiter,
  [
    body('email').isEmail().withMessage('Please include a valid email'),
    body('password').exists().withMessage('Password is required')
  ],
  loginUser
)

router.get('/me', protect, getMe)
router.put('/me', protect, updateUser)

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: 'http://localhost:5173/login?error=oauth_failed' }),
  googleCallback
)

export default router
