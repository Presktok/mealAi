import apiClient from './client'

/** Fetch all meals from the backend, optionally filtered by mood, category, or search query. */
export async function fetchMeals(params = {}) {
  const query = new URLSearchParams()
  if (params.mood) query.append('mood', params.mood)
  if (params.category) query.append('category', params.category)
  
  const url = query.toString() ? `/meals?${query.toString()}` : '/meals'
  const { data } = await apiClient.get(url)
  return data.data
}

/** Search meals by title */
export async function searchMeals(q) {
  const { data } = await apiClient.get(`/meals/search?q=${encodeURIComponent(q)}`)
  return data.data
}
