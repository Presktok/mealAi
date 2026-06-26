import apiClient from './client'

/** Fetch all meals from the backend. */
export async function fetchMeals() {
  const { data } = await apiClient.get('/meals')
  return data.data
}
