import mongoose from 'mongoose'

const mealSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'title is required'],
      trim: true,
    },
    rating: {
      type: Number,
      required: [true, 'rating is required'],
      min: [0, 'rating must be at least 0'],
      max: [5, 'rating must be at most 5'],
    },
    discount: {
      type: String,
      required: [true, 'discount is required'],
      trim: true,
    },
    mood: {
      type: String,
      required: [true, 'mood is required'],
      enum: ['spicy', 'sweet', 'comfort', 'healthy', 'quick', 'trending', 'vegan', 'cheat', 'home', 'midnight', 'guilty', 'festive', 'date', 'budget'],
      lowercase: true,
    },
    category: {
      type: String,
      default: 'curry',
    },
    price: {
      type: Number,
      required: true,
      default: 250,
    },
    image: {
      type: String,
      default: '',
    },
    distance: {
      type: Number,
      default: 0,
      min: [0, 'distance must be at least 0'],
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
)

const Meal = mongoose.model('Meal', mealSchema)

export default Meal
