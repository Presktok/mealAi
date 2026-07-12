import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PageLayout from '../components/PageLayout'
import Hero from '../components/Hero'

function Home() {
  const navigate = useNavigate()

  useEffect(() => {
    // If logged in, go straight to the Dashboard
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
    if (isLoggedIn) {
      navigate('/dashboard', { replace: true })
    }
  }, [navigate])

  return (
    <PageLayout>
      <Hero />
      
      <section className="mx-auto flex max-w-4xl flex-col items-center justify-center px-4 py-20 text-center md:px-8">
        <h2 className="mb-6 text-3xl font-black italic tracking-tighter text-gray-900 dark:text-white md:text-5xl">
          Hungry? <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">Log In to Order</span>
        </h2>
        <p className="mb-10 text-lg text-gray-600 dark:text-gray-300 md:text-xl">
          Join thousands of foodies discovering the best meals in Dehradun based on their current mood.
        </p>
        <div className="flex gap-4">
          <button 
            onClick={() => navigate('/login')}
            className="rounded-full bg-primary px-8 py-3 font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
          >
            Log In
          </button>
          <button 
            onClick={() => navigate('/signup')}
            className="rounded-full border-2 border-primary bg-white px-8 py-3 font-bold text-primary shadow-sm transition-transform hover:scale-105 active:scale-95 dark:bg-gray-900"
          >
            Sign Up
          </button>
        </div>
      </section>
    </PageLayout>
  )
}

export default Home
