import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import config from '../config/index.js'
import { validationResult } from 'express-validator'

const generateToken = (id) => {
  return jwt.sign({ id }, config.jwtSecret, {
    expiresIn: '30d',
  })
}

// @desc    Register a new user
// @route   POST /api/auth/signup
export const registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, error: errors.array()[0].msg });
    }

    const { name, email, password, phone } = req.body

    // Check if user already exists
    const userExists = await User.findOne({ email })

    if (userExists) {
      return res.status(400).json({ success: false, error: 'User already exists' })
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      phone,
    })

    if (user) {
      res.status(201).json({
        success: true,
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
        }
      })
    } else {
      res.status(400).json({ success: false, error: 'Invalid user data' })
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, error: 'Server error' })
  }
}

// @desc    Authenticate a user
// @route   POST /api/auth/login
export const loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, error: errors.array()[0].msg });
    }

    const { email, password } = req.body

    // Check for user email
    const user = await User.findOne({ email }).select('+password')

    if (user && (await user.matchPassword(password))) {
      res.json({
        success: true,
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
        }
      })
    } else {
      res.status(401).json({ success: false, error: 'Invalid credentials' })
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, error: 'Server error' })
  }
}

// @desc    Get user data
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    // req.user is populated by protect middleware
    res.status(200).json({
      success: true,
      data: req.user
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, error: 'Server error' })
  }
}

// @desc    Update user data
// @route   PUT /api/auth/me
// @access  Private
export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)

    if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      user.phone = req.body.phone || user.phone

      // If password needs to be updated, it can be handled here too
      if (req.body.password) {
        user.password = req.body.password
      }

      const updatedUser = await user.save()

      res.status(200).json({
        success: true,
        data: {
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          phone: updatedUser.phone,
          token: generateToken(updatedUser._id),
        }
      })
    } else {
      res.status(404).json({ success: false, error: 'User not found' })
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, error: 'Server error' })
  }
}

// @desc    Google OAuth Callback Handler
// @route   GET /api/auth/google/callback
export const googleCallback = (req, res) => {
  if (!req.user) {
    return res.redirect('http://localhost:5173/login?error=oauth_failed')
  }
  const token = generateToken(req.user._id)
  res.redirect(`http://localhost:5173/dashboard?token=${token}`)
}
