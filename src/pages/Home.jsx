import PageLayout from '../components/PageLayout'
import Hero from '../components/Hero'
import Card from '../components/Card'
import { meals } from '../data/meals'

function Home() {
  return (
    <PageLayout>
      <Hero />
      <section className="mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-12">
        <h2 className="mb-8 text-center text-2xl font-bold dark:text-gray-100">
          Meals We Think You Will Like
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {meals.map((food) => (
            <Card
              key={food.title}
              title={food.title}
              rating={food.rating}
              discount={food.discount}
            />
          ))}
        </div>
      </section>
    </PageLayout>
  )
}

export default Home
