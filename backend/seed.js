import dotenv from 'dotenv'
dotenv.config()
import dns from 'node:dns'
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1'])
import mongoose from 'mongoose'


const getUniqueImage = (url, title) => {
  if (url.startsWith('http')) {
    return `https://image.pollinations.ai/prompt/${encodeURIComponent(title + " delicious food photography HD")}`;
  }
  return url;
};
import Meal from './models/Meal.js'

const meals = [];

const burgerImages = ["https://www.themealdb.com/images/media/meals/8rfd4q1764112993.jpg","https://www.themealdb.com/images/media/meals/13fg4j1764441982.jpg","https://www.themealdb.com/images/media/meals/jgl9qq1764437635.jpg","https://www.themealdb.com/images/media/meals/kgfh3q1763075438.jpg","https://www.themealdb.com/images/media/meals/44bzep1761848278.jpg","https://www.themealdb.com/images/media/meals/5tf8j11782236249.jpg","/images/meals/crispy-fish-burger.jpg","https://www.themealdb.com/images/media/meals/sytuqu1511553755.jpg","https://www.themealdb.com/images/media/meals/wrssvt1511556563.jpg","https://www.themealdb.com/images/media/meals/pkopc31683207947.jpg"];
const pizzaImages = ["/images/meals/margherita.png","https://www.themealdb.com/images/media/meals/0jv5gx1661040802.jpg","https://www.themealdb.com/images/media/meals/uquqtu1511178042.jpg","https://www.themealdb.com/images/media/meals/xutquv1505330523.jpg","https://www.themealdb.com/images/media/meals/xr0n4r1576788363.jpg","https://www.themealdb.com/images/media/meals/wtsvxx1511296896.jpg","https://www.themealdb.com/images/media/meals/kpiu4t1782242131.jpg","https://www.themealdb.com/images/media/meals/hbte551782770868.jpg","https://www.themealdb.com/images/media/meals/vvtvtr1511180578.jpg","/images/meals/tandoori-chicken.png"];
const thaliImages = ["https://www.themealdb.com/images/media/meals/21yc5s1760524759.jpg","https://www.themealdb.com/images/media/meals/0ljvc51763248075.jpg","/images/meals/punjabi-thali.png","/images/meals/south-indian.png","/images/meals/dal-bati.jpg","/images/meals/bengali-fish.png","https://www.themealdb.com/images/media/meals/rvxxuy1468312893.jpg", "/images/meals/butter-chicken.jpg", "/images/meals/paneer-skewers.jpg", "/images/meals/thai-curry.jpg"];
const cakeImages = ["https://www.themealdb.com/images/media/meals/wkhg581762773124.jpg","/images/meals/chocolate-lava-cake.png","https://www.themealdb.com/images/media/meals/q47rkb1762324620.jpg","https://www.themealdb.com/images/media/meals/adxcbq1619787919.jpg","https://www.themealdb.com/images/media/meals/xvsurr1511719182.jpg","/images/meals/tiramisu.png","https://www.themealdb.com/images/media/meals/wxywrq1468235067.jpg","https://www.themealdb.com/images/media/meals/stnxzp1784835840.jpg","https://www.themealdb.com/images/media/meals/ax643t1784731109.jpg","https://www.themealdb.com/images/media/meals/p277uc1764109195.jpg"];
const biryaniImages = ["/images/meals/hyderabadi-biryani.png","https://www.themealdb.com/images/media/meals/020z181619788503.jpg","https://www.themealdb.com/images/media/meals/nmxec11782498644.jpg","https://www.themealdb.com/images/media/meals/9ya6o71780262651.jpg","https://www.themealdb.com/images/media/meals/sypxpx1515365095.jpg"];
const homeImages = ["/images/meals/rajma-chawal.png", "/images/meals/kadi-chawal.jpg","https://www.themealdb.com/images/media/meals/tbj1bs1764118062.jpg","https://www.themealdb.com/images/media/meals/zub3s91764110535.jpg","https://www.themealdb.com/images/media/meals/02s6gc1763799560.jpg"];

// 10 Burgers
const burgerTitles = [
  'Classic Cheeseburger', 'Spicy Zinger Burger', 'Veggie Supreme Burger', 'Double Smash Burger', 'BBQ Bacon Burger',
  'Mushroom Swiss Burger', 'Crispy Fish Burger', 'Paneer Tikka Burger', 'Mexican Jalapeno Burger', 'Truffle Mayo Burger'
];
for(let i=0; i<10; i++) {
  meals.push({ title: burgerTitles[i], rating: Number((4.5 + (Math.random()*0.4)).toFixed(1)), discount: '10%', price: 150 + (i*10), mood: 'cheat', category: 'burger', image: getUniqueImage(burgerImages[i], burgerTitles[i]), distance: Number((Math.random()*5).toFixed(1)) });
}

