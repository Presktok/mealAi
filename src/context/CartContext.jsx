import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('moodmeal-cart')
    return saved ? JSON.parse(saved) : []
  })
  
  const [isCartOpen, setIsCartOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem('moodmeal-cart', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (meal) => {
    setCartItems((prev) => {
      const existing = prev.find(item => item._id === meal._id)
      if (existing) {
        return prev.map(item => 
          item._id === meal._id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { ...meal, quantity: 1 }]
    })
    setIsCartOpen(true) // auto open cart on add
  }

  const updateQuantity = (mealId, delta) => {
    setCartItems((prev) => {
      return prev.map(item => {
        if (item._id === mealId) {
          const newQ = item.quantity + delta
          return newQ > 0 ? { ...item, quantity: newQ } : null
        }
        return item
      }).filter(Boolean)
    })
  }

  const clearCart = () => setCartItems([])

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      updateQuantity, 
      clearCart, 
      cartTotal, 
      cartCount,
      isCartOpen,
      setIsCartOpen
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
