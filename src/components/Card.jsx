import { useCart } from '../context/CartContext'

function Card({ meal }) {
  const { title, rating, discount, image, distance, mood, price } = meal
  const { addToCart } = useCart()

  // Map mood back to icon for display
  const moodIcons = {
    spicy: '🌶️', sweet: '🍰', comfort: '🍕',
    healthy: '🥗', quick: '⚡', trending: '🔥'
  };
  const icon = moodIcons[mood] || '🍽️';

  return (
    <article className="card-hover flex flex-col overflow-hidden rounded-2xl bg-surface shadow-md dark:bg-surface-dark">
      <div className="relative h-48 w-full overflow-hidden bg-gray-200 dark:bg-gray-700">
        {image ? (
          <img src={image} alt={title} className="h-full w-full object-cover transition-transform duration-500 hover:scale-110" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-300 to-gray-400">
            <span className="text-4xl">🍽️</span>
          </div>
        )}
        {discount && (
          <div className="absolute left-0 top-4 rounded-r-lg bg-green-discount px-3 py-1 text-sm font-bold text-white shadow-md">
            {discount} OFF
          </div>
        )}
      </div>
      
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1 flex items-start justify-between gap-2">
          <h3 className="line-clamp-1 text-lg font-bold text-text-primary dark:text-white">{title}</h3>
          <div className="flex items-center gap-1 rounded bg-green-700 px-2 py-0.5 text-xs font-bold text-white">
            {rating} <span className="text-[10px]">★</span>
          </div>
        </div>
        
        <div className="mt-2 flex items-center justify-between text-sm text-text-secondary dark:text-gray-400">
          <div className="flex items-center gap-1">
            <span className="capitalize">{mood} {icon}</span>
          </div>
          <div className="flex items-center gap-1 font-medium">
            <span>📍 {distance} km</span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3 dark:border-gray-800">
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            ₹{price || 250}
          </span>
          <button 
            onClick={() => addToCart(meal)}
            className="rounded-lg border border-primary px-4 py-1.5 font-bold text-primary transition-colors hover:bg-primary hover:text-white dark:border-primary dark:text-primary"
          >
            ADD
          </button>
        </div>
      </div>
    </article>
  )
}

export default Card