// 10 Pizzas
const pizzaTitles = [
  'Margherita Pizza', 'Pepperoni Blast', 'Farmhouse Veg Pizza', 'Spicy Peri Peri Pizza', 'Four Cheese Pizza',
  'BBQ Chicken Pizza', 'Paneer Makhani Pizza', 'Mushroom & Truffle Pizza', 'Hawaiian Pineapple Pizza', 'Tandoori Chicken Pizza'
];
for(let i=0; i<10; i++) {
  meals.push({ title: pizzaTitles[i], rating: Number((4.5 + (Math.random()*0.4)).toFixed(1)), discount: '15%', price: 299 + (i*20), mood: 'trending', category: 'pizza', image: getUniqueImage(pizzaImages[i], pizzaTitles[i]), distance: Number((Math.random()*5).toFixed(1)) });
}

// 10 Thalis (Marathi, Gujarati, Punjabi etc)
const thaliTitles = [
  'Authentic Marathi Thali', 'Royal Gujarati Thali', 'Rich Punjabi Thali', 'South Indian Banana Leaf Thali', 'Rajasthani Dal Bati Thali',
  'Bengali Fish Thali', 'Goan Seafood Thali', 'Vegetarian Jain Thali', 'Kashmiri Wazwan Thali', 'Simple Ghar ki Thali'
];
for(let i=0; i<10; i++) {
  meals.push({ title: thaliTitles[i], rating: Number((4.5 + (Math.random()*0.4)).toFixed(1)), discount: '20%', price: 200 + (i*15), mood: 'home', category: 'thali', image: getUniqueImage(thaliImages[i], thaliTitles[i]), distance: Number((Math.random()*5).toFixed(1)) });
}

// 10 Pastries/Cakes
const cakeTitles = [
  'Walnut Fudge Brownie', 'Chocolate Lava Cake', 'Red Velvet Pastry', 'Black Forest Cake Slice', 'Blueberry Cheesecake',
  'Tiramisu Cup', 'Pineapple Fresh Cream Pastry', 'Mango Tart', 'Chocolate Truffle Pastry', 'Strawberry Shortcake'
];
for(let i=0; i<10; i++) {
  meals.push({ title: cakeTitles[i], rating: Number((4.5 + (Math.random()*0.4)).toFixed(1)), discount: '5%', price: 120 + (i*5), mood: 'sweet', category: 'dessert', image: getUniqueImage(cakeImages[i], cakeTitles[i]), distance: Number((Math.random()*5).toFixed(1)) });
}

// 5 Biryanis
const biryaniTitles = [
  'Hyderabadi Chicken Biryani', 'Lucknowi Mutton Biryani', 'Paneer Tikka Biryani', 'Kolkata Egg Biryani', 'Malabar Prawn Biryani'
];
for(let i=0; i<5; i++) {
  meals.push({ title: biryaniTitles[i], rating: Number((4.5 + (Math.random()*0.4)).toFixed(1)), discount: '25%', price: 250 + (i*20), mood: 'spicy', category: 'biryani', image: getUniqueImage(biryaniImages[i], biryaniTitles[i]), distance: Number((Math.random()*5).toFixed(1)) });
}

// 5 Home Foods
const homeTitles = [
  'Mom\'s Rajma Chawal', 'Kadi Chawal Comfort', 'Stuffed Aloo Parantha', 'Homestyle Aloo Matar', 'Dal Tadka & Jeera Rice'
];
for(let i=0; i<5; i++) {
  meals.push({ title: homeTitles[i], rating: Number((4.5 + (Math.random()*0.4)).toFixed(1)), discount: '0%', price: 100 + (i*10), mood: 'comfort', category: 'curry', image: getUniqueImage(homeImages[i], homeTitles[i]), distance: Number((Math.random()*5).toFixed(1)) });
}

// NEW CATEGORIES FOR MISSING MOODS
const healthyTitles = ['Quinoa Avocado Bowl', 'Grilled Chicken Salad', 'Green Smoothie Bowl', 'Keto Tofu Wrap', 'Roasted Veggie Platter'];
const healthyImages = ['/images/meals/quinoa-avocado.jpg', '/images/meals/grilled-chicken.png', '/images/meals/green-smoothie.png', thaliImages[3], thaliImages[4]];
for(let i=0; i<5; i++) {
  meals.push({ title: healthyTitles[i], rating: Number((4.5 + (Math.random()*0.4)).toFixed(1)), discount: '10%', price: 180 + (i*10), mood: 'healthy', category: 'salad', image: getUniqueImage(healthyImages[i], healthyTitles[i]), distance: Number((Math.random()*5).toFixed(1)) });
}

