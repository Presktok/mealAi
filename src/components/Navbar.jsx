import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="flex flex-col items-center gap-4 bg-gray-800 px-4 py-4 text-white md:flex-row md:justify-between md:px-8">
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
      </ul>
    </nav>
  )
}

export default Navbar
