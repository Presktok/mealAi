import { AppError } from '../middleware/errorHandler.js'
import Meal from '../models/Meal.js'

const VALID_MOODS = ['spicy', 'sweet', 'comfort', 'healthy', 'quick', 'trending']

/** Validate meal fields for create/update operations. */
function validateMealBody(body) {
  const { title, rating, discount, mood, image, distance } = body

  if (!title || typeof title !== 'string' || !title.trim()) {
    throw new AppError('title is required and must be a non-empty string', 400)
  }

  if (rating === undefined || typeof rating !== 'number' || rating < 0 || rating > 5) {
    throw new AppError('rating is required and must be a number between 0 and 5', 400)
  }

  if (!discount || typeof discount !== 'string' || !discount.trim()) {
    throw new AppError('discount is required and must be a non-empty string', 400)
  }

  if (!mood || typeof mood !== 'string' || !VALID_MOODS.includes(mood.toLowerCase())) {
    throw new AppError(
      `mood is required and must be one of: ${VALID_MOODS.join(', ')}`,
      400
    )
  }

  if (image !== undefined && typeof image !== 'string') {
    throw new AppError('image must be a string', 400)
  }

  if (distance !== undefined && (typeof distance !== 'number' || distance < 0)) {
    throw new AppError('distance must be a number >= 0', 400)
  }

  const validated = {
    title: title.trim(),
    rating,
    discount: discount.trim(),
    mood: mood.toLowerCase(),
  }

  if (image !== undefined) validated.image = image
  if (distance !== undefined) validated.distance = distance

  return validated
}

/** GET /api/meals */
export const listMeals = async (req, res) => {
  const filter = {}
  if (req.query.mood) {
    filter.mood = req.query.mood.toLowerCase()
  }
  if (req.query.category) {
    filter.category = req.query.category.toLowerCase()
  }

  const meals = await Meal.find(filter).sort({ distance: 1 })
  res.status(200).json({ success: true, count: meals.length, data: meals })
}

/** GET /api/meals/search?q= */
export async function searchMeals(req, res) {
  const query = (req.query.q || '').trim()

  if (!query) {
    throw new AppError('Search query parameter "q" is required', 400)
  }

  // Case-insensitive regex search on the title field
  const meals = await Meal.find({ title: { $regex: query, $options: 'i' } })

  res.status(200).json({ success: true, count: meals.length, query, data: meals })
}

/** GET /api/meals/:id */
export async function getMealById(req, res) {
  const meal = await Meal.findById(req.params.id)

  if (!meal) {
    throw new AppError(`Meal with id ${req.params.id} not found`, 404)
  }

  res.status(200).json({ success: true, data: meal })
}

/** POST /api/meals */
export async function createMeal(req, res) {
  const validated = validateMealBody(req.body)
  const newMeal = await Meal.create(validated)

  res.status(201).json({ success: true, data: newMeal })
}

/** PUT /api/meals/:id */
export async function updateMeal(req, res) {
  const validated = validateMealBody(req.body)

  const updatedMeal = await Meal.findByIdAndUpdate(
    req.params.id,
    validated,
    { new: true, runValidators: true }
  )

  if (!updatedMeal) {
    throw new AppError(`Meal with id ${req.params.id} not found`, 404)
  }

  res.status(200).json({ success: true, data: updatedMeal })
}

/** DELETE /api/meals/:id */
export async function deleteMeal(req, res) {
  const removed = await Meal.findByIdAndDelete(req.params.id)

  if (!removed) {
    throw new AppError(`Meal with id ${req.params.id} not found`, 404)
  }

  res.status(200).json({ success: true, data: removed })
}
