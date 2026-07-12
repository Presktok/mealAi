import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import PageLayout from '../components/PageLayout'
import Hero from '../components/Hero'
import Card from '../components/Card'
import MoodSelector from '../components/MoodSelector'
import CategorySelector from '../components/CategorySelector'
import { fetchMeals, searchMeals } from '../api/meals'

function Dashboard() {
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('search')
  const aiSearchQuery = searchParams.get('ai_search')
  const tokenFromUrl = searchParams.get('token')
  const navigate = useNavigate()

  useEffect(() => {
    if (tokenFromUrl) {
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('token', tokenFromUrl)
      window.dispatchEvent(new Event('auth-change'))
      navigate('/dashboard', { replace: true })
    }
  }, [tokenFromUrl, navigate])
  
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedMood, setSelectedMood] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [activeOrder, setActiveOrder] = useState(null)
  
  // AI Feature State
  const [aiMessage, setAiMessage] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadMealsAndOrders() {
      try {
        setLoading(true)
        setError(null)
        setAiMessage('')
        
        if (aiSearchQuery) {
          // AI Search Mode
          if (selectedMood) setSelectedMood('')
          if (selectedCategory) setSelectedCategory('')
          
          const res = await fetch(`${import.meta.env.VITE_API_URL}/ai/recommend`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: aiSearchQuery })
          })
          const data = await res.json()
          
          if (data.success) {
            if (isMounted) {
              setMeals(data.data)
              setAiMessage(data.message)
            }
          } else {
            throw new Error(data.error || 'Failed to fetch AI recommendations')
          }
        } else if (searchQuery) {
          // Regular Search Mode
          if (selectedMood) setSelectedMood('')
          if (selectedCategory) setSelectedCategory('')
          const data = await searchMeals(searchQuery)
          if (isMounted) setMeals(data)
        } else {
          // Standard Category/Mood Mode
          const data = await fetchMeals({ mood: selectedMood, category: selectedCategory })
          if (isMounted) setMeals(data)
        }

        // Fetch active orders if user is logged in
        const token = localStorage.getItem('token')
        if (token) {
          const res = await fetch(`${import.meta.env.VITE_API_URL}/orders/myorders`, {
            headers: { Authorization: `Bearer ${token}` }
          })
          const orderData = await res.json()
          if (orderData.success && orderData.data.length > 0) {
            const latest = orderData.data[0]
            // check if order is less than 20 mins old
            const elapsedMinutes = (new Date() - new Date(latest.createdAt)) / 1000 / 60
            if (elapsedMinutes < 20) {
              if (isMounted) setActiveOrder(latest)
            }
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err.message || err.response?.data?.error ||
              'Could not load meals. Make sure the backend is running on port 5000.'
          )
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    loadMealsAndOrders()
    return () => {
      isMounted = false
    }
  }, [selectedMood, selectedCategory, searchQuery, aiSearchQuery])

  return (
    <PageLayout>
      <Hero />
      
      {!(searchQuery || aiSearchQuery) && (
        <div className="w-full pt-8">
          <CategorySelector selectedCategory={selectedCategory} onSelectCategory={(cat) => {
            setSelectedCategory(cat)
            setSelectedMood('') // mutually exclusive for now for clarity
          }} />
        </div>
      )}

      {!(searchQuery || aiSearchQuery) && (
        <div className="w-full">
          <MoodSelector selectedMood={selectedMood} onSelectMood={(mood) => {
            setSelectedMood(mood)
            setSelectedCategory('')
          }} />
        </div>
      )}

      <section className="mx-auto max-w-6xl px-4 md:px-8 pb-8">
        
        {/* Regular Search Header */}
        {searchQuery && (
          <div className="mb-6 pt-8">
            <h2 className="text-2xl font-bold dark:text-white">Search results for "{searchQuery}"</h2>
            <button 
              onClick={() => window.history.replaceState({}, '', '/dashboard')}
              className="mt-2 text-primary hover:underline"
            >
              Clear search
            </button>
          </div>
        )}

        {/* AI Search Header */}
        {aiSearchQuery && (
          <div className="mb-8 pt-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl animate-pulse">✨</span>
              <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
                AI Recommendations
              </h2>
            </div>
            
            {aiMessage && (
              <div className="rounded-2xl bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800 p-6 relative overflow-hidden">
                <div className="absolute -right-10 -top-10 text-9xl opacity-5">🤖</div>
                <p className="text-lg font-medium text-purple-900 dark:text-purple-200 relative z-10 italic">
                  "{aiMessage}"
                </p>
              </div>
            )}
            
            <button 
              onClick={() => window.history.replaceState({}, '', '/dashboard')}
              className="mt-4 text-purple-600 dark:text-purple-400 font-bold hover:underline"
            >
              ← Back to normal menu
            </button>
          </div>
        )}

        {!(searchQuery || aiSearchQuery) && selectedMood && (
          <h2 className="mb-6 text-2xl font-bold capitalize dark:text-white">
            {selectedMood} Food Delivery Restaurants in Dehradun
          </h2>
        )}

        {!(searchQuery || aiSearchQuery) && !selectedMood && (
          <h2 className="mb-6 text-2xl font-bold dark:text-white">
            Best Food in Dehradun
          </h2>
        )}

        {error && !loading && (
          <div className="my-12 flex flex-col items-center justify-center text-center">
            <span className="mb-4 text-4xl">😕</span>
            <p className="text-lg text-gray-500 dark:text-gray-400">{error}</p>
          </div>
        )}

        {loading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-72 w-full rounded-2xl bg-white shadow-sm dark:bg-gray-800">
                <div className="skeleton h-48 w-full rounded-t-2xl"></div>
                <div className="p-4">
                  <div className="skeleton mb-3 h-5 w-3/4"></div>
                  <div className="skeleton h-4 w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && meals.length === 0 && (
          <div className="my-12 flex flex-col items-center justify-center text-center">
            <img src="/images/meals/buddha-bowl.jpg" alt="No results" className="mb-6 h-48 w-48 rounded-full object-cover opacity-50 grayscale" />
            <h3 className="mb-2 text-2xl font-bold dark:text-white">No meals found</h3>
            <p className="text-gray-500 dark:text-gray-400">Try changing your mood or search query.</p>
          </div>
        )}

        {!loading && !error && meals.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {meals.slice(0, 4).map((meal) => (
              <Card key={meal._id} meal={meal} />
            ))}
          </div>
        )}
      </section>

      {/* Active Order Floating Banner */}
      {activeOrder && (
        <div 
          onClick={() => navigate(`/order/${activeOrder._id}`)}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex w-11/12 max-w-md cursor-pointer items-center justify-between rounded-2xl bg-gray-900 p-4 text-white shadow-2xl transition-transform hover:scale-105 active:scale-95 sm:bottom-10"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-2xl">
              🛵
            </div>
            <div>
              <h4 className="font-bold">Order Preparing...</h4>
              <p className="text-sm text-gray-300">Tap to track your live order</p>
            </div>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-xl shadow-lg">
            ›
          </div>
        </div>
      )}
    </PageLayout>
  )
}

export default Dashboard
