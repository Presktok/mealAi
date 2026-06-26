import { Router } from 'express'
import { asyncHandler } from '../middleware/errorHandler.js'
import {
  listMeals,
  searchMeals,
  getMealById,
  createMeal,
  updateMeal,
  deleteMeal,
} from '../controllers/mealController.js'

const router = Router()

// Search must be registered before /:id to avoid treating "search" as an id
router.get('/search', asyncHandler(searchMeals))
router.get('/', asyncHandler(listMeals))
router.get('/:id', asyncHandler(getMealById))
router.post('/', asyncHandler(createMeal))
router.put('/:id', asyncHandler(updateMeal))
router.delete('/:id', asyncHandler(deleteMeal))

export default router
