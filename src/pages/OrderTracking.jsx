import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import PageLayout from '../components/PageLayout'

function OrderTracking() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  const [currentStatus, setCurrentStatus] = useState('Order Accepted')
  const [eta, setEta] = useState(20)

  useEffect(() => {
    async function fetchOrder() {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          navigate('/login')
          return
        }

        const res = await fetch(`${import.meta.env.VITE_API_URL}/orders/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        const data = await res.json()

        if (data.success) {
          setOrder(data.data)
        } else {
          alert('Order not found or not authorized.')
          navigate('/profile')
        }
      } catch (err) {
        console.error('Failed to fetch order', err)
        navigate('/profile')
      } finally {
        setLoading(false)
      }
    }
    fetchOrder()
  }, [id, navigate])

  useEffect(() => {
    if (!order) return
    
    const getDynamicStatus = (createdAt) => {
      const elapsedMinutes = (new Date() - new Date(createdAt)) / 1000 / 60
      if (elapsedMinutes < 2) return 'Order Accepted'
      if (elapsedMinutes < 10) return 'Preparing Food'
      if (elapsedMinutes < 20) return 'Out for Delivery'
      return 'Delivered'
    }

    const getEtaMinutes = (createdAt) => {
      const elapsedMinutes = (new Date() - new Date(createdAt)) / 1000 / 60
      const remaining = 20 - Math.floor(elapsedMinutes)
      return remaining > 0 ? remaining : 0
    }

    const updateTracking = () => {
      setCurrentStatus(getDynamicStatus(order.createdAt))
      setEta(getEtaMinutes(order.createdAt))
    }
    
    updateTracking()
    const interval = setInterval(updateTracking, 10000) // Update every 10 seconds for real-time feel
    return () => clearInterval(interval)
  }, [order])

  if (loading) {
    return (
      <PageLayout hideSearch={true}>
        <div className="flex min-h-[70vh] items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      </PageLayout>
    )
  }

  if (!order) return null

  // Timeline UI (Zomato Style)
  const timelineSteps = [
    { title: 'Order Accepted', icon: '✅', active: true },
    { title: 'Preparing Food', icon: '🍳', active: currentStatus === 'Preparing Food' || currentStatus === 'Out for Delivery' || currentStatus === 'Delivered' },
    { title: 'Out for Delivery', icon: '🛵', active: currentStatus === 'Out for Delivery' || currentStatus === 'Delivered' },
    { title: 'Delivered', icon: '🏡', active: currentStatus === 'Delivered' },
  ]

  return (
    <PageLayout hideSearch={true}>
      <div className="mx-auto max-w-4xl px-4 py-8 md:px-8">
        
        {/* Map / Tracking Header */}
        <div className="relative mb-8 overflow-hidden rounded-2xl bg-gray-900 shadow-sm h-64 md:h-80 w-full flex flex-col items-center justify-center border border-gray-200 dark:border-gray-700">
          {/* Professional Animated Background Image (Ken Burns effect) */}
          {currentStatus !== 'Delivered' ? (
            <div className="absolute inset-0 bg-gray-900 overflow-hidden pointer-events-none rounded-2xl">
              <style>
                {`
                  @keyframes pan-image {
                    0% { transform: scale(1.15) translateX(0); }
                    50% { transform: scale(1.15) translateX(-5%); }
                    100% { transform: scale(1.15) translateX(0); }
                  }
                  .animate-pan {
                    animation: pan-image 25s ease-in-out infinite;
                  }
                `}
              </style>
              <img 
                src="/rider.jpg" 
                alt="Delivery Rider"
                className="absolute inset-0 h-full w-[110%] max-w-none object-cover opacity-60 dark:opacity-40 animate-pan"
              />
            </div>
          ) : (
            <div className="absolute inset-0 bg-green-50 dark:bg-green-900/20 overflow-hidden pointer-events-none rounded-2xl border border-green-200 dark:border-green-800">
               {/* Static background when delivered */}
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 dark:opacity-10"></div>
            </div>
          )}
          
          <div className="relative z-10 flex flex-col items-center text-center p-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
            <span className="mb-2 text-5xl">🛵</span>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white">
              {currentStatus === 'Delivered' ? 'Delivered' : `Arriving in ${eta} mins`}
            </h1>
            <p className="mt-1 font-medium text-primary">
              {currentStatus === 'Delivered' ? 'Hope you enjoyed your meal!' : 'Your order is on time!'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Main Tracking Details */}
          <div className="md:col-span-2 flex flex-col gap-6">
            
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-800">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold dark:text-white">Order Status</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Order ID: {order._id.substring(order._id.length - 6).toUpperCase()}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-sm font-bold ${
                  currentStatus === 'Delivered' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                  : currentStatus === 'Cancelled' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                  : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 animate-pulse'
                }`}>
                  {currentStatus}
                </span>
              </div>
              
              {/* Timeline */}
              <div className="relative flex flex-col space-y-6 before:absolute before:left-[23px] before:top-4 before:h-[calc(100%-2rem)] before:w-1 before:bg-gray-200 dark:before:bg-gray-700">
                {timelineSteps.map((step, idx) => (
                  <div key={idx} className={`relative z-10 flex items-center gap-4 ${step.active ? 'opacity-100' : 'opacity-40'}`}>
                    <div className={`flex h-12 w-12 items-center justify-center rounded-full text-2xl shadow-md ${step.active ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500 dark:bg-gray-700'}`}>
                      {step.icon}
                    </div>
                    <div>
                      <h4 className={`font-bold ${step.active ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                        {step.title}
                      </h4>
                      {step.title === 'Preparing Food' && step.active && (
                        <p className="text-xs font-medium text-orange-500">The chef is wrapping up your food.</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-800">
              <h3 className="mb-4 text-xl font-bold dark:text-white">Delivery Address</h3>
              <div className="flex gap-4">
                <span className="text-3xl">📍</span>
                <p className="font-medium text-gray-600 dark:text-gray-300">
                  {order.deliveryAddress || 'Address not provided during checkout.'}
                </p>
              </div>
            </div>
            
          </div>

          {/* Sidebar Bill Summary */}
          <div className="md:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-800">
              <h3 className="mb-4 font-bold dark:text-white">Bill Details</h3>
              <div className="flex flex-col gap-3 border-b border-gray-100 pb-4 dark:border-gray-700">
                {order.orderItems.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300 flex-1">{item.title} <span className="text-gray-400">x{item.qty}</span></span>
                    <span className="font-medium dark:text-white">₹{item.price * item.qty}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-between text-lg font-black dark:text-white">
                <span>Total Paid</span>
                <span>₹{order.totalPrice}</span>
              </div>
              <button 
                onClick={() => navigate('/profile')}
                className="mt-6 w-full rounded-xl bg-gray-100 py-3 font-semibold text-gray-900 hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition-colors"
              >
                Back to Profile
              </button>
            </div>
          </div>

        </div>
      </div>
    </PageLayout>
  )
}

export default OrderTracking
