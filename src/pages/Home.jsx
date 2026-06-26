import { useEffect, useState } from 'react'
import PageLayout from '../components/PageLayout'
import Hero from '../components/Hero'
import Card from '../components/Card'
import Loader from '../components/ui/Loader'
import { fetchMeals } from '../api/meals'

function Home() {
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    async function loadMeals() {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchMeals()
        if (isMounted) setMeals(data)
      } catch (err) {
        if (isMounted) {
          setError(
            err.response?.data?.error ||
              'Could not load meals. Make sure the backend is running on port 5000.'
          )
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    loadMeals()
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <PageLayout>
      <Hero />
      <section className="mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-12">
        <h2 className="mb-8 text-center text-2xl font-bold dark:text-gray-100">
          Meals We Think You Will Like
        </h2>

        {loading && (
          <div className="flex justify-center py-12">
            <Loader />
          </div>
        )}

        {error && !loading && (
          <p className="text-center text-red-500 dark:text-red-400" role="alert">
            {error}
          </p>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {meals.map((food) => (
              <Card
                key={food.id}
                title={food.title}
                rating={food.rating}
                discount={food.discount}
              />
            ))}
          </div>
        )}
      </section>
    </PageLayout>
  )
}

export default Home
