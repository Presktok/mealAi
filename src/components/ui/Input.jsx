/**
 * Input Component
 * @param {string} placeholder - Placeholder text
 * @param {string} value - Controlled input value
 * @param {function} onChange - Change handler
 */
function Input({ placeholder, value, onChange }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-800 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-900"
    />
  )
}

export default Input
