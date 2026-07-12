import dotenv from 'dotenv'
dotenv.config()

import dns from 'node:dns'
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1'])

import mongoose from 'mongoose'
import Meal from './models/Meal.js'

const meals = [
  // --- BIRYANI (4 types) ---
  { title: 'Hyderabadi Chicken Biryani', rating: 4.8, discount: '25%', price: 350, mood: 'spicy', category: 'biryani', image: '/images/meals/biryani.jpg', distance: 1.2 },
  { title: 'Lucknowi Mutton Biryani', rating: 4.7, discount: '15%', price: 450, mood: 'comfort', category: 'biryani', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=600&auto=format&fit=crop', distance: 2.5 },
  { title: 'Paneer Tikka Biryani', rating: 4.5, discount: '20%', price: 280, mood: 'spicy', category: 'biryani', image: 'https://images.unsplash.com/photo-1701579231305-d84d8af9a3fd?q=80&w=600&auto=format&fit=crop', distance: 0.8 },
  { title: 'Kolkata Egg Biryani', rating: 4.6, discount: '10%', price: 250, mood: 'quick', category: 'biryani', image: 'https://images.unsplash.com/photo-1631515243349-e0cb4c1133c9?q=80&w=600&auto=format&fit=crop', distance: 3.1 },

  // --- BURGER (4 types) ---
  { title: 'Classic Cheeseburger', rating: 4.6, discount: '35%', price: 180, mood: 'comfort', category: 'burger', image: '/images/meals/cheeseburger.jpg', distance: 0.5 },
  { title: 'Spicy Zinger Burger', rating: 4.8, discount: '20%', price: 220, mood: 'spicy', category: 'burger', image: 'https://images.unsplash.com/photo-1610440042657-612c34d95e9f?q=80&w=600&auto=format&fit=crop', distance: 1.1 },
  { title: 'Veggie Supreme Burger', rating: 4.3, discount: '15%', price: 160, mood: 'cheat', category: 'burger', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=600&auto=format&fit=crop', distance: 2.2 },
  { title: 'Double Smash Burger', rating: 4.9, discount: '10%', price: 320, mood: 'trending', category: 'burger', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop', distance: 4.0 },

  // --- PIZZA (4 types) ---
  { title: 'Margherita Pizza', rating: 4.5, discount: '20%', price: 299, mood: 'comfort', category: 'pizza', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=600&auto=format&fit=crop', distance: 1.5 },
  { title: 'Pepperoni Blast', rating: 4.8, discount: '15%', price: 499, mood: 'trending', category: 'pizza', image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=600&auto=format&fit=crop', distance: 2.8 },
  { title: 'Farmhouse Veg Pizza', rating: 4.4, discount: '25%', price: 399, mood: 'cheat', category: 'pizza', image: 'https://images.unsplash.com/photo-1576458088443-04a19bb13da6?q=80&w=600&auto=format&fit=crop', distance: 0.9 },
  { title: 'Spicy Peri Peri Pizza', rating: 4.6, discount: '30%', price: 449, mood: 'spicy', category: 'pizza', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600&auto=format&fit=crop', distance: 3.4 },

  // --- HEALTHY / GYM MEALS (4 types) ---
  { title: 'Grilled Chicken Breast & Quinoa', rating: 4.9, discount: '10%', price: 350, mood: 'healthy', category: 'salad', image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=600&auto=format&fit=crop', distance: 1.2 },
  { title: 'High Protein Paneer Salad', rating: 4.7, discount: '15%', price: 280, mood: 'healthy', category: 'salad', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600&auto=format&fit=crop', distance: 0.8 },
  { title: 'Egg White Avocado Toast', rating: 4.8, discount: '5%', price: 220, mood: 'healthy', category: 'quick', image: 'https://images.unsplash.com/photo-1525351484163-9e45c5148e6e?q=80&w=600&auto=format&fit=crop', distance: 1.5 },
  { title: 'Tofu & Broccoli Stir Fry', rating: 4.5, discount: '20%', price: 290, mood: 'healthy', category: 'salad', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&auto=format&fit=crop', distance: 2.1 },
  { title: 'Spicy Peri Peri Pizza', rating: 4.6, discount: '30%', price: 449, mood: 'spicy', category: 'pizza', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600&auto=format&fit=crop', distance: 3.4 },

  // --- DESSERT (4 types) ---
  { title: 'Walnut Fudge Brownie', rating: 4.7, discount: '15%', price: 150, mood: 'sweet', category: 'dessert', image: '/images/meals/brownie.jpg', distance: 0.8 },
  { title: 'Chocolate Lava Cake', rating: 4.9, discount: '10%', price: 199, mood: 'sweet', category: 'dessert', image: '/images/meals/lava-cake.jpg', distance: 2.8 },
  { title: 'Gulab Jamun Platter', rating: 4.4, discount: '20%', price: 120, mood: 'sweet', category: 'dessert', image: '/images/meals/gulab-jamun.jpg', distance: 1.5 },
  { title: 'Red Velvet Pastry', rating: 4.6, discount: '25%', price: 180, mood: 'sweet', category: 'dessert', image: 'https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?q=80&w=600&auto=format&fit=crop', distance: 1.1 },

  // --- NEW MOODS ---
  { title: 'Vegan Buddha Bowl', rating: 4.8, discount: '10%', price: 350, mood: 'vegan', category: 'salad', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600&auto=format&fit=crop', distance: 1.5 },
  { title: 'Ultimate Cheat Burger', rating: 4.9, discount: '5%', price: 450, mood: 'cheat', category: 'burger', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop', distance: 2.1 },
  { title: 'Mom\'s Rajma Chawal', rating: 4.9, discount: '30%', price: 150, mood: 'home', category: 'thali', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=600&auto=format&fit=crop', distance: 0.5 },
  { title: 'Kadi Chawal Comfort', rating: 4.7, discount: '20%', price: 140, mood: 'home', category: 'curry', image: 'https://images.unsplash.com/photo-1631515243349-e0cb4c1133c9?q=80&w=600&auto=format&fit=crop', distance: 1.2 },
  { title: 'Stuffed Aloo Parantha', rating: 4.8, discount: '15%', price: 80, mood: 'home', category: 'rolls', image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=600&auto=format&fit=crop', distance: 0.9 },
  { title: 'Homestyle Aloo Matar', rating: 4.6, discount: '10%', price: 120, mood: 'home', category: 'curry', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=600&auto=format&fit=crop', distance: 2.5 },
  { title: 'Midnight Maggi', rating: 4.5, discount: '0%', price: 90, mood: 'midnight', category: 'quick', image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?q=80&w=600&auto=format&fit=crop', distance: 1.0 },
  { title: 'Loaded Chocolate Donut', rating: 4.6, discount: '15%', price: 120, mood: 'guilty', category: 'dessert', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=600&auto=format&fit=crop', distance: 1.8 },
  { title: 'Festive Thali Special', rating: 4.7, discount: '20%', price: 550, mood: 'festive', category: 'thali', image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=600&auto=format&fit=crop', distance: 3.5 },
  { title: 'Romantic Pasta Date', rating: 4.8, discount: '10%', price: 650, mood: 'date', category: 'pasta', image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=600&auto=format&fit=crop', distance: 4.2 },
  { title: 'Student Budget Meal', rating: 4.3, discount: '50%', price: 99, mood: 'budget', category: 'thali', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=600&auto=format&fit=crop', distance: 0.7 }
]

async function seedDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Connected to MongoDB for seeding')

    await Meal.deleteMany({})
    console.log('Cleared existing meals')

    await Meal.insertMany(meals)
    console.log('Seeded 16 categorised meals successfully')

    process.exit(0)
  } catch (error) {
    console.error('Seeding error:', error)
    process.exit(1)
  }
}

seedDB()