const quickTitles = ['Mumbai Vada Pav', 'Chicken Mayo Sandwich', 'Masala Cheese Toast', 'Crispy French Fries', 'Egg Kati Roll'];
for(let i=0; i<5; i++) {
  meals.push({ title: quickTitles[i], rating: Number((4.5 + (Math.random()*0.4)).toFixed(1)), discount: '5%', price: 60 + (i*10), mood: 'quick', category: 'snack', image: getUniqueImage(burgerImages[i], quickTitles[i]), distance: Number((Math.random()*5).toFixed(1)) });
}

const veganTitles = ['Vegan Buddha Bowl', 'Spicy Tofu Stir Fry', 'Mushroom Risotto', 'Vegan Burger', 'Falafel Hummus Wrap'];
for(let i=0; i<5; i++) {
  meals.push({ title: veganTitles[i], rating: Number((4.5 + (Math.random()*0.4)).toFixed(1)), discount: '15%', price: 210 + (i*10), mood: 'vegan', category: 'vegan', image: getUniqueImage(pizzaImages[i], veganTitles[i]), distance: Number((Math.random()*5).toFixed(1)) });
}

const midnightTitles = ['Midnight Masala Maggi', 'Cheese Garlic Bread', 'Instant Ramen Bowl', 'Midnight Chocolate Shake', 'Spicy Cheetos Mac'];
for(let i=0; i<5; i++) {
  meals.push({ title: midnightTitles[i], rating: Number((4.5 + (Math.random()*0.4)).toFixed(1)), discount: '0%', price: 80 + (i*10), mood: 'midnight', category: 'snack', image: getUniqueImage(cakeImages[i], midnightTitles[i]), distance: Number((Math.random()*5).toFixed(1)) });
}

const guiltyTitles = ['Loaded Cheesy Fries', 'Monster Double Burger', 'Deep Fried Oreos', 'Triple Cheese Nachos', 'Chocolate Lava Overload'];
for(let i=0; i<5; i++) {
  meals.push({ title: guiltyTitles[i], rating: Number((4.5 + (Math.random()*0.4)).toFixed(1)), discount: '10%', price: 190 + (i*10), mood: 'guilty', category: 'cheat', image: getUniqueImage(burgerImages[5+i], guiltyTitles[i]), distance: Number((Math.random()*5).toFixed(1)) });
}

const festiveTitles = ['Special Diwali Thali', 'Assorted Mithai Box', 'Motichoor Ladoo', 'Festive Mutton Biryani', 'Kaju Katli Platter'];
const festiveImages = ['/images/meals/diwali-snacks.png', thaliImages[6], thaliImages[7], thaliImages[8], thaliImages[9]];
for(let i=0; i<5; i++) {
  meals.push({ title: festiveTitles[i], rating: Number((4.5 + (Math.random()*0.4)).toFixed(1)), discount: '20%', price: 300 + (i*10), mood: 'festive', category: 'thali', image: getUniqueImage(festiveImages[i], festiveTitles[i]), distance: Number((Math.random()*5).toFixed(1)) });
}

const dateTitles = ['Candlelight Pasta', 'Romantic Sushi Platter', 'Truffle Mushroom Risotto', 'Filet Mignon Steak', 'Chocolate Fondue'];
const dateImages = ['/images/meals/candlelight-pasta.png', pizzaImages[6], pizzaImages[7], pizzaImages[8], pizzaImages[9]];
for(let i=0; i<5; i++) {
  meals.push({ title: dateTitles[i], rating: Number((4.5 + (Math.random()*0.4)).toFixed(1)), discount: '15%', price: 450 + (i*10), mood: 'date', category: 'fancy', image: getUniqueImage(dateImages[i], dateTitles[i]), distance: Number((Math.random()*5).toFixed(1)) });
}

const budgetTitles = ['Street Style Samosa', 'Cutting Chai & Bun', 'Aloo Tikki Chaat', 'Bread Pakora', 'Mini Thali'];
const budgetImages = [homeImages[0], homeImages[1], '/images/meals/aloo-tikki.jpg', homeImages[3], homeImages[4]];
for(let i=0; i<5; i++) {
  meals.push({ title: budgetTitles[i], rating: Number((4.5 + (Math.random()*0.4)).toFixed(1)), discount: '5%', price: 30 + (i*10), mood: 'budget', category: 'snack', image: getUniqueImage(budgetImages[i], budgetTitles[i]), distance: Number((Math.random()*5).toFixed(1)) });
}

async function seedDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 15000 })
    console.log('Connected to MongoDB for seeding')

    await Meal.deleteMany({})
    console.log('Cleared existing meals')

    await Meal.insertMany(meals)
    console.log(`Seeded ${meals.length} meals successfully`)

    process.exit(0)
  } catch (error) {
    console.error('Seeding error:', error)
    process.exit(1)
  }
}

seedDB()
