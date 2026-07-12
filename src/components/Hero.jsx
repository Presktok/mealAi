import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Hero() {
  const [searchQuery, setSearchQuery] = useState('')
  const [location, setLocation] = useState('Dehradun, India')
  const [showDropdown, setShowDropdown] = useState(false)
  const navigate = useNavigate()
  const dropdownRef = useRef(null)

  const [currentAd, setCurrentAd] = useState(0)

  const ads = [
    {
      badge: "Limited Time Offer",
      title: "Flat 50% Off",
      subtitle: "+ Unlimited Free Delivery on your first order",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop"
    },
    {
      badge: "Midnight Cravings",
      title: "Buy 1 Get 1 Free",
      subtitle: "On all premium Pizzas & Burgers after 10 PM",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop"
    },
    {
      badge: "Healthy Choices",
      title: "20% Cashback",
      subtitle: "When you order from our fresh Salad & Vegan menu",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % ads.length)
    }, 5000) // Change ad every 5 seconds
    return () => clearInterval(timer)
  }, [ads.length])

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    
    setLocation('Detecting...');
    setShowDropdown(false);
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          // Use free OpenStreetMap Nominatim API for reverse geocoding
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await response.json();
          
          if (data && data.address) {
            const area = data.address.suburb || data.address.neighbourhood || data.address.city_district || "";
            const city = data.address.city || data.address.town || data.address.county || "";
            
            // Format nicely
            const parts = [area, city].filter(Boolean);
            setLocation(parts.length > 0 ? parts.join(", ") : "Location Found");
          } else {
            setLocation('Location Found');
          }
        } catch (error) {
          console.error("Error fetching location details:", error);
          setLocation("Coordinates Found");
        }
      },
      (error) => {
        console.error("Error getting location:", error);
        setLocation("Permission denied");
      }
    );
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Changed to AI search route!
      navigate(`/dashboard?ai_search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <section className="relative flex min-h-[600px] w-full flex-col items-center justify-center overflow-hidden bg-gray-900 px-4 py-20 text-center text-white md:px-8 transition-colors duration-1000">
      
      {/* Slideshow Backgrounds */}
      {ads.map((ad, index) => (
        <div 
          key={ad.image}
          className={`absolute inset-0 h-full w-full bg-cover bg-center mix-blend-overlay custom-animate-kenburns transition-opacity duration-1000 ${index === currentAd ? 'opacity-60 z-0' : 'opacity-0 -z-10'}`}
          style={{ backgroundImage: `url("${ad.image}")` }}
        ></div>
      ))}
      
      {/* Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent z-0"></div>
      <div className="absolute inset-0 bg-primary/20 z-0"></div>
      
      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center pt-8">
        
        {/* Slideshow Advertisement Block */}
        <div className="mb-8 flex h-48 w-full max-w-lg flex-col items-center justify-center rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-md shadow-2xl relative overflow-hidden">
          {ads.map((ad, index) => (
            <div 
              key={ad.title}
              className={`absolute inset-0 flex flex-col items-center justify-center p-6 transition-all duration-700 ${index === currentAd ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'}`}
            >
              <div className="mb-2 rounded-full bg-red-600 px-3 py-1 text-xs font-black uppercase tracking-widest text-white animate-pulse">
                {ad.badge}
              </div>
              <h2 className="text-3xl font-black uppercase tracking-tight sm:text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 drop-shadow-sm text-center">
                {ad.title}
              </h2>
              <p className="mt-2 text-sm font-bold text-gray-200 sm:text-base text-center">
                {ad.subtitle}
              </p>
            </div>
          ))}
          
          {/* Slideshow indicators */}
          <div className="absolute bottom-3 flex gap-2">
            {ads.map((_, index) => (
              <button 
                key={index} 
                onClick={() => setCurrentAd(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${index === currentAd ? 'w-6 bg-yellow-400' : 'w-2 bg-white/30 hover:bg-white/50'}`}
              />
            ))}
          </div>
        </div>

        <h1 className="mb-4 text-4xl font-black italic tracking-tighter drop-shadow-lg sm:text-5xl md:text-6xl flex items-center justify-center gap-2">
          MoodMeal <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">AI</span>
        </h1>
        <p className="mb-10 text-xl font-medium drop-shadow-md text-gray-300 sm:text-2xl">
          Tell us how you feel, and we'll pick the perfect food.
        </p>
        
        {/* Large Search Bar */}
        <form onSubmit={handleSearch} className="search-ring mx-auto flex w-full max-w-2xl items-center rounded-lg bg-white p-2 shadow-lg relative group transition-all duration-300 hover:shadow-purple-500/20">
          
          <div className="relative flex w-1/3 items-center border-r border-gray-300 px-3 py-2 text-gray-500" ref={dropdownRef}>
            <span className="mr-2 text-primary">📍</span>
            <input 
              id="location-input"
              type="text" 
              placeholder="Your location" 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onClick={() => setShowDropdown(true)}
              className="w-full bg-transparent text-sm outline-none truncate" 
            />
            {showDropdown && (
              <div className="absolute left-0 top-full mt-3 w-[300px] overflow-hidden rounded-lg border border-gray-100 bg-white shadow-xl z-50 text-left dark:bg-gray-800 dark:border-gray-700">
                <button 
                  type="button" 
                  onClick={handleDetectLocation}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 text-primary transition-colors"
                >
                  <span className="text-xl">🎯</span>
                  <div className="flex flex-col text-left">
                    <span className="font-semibold text-sm">Detect current location</span>
                    <span className="text-xs text-gray-400">Using GPS</span>
                  </div>
                </button>
                <div className="border-t border-gray-100 dark:border-gray-700"></div>
                <div 
                  className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer" 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    document.getElementById('location-input').focus(); 
                    setShowDropdown(false); 
                    setLocation(''); // clear it so they can type
                  }}
                >
                  <div className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
                    <span className="text-xl text-gray-400">➕</span>
                    <span className="text-sm font-medium">Add address manually</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex w-2/3 items-center px-3 py-2 text-gray-700">
            <span className="mr-2 text-purple-500 animate-pulse text-xl">✨</span>
            <input
              type="text"
              placeholder="Magic Search: e.g., 'I just had a bad day, want comfort food'"
              className="w-full bg-transparent text-sm outline-none font-medium placeholder:text-gray-400 focus:placeholder:text-gray-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {/* Hidden submit button to allow Enter key to submit form with multiple inputs */}
            <button type="submit" className="hidden">Search</button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Hero
