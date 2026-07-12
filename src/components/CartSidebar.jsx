import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import Loader from './ui/Loader'

function CartSidebar() {
  const { cartItems, updateQuantity, cartTotal, clearCart, isCartOpen, setIsCartOpen } = useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [address, setAddress] = useState('')
  const navigate = useNavigate()

  if (!isCartOpen) return null

  const handleCheckout = async () => {
    if (!address.trim()) {
      alert("Please enter your full delivery address.")
      return
    }

    setIsCheckingOut(true)
    
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        alert("Please log in to place an order.")
        setIsCheckingOut(false)
        return
      }

      const orderItems = cartItems.map(item => ({
        title: item.title,
        qty: item.quantity,
        price: item.price,
        image: item.image,
        meal: item._id
      }))

      const res = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          orderItems,
          totalPrice: cartTotal,
          address: address
        })
      })

      const data = await res.json()

      if (res.ok && data.success) {
        // Zomato style tracking redirect
        const newOrderId = data.data._id
        setIsCartOpen(false) // Close the sidebar
        clearCart()
        setAddress('')
        
        // Navigate to tracking page
        navigate(`/order/${newOrderId}`)
      } else {
        alert("Failed to place order. " + (data.error || "Please try again."))
      }
    } catch (error) {
      console.error("Checkout error:", error)
      alert("Something went wrong during checkout.")
    } finally {
      setIsCheckingOut(false)
    }
  }

  return (
    <>
      {/* Sidebar Overlay */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={() => setIsCartOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      {isCartOpen && (
        <div className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform dark:bg-gray-900 sm:w-[400px]">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 p-4 dark:border-gray-800">
            <h2 className="text-xl font-black text-gray-900 dark:text-white">Your Cart 🛒</h2>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-300"
            >
              ❌
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {cartItems.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center space-y-4 text-center">
                <div className="text-6xl opacity-50">🍽️</div>
                <p className="text-lg font-medium text-gray-500 dark:text-gray-400">Your cart is empty</p>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="text-primary hover:underline"
                >
                  Browse some food
                </button>
              </div>
            ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item._id} className="flex items-center gap-4 rounded-xl border border-gray-100 p-3 dark:border-gray-800 dark:bg-gray-800/50">
                  <img src={item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200'} alt={item.title} className="h-16 w-16 rounded-lg object-cover" />
                  <div className="flex-1">
                    <h4 className="line-clamp-1 font-semibold text-gray-900 dark:text-white">{item.title}</h4>
                    <p className="font-bold text-primary">₹{item.price}</p>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-2 py-1 dark:border-gray-700 dark:bg-gray-900">
                    <button 
                      onClick={() => updateQuantity(item._id, -1)}
                      className="text-gray-500 hover:text-primary dark:text-gray-400"
                    >
                      ➖
                    </button>
                    <span className="w-4 text-center font-bold dark:text-white">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item._id, 1)}
                      className="text-gray-500 hover:text-primary dark:text-gray-400"
                    >
                      ➕
                    </button>
                  </div>
                </div>
              ))}

              {/* Address Input Section */}
              <div className="mt-6 border-t border-gray-100 pt-6 dark:border-gray-800">
                <h3 className="mb-2 font-bold text-gray-900 dark:text-white">Delivery Address</h3>
                <textarea
                  placeholder="Enter your full delivery address (e.g., Flat no, Building, Street, Area)"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm text-gray-800 outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                  rows={3}
                ></textarea>
              </div>
            </div>
            )}
          </div>

          {/* Footer / Checkout */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900">
              <div className="mb-4 flex items-center justify-between text-lg font-bold dark:text-white">
                <span>Grand Total</span>
                <span>₹{cartTotal}</span>
              </div>
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut || !address.trim()}
                className="flex w-full items-center justify-center rounded-xl bg-primary py-4 font-bold text-white transition-transform hover:bg-primary-dark active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCheckingOut ? (
                  <span className="flex items-center gap-2"><Loader /> Processing...</span>
                ) : (
                  `Proceed to Pay ₹${cartTotal}`
                )}
              </button>
            </div>
          )}

        </div>
      )}
    </>
  )
}

export default CartSidebar
