function Card({ title, rating, discount }) {
  return (
    <article className="overflow-hidden rounded-xl bg-white shadow-lg dark:bg-gray-800 dark:shadow-gray-900/50">
      <div className="h-40 bg-gradient-to-br from-pink-400 to-orange-500" />
      <div className="p-5">
        <h3 className="mb-2 text-lg font-semibold">{title}</h3>
        <p className="mb-3 text-gray-500 dark:text-gray-400">User score: {rating}/5</p>
        <span className="inline-block rounded-full bg-emerald-500 px-3 py-1 text-sm font-semibold text-white">
          Save {discount}
        </span>
      </div>
    </article>
  )
}

export default Card
