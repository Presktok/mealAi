import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import PageLayout from '../components/PageLayout'

function Profile() {
  const [activeTab, setActiveTab] = useState('orders')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
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

  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = await res.json()
      if (data.success) {
        localStorage.removeItem('isLoggedIn')
        localStorage.removeItem('token')
        window.dispatchEvent(new Event('auth-change'))
        navigate('/')
      } else {
        alert(data.error || 'Failed to delete account')
      }
    } catch (err) {
      console.error(err)
      alert('Server error deleting account')
    }
  }

  return (
    <PageLayout hideSearch={true}>
      <div className="profile-redesign">
        <div className="page">
          
          {/* Profile sidebar */}
          <div className="profile-card">
            <div className="avatar-wrap">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} referrerPolicy="no-referrer" />
              ) : (
                <div style={{width:'100%', height:'100%', borderRadius:'50%', background:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'40px'}}>
                  👨‍𩱰
                </div>
              )}
            </div>
            <div className="profile-name">{user.name}</div>
            <div className="profile-email">{user.email}</div>
            <div className="divider"></div>
            <div className="side-nav">
              <button 
                className={`side-item ${activeTab === 'orders' ? 'active' : ''}`}
                onClick={() => setActiveTab('orders')}
              >
                <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                My Orders
              </button>
              <button 
                className={`side-item ${activeTab === 'details' ? 'active' : ''}`}
                onClick={() => setActiveTab('details')}
              >
                <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7"/></svg>
                Account Details
              </button>
              <button 
                className={`side-item ${activeTab === 'settings' ? 'active' : ''}`}
                onClick={() => setActiveTab('settings')}
              >
                <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>
                Settings
              </button>
              <div className="side-gap"></div>
              <button 
                className="side-item logout"
                onClick={() => {
                  localStorage.removeItem('isLoggedIn');
                  localStorage.removeItem('token');
                  window.dispatchEvent(new Event('auth-change'));
                  navigate('/');
                }}
              >
                <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/></svg>
                Log Out
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="orders-panel">
            {activeTab === 'orders' && (
              <>
                <div className="panel-head">
                  <h1 className="panel-title">Past Orders</h1>
                </div>
                <p className="panel-sub">{orders.length} orders · {orders.filter(o => getDynamicStatus(o.createdAt) === 'Delivered').length} delivered</p>
                
                <div className="order-list">
                  {orders.length === 0 ? (
                    <div style={{padding:'40px', textAlign:'center', color:'var(--muted)'}}>No past orders found.</div>
                  ) : (
                    orders.map(order => {
                      const status = getDynamicStatus(order.createdAt);
                      const statusClass = status === 'Delivered' ? '' : (status === 'Cancelled' ? 'cancelled' : 'preparing');
                      return (
                        <div key={order._id} className="order-card">
                          <div className="order-main">
                            <div className="order-id-row">
                              <span className="order-id">#{order._id.substring(order._id.length - 6).toUpperCase()}</span>
                              <span className={`status-pill ${statusClass}`}><span className="dot"></span>{status}</span>
                            </div>
                            <p className="order-items">{order.orderItems.map(item => `${item.title} (x${item.qty})`).join(', ')}</p>
                            <span className="order-date">{formatDate(order.createdAt)}</span>
                          </div>
                          <div className="order-side">
                            <div className="order-price"><span className="rupee">₹</span>{order.totalPrice}</div>
                            <button className="track-btn" onClick={() => navigate(`/order/${order._id}`)}>Track Order</button>
                          </div>
                          <div className="mini-track">
                            <span className="lbl">Placed</span>
                            <div className="seg done"></div>
                            <div className={`seg ${['Preparing', 'Out for delivery', 'Delivered'].includes(status) ? 'done' : ''}`}></div>
                            <div className={`seg ${['Out for delivery', 'Delivered'].includes(status) ? 'done' : ''}`}></div>
                            <div className={`seg ${status === 'Delivered' ? 'done' : ''}`}></div>
                            <span className="lbl">Delivered</span>
                          </div>
                        </div>
                      )
                    })
                  )}
                </div>
              </>
            )}

            {activeTab === 'details' && (
              <>
                <div className="panel-head">
                  <h1 className="panel-title">Account Details</h1>
                </div>
                <p className="panel-sub">Manage your personal information.</p>
                
                <form 
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
                  <label>Full Name</label>
                  <input name="name" type="text" defaultValue={user.name} required />
                  
                  <label>Email Address</label>
                  <input name="email" type="email" defaultValue={user.email} required />
                  
                  <label>Phone Number</label>
                  <input name="phone" type="tel" defaultValue={user.phone} />
                  
                  <button type="submit" className="save-btn">Save Changes</button>
                </form>
              </>
            )}

            {activeTab === 'settings' && (
              <>
                <div className="panel-head">
                  <h1 className="panel-title">Settings</h1>
                </div>
                <p className="panel-sub">Manage your preferences and account status.</p>

                <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', paddingBottom:'16px', borderBottom:'1px solid var(--border)', marginBottom:'24px'}}>
                  <div>
                    <h4 style={{margin:0, fontWeight:600}}>Push Notifications</h4>
                    <p style={{margin:0, fontSize:'13px', color:'var(--muted)'}}>Receive order status updates and offers.</p>
                  </div>
                  <input type="checkbox" style={{width:'20px', height:'20px', accentColor:'var(--accent)'}} defaultChecked />
                </div>

                <div>
                  <h4 style={{margin:0, fontWeight:600, color:'var(--accent-deep)', marginBottom:'8px'}}>Danger Zone</h4>
                  <button 
                    onClick={() => setShowDeleteConfirm(true)}
                    style={{
                      background: 'var(--accent-soft)', color: 'var(--accent-deep)',
                      border: '1px solid #F0C4C8', padding: '10px 16px', borderRadius: '8px',
                      fontWeight: 600, fontSize: '13px'
                    }}
                  >
                    Delete Account
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Delete Confirmation Dialog */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 text-left" style={{fontFamily:'"Plus Jakarta Sans", sans-serif'}}>
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
              <div className="flex justify-center mb-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-2xl text-red-600">
                  ⚠️
                </span>
              </div>
              <h3 className="mb-2 text-center text-xl font-bold text-gray-900">Delete Account?</h3>
              <p className="mb-6 text-center text-sm text-gray-500">
                This action cannot be undone. All your orders and preferences will be permanently lost.
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 rounded-xl bg-gray-100 py-3 font-bold text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDeleteAccount}
                  className="flex-1 rounded-xl bg-red-500 py-3 font-bold text-white hover:bg-red-600 transition-colors shadow-sm shadow-red-500/30"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  )
}

export default Profile
