import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="mt-auto bg-gray-50 pt-12 text-gray-800 dark:bg-gray-950 dark:text-gray-300">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="mb-8 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <Link to="/" className="text-3xl font-black italic tracking-tighter text-primary">
            MoodMeal AI
          </Link>
          <div className="flex gap-4">
            <button className="rounded border border-gray-300 px-3 py-1 text-sm dark:border-gray-700">🇮🇳 India</button>
            <button className="rounded border border-gray-300 px-3 py-1 text-sm dark:border-gray-700">🌐 English</button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 py-8 md:grid-cols-4">
          <div>
            <h4 className="mb-4 font-semibold uppercase tracking-wider text-black dark:text-white">About MoodMeal</h4>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li><Link to="/about" className="hover:text-primary">Who We Are</Link></li>
              <li><Link to="/" className="hover:text-primary">Blog</Link></li>
              <li><Link to="/" className="hover:text-primary">Work With Us</Link></li>
              <li><Link to="/" className="hover:text-primary">Investor Relations</Link></li>
              <li><Link to="/" className="hover:text-primary">Report Fraud</Link></li>
              <li><Link to="/" className="hover:text-primary">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold uppercase tracking-wider text-black dark:text-white">Zomaverse</h4>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li><Link to="/" className="hover:text-primary">MoodMeal</Link></li>
              <li><Link to="/" className="hover:text-primary">Blinkit</Link></li>
              <li><Link to="/" className="hover:text-primary">Feeding India</Link></li>
              <li><Link to="/" className="hover:text-primary">Hyperpure</Link></li>
              <li><Link to="/" className="hover:text-primary">Zomaland</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold uppercase tracking-wider text-black dark:text-white">For Restaurants</h4>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li><Link to="/" className="hover:text-primary">Partner With Us</Link></li>
              <li><Link to="/" className="hover:text-primary">Apps For You</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold uppercase tracking-wider text-black dark:text-white">Social Links</h4>
            <div className="mb-4 flex gap-3 text-2xl">
              <span>📱</span>
              <span>📸</span>
              <span>🐦</span>
              <span>▶️</span>
            </div>
            <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="mb-2 h-10 w-auto" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-10 w-auto" />
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 py-6 text-xs text-gray-500 dark:border-gray-800 dark:text-gray-500">
          <p>By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy and Content Policies. All trademarks are properties of their respective owners. 2008-2026 © MoodMeal AI Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
