const types = {
  success: 'bg-emerald-600 text-white',
  error: 'bg-red-600 text-white',
  info: 'bg-blue-600 text-white',
  warning: 'bg-amber-500 text-gray-900',
}

/**
 * Toast Component
 * @param {string} message - Message to display
 * @param {string} [type='info'] - Toast style: success, error, info, or warning
 */
function Toast({ message, type = 'info' }) {
  if (!message) return null

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 rounded-lg px-4 py-3 text-sm font-medium shadow-lg ${types[type] || types.info}`}
      role="status"
    >
      {message}
    </div>
  )
}

export default Toast
