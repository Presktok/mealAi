import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PageLayout from '../components/PageLayout'

function Profile() {
  const [activeTab, setActiveTab] = useState('orders')
  const navigate = useNavigate()

  const [user, setUser] = useState(null)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProfileData() {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          navigate('/login')
          return
        }
        
        // Fetch User and Orders in parallel
        const [userRes, ordersRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          fetch(`${import.meta.env.VITE_API_URL}/orders/myorders`, {
            headers: { Authorization: `Bearer ${token}` }
          })
        ])

        const userData = await userRes.json()
        const ordersData = await ordersRes.json()

        if (userData.success) {
          setUser(userData.data)
          if (ordersData.success) {
            setOrders(ordersData.data)
          }
        } else {
          // invalid token
          localStorage.removeItem('isLoggedIn')
          localStorage.removeItem('token')
          window.dispatchEvent(new Event('auth-change'))
          navigate('/login')
        }
      } catch (err) {
        console.error('Failed to fetch profile', err)
        localStorage.removeItem('isLoggedIn')
        localStorage.removeItem('token')
        window.dispatchEvent(new Event('auth-change'))
        navigate('/login')
      } finally {
        setLoading(false)
      }
    }
    fetchProfileData()
  }, [navigate])

  if (loading) {
    return (
      <PageLayout hideSearch={true}>
        <div className="flex min-h-[50vh] items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      </PageLayout>
    )
  }

  if (!user) {
    return (
      <PageLayout hideSearch={true}>
        <div className="flex min-h-[50vh] items-center justify-center text-center">
          <p className="text-xl text-red-500">Could not load profile data.</p>
        </div>
      </PageLayout>
    )
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }
    return new Date(dateString).toLocaleDateString('en-US', options)
  }

  const getDynamicStatus = (createdAt) => {
    const elapsedMinutes = (new Date() - new Date(createdAt)) / 1000 / 60
    if (elapsedMinutes < 2) return 'Order Accepted'
    if (elapsedMinutes < 10) return 'Preparing'
    if (elapsedMinutes < 20) return 'Out for delivery'
    return 'Delivered'
  }

  const tabs = [
    { id: 'orders', label: '📦 My Orders' },
    { id: 'details', label: '👤 Account Details' },
    { id: 'addresses', label: '📍 Saved Addresses' },
    { id: 'settings', label: '⚙️ Settings' }
  ]

  return (
    <PageLayout hideSearch={true}>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 md:flex-row md:px-8 md:py-12">
        
        {/* Sidebar */}
        <aside className="w-full md:w-1/4">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-800">
            <div className="mb-6 flex flex-col items-center border-b border-gray-100 pb-6 dark:border-gray-700">
              <div className="mb-3 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-4xl text-primary">
                👨‍𩱰
              </div>
              <h3 className="text-xl font-bold dark:text-white">{user.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
            </div>
            
            <nav className="flex flex-col gap-2">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex w-full items-center justify-start rounded-xl px-4 py-3 text-left font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
              <button 
                onClick={() => {
                  localStorage.removeItem('isLoggedIn');
                  localStorage.removeItem('token');
                  window.dispatchEvent(new Event('auth-change'));
                  navigate('/');
                }}
                className="mt-4 flex w-full items-center justify-start rounded-xl px-4 py-3 text-left font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                🚪 Log Out
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="w-full flex-1">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-800 sm:p-8">
            
            {/* ORDERS TAB */}
            {activeTab === 'orders' && (
              <div>
                <h2 className="mb-6 text-2xl font-bold dark:text-white">Past Orders</h2>
                <div className="flex flex-col gap-4">
                  {orders.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center dark:border-gray-700">
                      <p className="text-gray-500 dark:text-gray-400">No past orders found.</p>
                    </div>
                  ) : (
                    orders.map(order => {
                      const currentStatus = getDynamicStatus(order.createdAt)
                      return (
                      <div key={order._id} className="flex flex-col justify-between gap-4 rounded-xl border border-gray-100 p-5 transition-shadow hover:shadow-md dark:border-gray-700 sm:flex-row sm:items-center">
                        <div>
                          <div className="mb-1 flex items-center gap-3">
                            <h4 className="font-bold hover:text-primary transition-colors cursor-pointer dark:text-white" onClick={() => navigate(`/order/${order._id}`)}>
                              Order {order._id.substring(order._id.length - 6).toUpperCase()}
                            </h4>
                            <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                              currentStatus === 'Delivered' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                              : currentStatus === 'Cancelled' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                              : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                            }`}>
                              {currentStatus}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {order.orderItems.map(item => `${item.title} (x${item.qty})`).join(', ')}
                          </p>
                          <p className="mt-2 text-xs text-gray-400">{formatDate(order.createdAt)}</p>
                        </div>
                        <div className="flex items-center justify-between sm:flex-col sm:items-end">
                          <span className="text-lg font-bold text-primary">₹{order.totalPrice}</span>
                          <button 
                            onClick={() => navigate(`/order/${order._id}`)}
                            className="mt-2 rounded-lg border border-primary px-4 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-white"
                          >
                            Track Order
                          </button>
                        </div>
                      </div>
                    )})
                  )}
                </div>
              </div>
            )}

            {/* DETAILS TAB */}
            {activeTab === 'details' && (
              <div>
                <h2 className="mb-6 text-2xl font-bold dark:text-white">Account Details</h2>
                <form 
                  className="flex flex-col gap-5 max-w-md"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    
                    const formData = new FormData(e.target);
                    const name = formData.get('name');
                    const email = formData.get('email');
                    const phone = formData.get('phone');
                    
                    const btn = e.target.querySelector('button');
                    btn.disabled = true;
                    btn.textContent = 'Saving...';
                    
                    try {
                      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
                        method: 'PUT',
                        headers: {
                          'Content-Type': 'application/json',
                          Authorization: `Bearer ${localStorage.getItem('token')}`
                        },
                        body: JSON.stringify({ name, email, phone })
                      });
                      const data = await res.json();
                      if (data.success) {
                        setUser(data.data);
                        alert('Profile updated successfully!');
                      } else {
                        alert(data.error || 'Failed to update profile');
                      }
                    } catch (err) {
                      alert('Server error updating profile');
                    } finally {
                      btn.disabled = false;
                      btn.textContent = 'Save Changes';
                    }
                  }}
                >
                  <div>
                    <label className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-400">Full Name</label>
                    <input name="name" type="text" defaultValue={user.name} className="w-full rounded-lg border border-gray-200 p-3 outline-none focus:border-primary dark:border-gray-700 dark:bg-gray-900 dark:text-white" required />
                  </div>
                  <div>
                    <label className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-400">Email Address</label>
                    <input name="email" type="email" defaultValue={user.email} className="w-full rounded-lg border border-gray-200 p-3 outline-none focus:border-primary dark:border-gray-700 dark:bg-gray-900 dark:text-white" required />
                  </div>
                  <div>
                    <label className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-400">Phone Number</label>
                    <input name="phone" type="tel" defaultValue={user.phone} className="w-full rounded-lg border border-gray-200 p-3 outline-none focus:border-primary dark:border-gray-700 dark:bg-gray-900 dark:text-white" />
                  </div>
                  <button type="submit" className="mt-4 w-full rounded-lg bg-primary py-3 font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50">
                    Save Changes
                  </button>
                </form>
              </div>
            )}

            {/* ADDRESSES TAB */}
            {activeTab === 'addresses' && (
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-2xl font-bold dark:text-white">Saved Addresses</h2>
                  <button className="text-primary hover:underline font-medium">+ Add New</button>
                </div>
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 dark:bg-primary/10">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="rounded bg-primary px-2 py-0.5 text-xs font-bold text-white">HOME</span>
                  </div>
                  <p className="font-medium dark:text-white">{user.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Flat 402, Skyline Apartments, Rajpur Road</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Dehradun, Uttarakhand 248001</p>
                  <div className="mt-4 flex gap-4">
                    <button className="text-sm font-medium text-primary hover:underline">Edit</button>
                    <button className="text-sm font-medium text-red-500 hover:underline">Delete</button>
                  </div>
                </div>
              </div>
            )}

            {/* SETTINGS TAB */}
            {activeTab === 'settings' && (
              <div>
                <h2 className="mb-6 text-2xl font-bold dark:text-white">App Settings</h2>
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4 dark:border-gray-700">
                    <div>
                      <h4 className="font-bold dark:text-white">Push Notifications</h4>
                      <p className="text-sm text-gray-500">Receive order status updates and offers.</p>
                    </div>
                    <input type="checkbox" className="h-5 w-5 accent-primary" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4 dark:border-gray-700">
                    <div>
                      <h4 className="font-bold dark:text-white">Dark Mode Preference</h4>
                      <p className="text-sm text-gray-500">Toggle theme automatically with system.</p>
                    </div>
                    <input type="checkbox" className="h-5 w-5 accent-primary" />
                  </div>
                  <div>
                    <h4 className="mb-2 font-bold text-red-500">Danger Zone</h4>
                    <button className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100 dark:border-red-900/50 dark:bg-red-900/20 dark:hover:bg-red-900/40">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </main>
      </div>
    </PageLayout>
  )
}

export default Profile
