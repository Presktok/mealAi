const variants = {
  primary:
    'bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600',
  secondary:
    'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600',
  outline:
    'border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-gray-800',
  danger:
    'bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600',
}

/**
 * Button Component
 * @param {string} text - Label shown on the button
 * @param {function} onClick - Click handler
 * @param {string} [variant='primary'] - Visual style: primary, secondary, outline, or danger
 */
function Button({ text, onClick, variant = 'primary' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${variants[variant] || variants.primary}`}
    >
      {text}
    </button>
  )
}

export default Button
