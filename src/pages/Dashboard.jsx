import PageLayout from '../components/PageLayout'
import { meals } from '../data/meals'

const recentSearches = ['Biryani near me', 'Comfort food', 'Late night snacks']

function Dashboard() {
  return (
    <PageLayout variant="content">
      <h1 className="mb-6 text-3xl font-bold">Your Meal Board</h1>

      <section className="mb-8 rounded-xl bg-white p-6 shadow-md dark:bg-gray-800 dark:shadow-gray-900/50">
        <h2 className="mb-3 text-lg font-semibold">User Profile</h2>
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 text-xl font-bold text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300">
            PK
          </div>
          <div>
            <p className="font-medium">Prince Kumar</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">TBI-26100022</p>
          </div>
        </div>
      </section>

      <section className="mb-8 rounded-xl bg-white p-6 shadow-md dark:bg-gray-800 dark:shadow-gray-900/50">
        <h2 className="mb-3 text-lg font-semibold">Recent Searches</h2>
        <ul className="space-y-2">
          {recentSearches.map((search) => (
            <li
              key={search}
              className="rounded-lg bg-gray-100 px-4 py-2 text-sm dark:bg-gray-700"
            >
              {search}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl bg-white p-6 shadow-md dark:bg-gray-800 dark:shadow-gray-900/50">
        <h2 className="mb-3 text-lg font-semibold">Recommended Meals</h2>
        <ul className="space-y-3">
          {meals.map((meal) => (
            <li
              key={meal.title}
              className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3 dark:border-gray-600"
            >
              <span className="font-medium">{meal.title}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {meal.rating}/5
              </span>
            </li>
          ))}
        </ul>
      </section>
    </PageLayout>
  )
}

export default Dashboard
