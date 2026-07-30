import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import User from '../models/User.js'
import config from './index.js'

passport.use(new GoogleStrategy({
    clientID: config.googleClientId || 'DUMMY_ID_UNTIL_CONFIGURED',
    clientSecret: config.googleClientSecret || 'DUMMY_SECRET_UNTIL_CONFIGURED',
    callbackURL: '/api/auth/google/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if user exists by googleId
      let user = await User.findOne({ googleId: profile.id })
      const avatarUrl = profile.photos && profile.photos.length > 0 ? profile.photos[0].value : ''

      if (user) {
        if (avatarUrl && user.avatar !== avatarUrl) {
          user.avatar = avatarUrl
          await user.save()
        }
        return done(null, user)
      }

      // Check if user exists by email
      if (profile.emails && profile.emails.length > 0) {
        user = await User.findOne({ email: profile.emails[0].value })
        if (user) {
          user.googleId = profile.id
          if (avatarUrl && !user.avatar) {
            user.avatar = avatarUrl
          }
          await user.save()
          return done(null, user)
        }
      }

      // Create new user
      user = await User.create({
        name: profile.displayName,
        email: profile.emails ? profile.emails[0].value : '',
        googleId: profile.id,
        avatar: avatarUrl
      })

      return done(null, user)
    } catch (err) {
      return done(err, null)
    }
  }
))

export default passport
