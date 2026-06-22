const sizes = {
  sm: 'h-5 w-5 border-2',
  md: 'h-8 w-8 border-[3px]',
  lg: 'h-12 w-12 border-4',
}

/**
 * Loader Component
 * @param {string} [size='md'] - Spinner size: sm, md, or lg
 */
function Loader({ size = 'md' }) {
  return (
    <div
      className={`animate-spin rounded-full border-indigo-600 border-t-transparent dark:border-indigo-400 ${sizes[size] || sizes.md}`}
      role="status"
      aria-label="Loading"
    />
  )
}

export default Loader
