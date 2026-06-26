import { AppError } from '../middleware/errorHandler.js'
import { getAllMeals, saveMeals, getNextId } from '../utils/mealStore.js'

/** Validate meal fields for create/update operations. */
function validateMealBody(body) {
  const { title, rating, discount } = body

  if (!title || typeof title !== 'string' || !title.trim()) {
    throw new AppError('title is required and must be a non-empty string', 400)
  }

  if (rating === undefined || typeof rating !== 'number' || rating < 0 || rating > 5) {
    throw new AppError('rating is required and must be a number between 0 and 5', 400)
  }

  if (!discount || typeof discount !== 'string' || !discount.trim()) {
    throw new AppError('discount is required and must be a non-empty string', 400)
  }

  return {
    title: title.trim(),
    rating,
    discount: discount.trim(),
  }
}

/** GET /api/meals */
export function listMeals(req, res) {
  const meals = getAllMeals()
  res.status(200).json({ success: true, count: meals.length, data: meals })
}

/** GET /api/meals/search?q= */
export function searchMeals(req, res) {
  const query = (req.query.q || '').trim().toLowerCase()

  if (!query) {
    throw new AppError('Search query parameter "q" is required', 400)
  }

  const meals = getAllMeals().filter((meal) =>
    meal.title.toLowerCase().includes(query)
  )

  res.status(200).json({ success: true, count: meals.length, query, data: meals })
}

/** GET /api/meals/:id */
export function getMealById(req, res) {
  const id = Number(req.params.id)

  if (Number.isNaN(id)) {
    throw new AppError('Invalid meal id', 400)
  }

  const meal = getAllMeals().find((item) => item.id === id)

  if (!meal) {
    throw new AppError(`Meal with id ${id} not found`, 404)
  }

  res.status(200).json({ success: true, data: meal })
}

/** POST /api/meals */
export function createMeal(req, res) {
  const validated = validateMealBody(req.body)
  const meals = getAllMeals()
  const newMeal = { id: getNextId(meals), ...validated }

  meals.push(newMeal)
  saveMeals(meals)

  res.status(201).json({ success: true, data: newMeal })
}

/** PUT /api/meals/:id */
export function updateMeal(req, res) {
  const id = Number(req.params.id)

  if (Number.isNaN(id)) {
    throw new AppError('Invalid meal id', 400)
  }

  const validated = validateMealBody(req.body)
  const meals = getAllMeals()
  const index = meals.findIndex((item) => item.id === id)

  if (index === -1) {
    throw new AppError(`Meal with id ${id} not found`, 404)
  }

  const updatedMeal = { id, ...validated }
  meals[index] = updatedMeal
  saveMeals(meals)

  res.status(200).json({ success: true, data: updatedMeal })
}

/** DELETE /api/meals/:id */
export function deleteMeal(req, res) {
  const id = Number(req.params.id)

  if (Number.isNaN(id)) {
    throw new AppError('Invalid meal id', 400)
  }

  const meals = getAllMeals()
  const index = meals.findIndex((item) => item.id === id)

  if (index === -1) {
    throw new AppError(`Meal with id ${id} not found`, 404)
  }

  const [removed] = meals.splice(index, 1)
  saveMeals(meals)

  res.status(200).json({ success: true, data: removed })
}
