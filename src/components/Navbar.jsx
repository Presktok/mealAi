import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

function Navbar() {
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className="flex flex-col items-center gap-4 bg-gray-800 px-4 py-4 text-white dark:bg-gray-950 md:flex-row md:justify-between md:px-8">
      <Link to="/" className="text-xl font-bold md:text-2xl">
        MoodMeal AI
      </Link>
      <ul className="flex list-none flex-col items-center gap-2 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-6">
        <li>
          <Link to="/" className="hover:text-yellow-300">
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" className="hover:text-yellow-300">
            About
          </Link>
        </li>
        <li>
          <Link to="/dashboard" className="hover:text-yellow-300">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/login" className="hover:text-yellow-300">
            Sign In
          </Link>
        </li>
        <li>
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-lg bg-gray-700 px-3 py-1 text-sm hover:bg-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? '🌞 Light' : '🌙 Dark'}
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
