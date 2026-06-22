import PageLayout from '../components/PageLayout'
import Hero from '../components/Hero'
import Card from '../components/Card'

const foodCards = [
  { title: 'Hyderabadi Chicken Biryani', rating: 4.8, discount: '25%' },
  { title: 'Walnut Fudge Brownie', rating: 4.7, discount: '15%' },
  { title: 'Tandoori Paneer Skewers', rating: 4.6, discount: '20%' },
]

function Home() {
  return (
    <PageLayout>
      <Hero />
      <section className="mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-12">
        <h2 className="mb-8 text-center text-2xl font-bold">Meals We Think You Will Like</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {foodCards.map((food) => (
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
