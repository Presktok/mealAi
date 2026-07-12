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

import { protect } from '../middleware/authMiddleware.js'

// Search must be registered before /:id to avoid treating "search" as an id
router.get('/search', asyncHandler(searchMeals))
router.get('/', asyncHandler(listMeals))
router.get('/:id', asyncHandler(getMealById))
router.post('/', protect, asyncHandler(createMeal))
router.put('/:id', protect, asyncHandler(updateMeal))
router.delete('/:id', protect, asyncHandler(deleteMeal))

export default router
