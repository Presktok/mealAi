import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const DATA_FILE = join(__dirname, '../data/meals.json')

/** Read all meals from the JSON file. */
export function getAllMeals() {
  const raw = readFileSync(DATA_FILE, 'utf-8')
  return JSON.parse(raw)
}

/** Persist the full meals array to disk. */
export function saveMeals(meals) {
  writeFileSync(DATA_FILE, JSON.stringify(meals, null, 2), 'utf-8')
}

/** Return the next available numeric id. */
export function getNextId(meals) {
  if (meals.length === 0) return 1
  return Math.max(...meals.map((meal) => meal.id)) + 1
}
