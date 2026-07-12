import { Link, useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'

function Navbar({ hideSearch = false }) {
  const { theme, toggleTheme } = useTheme()
  const { cartCount, setIsCartOpen } = useCart()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Check simple auth state
  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true')
    
    // Listen for storage changes from other tabs/components
    const handleStorageChange = () => {
      setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true')
    }
    window.addEventListener('storage', handleStorageChange)
    // Custom event for same-tab updates
    window.addEventListener('auth-change', handleStorageChange)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('auth-change', handleStorageChange)
    }
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <nav className="sticky top-0 z-50 flex flex-col items-center gap-4 border-b border-gray-100 bg-white px-4 py-3 shadow-sm dark:border-gray-800 dark:bg-gray-900 md:flex-row md:justify-between md:px-8">
      <Link to="/" className="text-2xl font-black italic tracking-tighter text-primary">
        MoodMeal AI
      </Link>
      
      {/* Search Bar - hidden on mobile, shown in hero instead */}
      {!hideSearch && (
        <form onSubmit={handleSearch} className="search-ring hidden w-full max-w-md items-center rounded-lg border border-gray-300 bg-white px-3 py-2 shadow-sm transition-shadow dark:border-gray-700 dark:bg-gray-800 md:flex">
          <span className="mr-2 text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="Search for restaurant, cuisine or a dish"
            className="w-full bg-transparent text-sm outline-none dark:text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      )}

      <ul className="flex list-none items-center gap-6 text-lg font-medium text-gray-500 dark:text-gray-300">
        <li>
          <Link to="/about" className="hover:text-primary">About</Link>
        </li>
        
        {isLoggedIn && (
          <li>
            <Link to="/dashboard" className="hover:text-primary">Dashboard</Link>
          </li>
        )}
        
        {!isLoggedIn && (
          <>
            <li>
              <Link to="/login" className="hover:text-primary">Log in</Link>
            </li>
            <li>
              <Link to="/signup" className="hover:text-primary">Sign up</Link>
            </li>
          </>
        )}
        
        <li className="flex items-center gap-4">
          {isLoggedIn && (
            <Link
              to="/profile"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
              aria-label="Profile"
            >
              👤
            </Link>
          )}

          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
            aria-label="View Cart"
          >
            🛒
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-white shadow-sm">
                {cartCount}
              </span>
            )}
          </button>
          
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
