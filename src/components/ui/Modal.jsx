/**
 * Modal Component
 * @param {boolean} isOpen - Whether the modal is visible
 * @param {function} onClose - Called when the modal should close
 * @param {import('react').ReactNode} children - Modal body content
 */
function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-label="Close modal"
      />
      <div className="relative z-10 w-full max-w-md rounded-xl bg-white p-6 shadow-xl dark:bg-gray-800">
        {children}
      </div>
    </div>
  )
}

export default Modal
