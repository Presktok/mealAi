import React from 'react';

function CategorySelector({ selectedCategory, onSelectCategory }) {
  // Using actual Zomato category icons for the vibe
  const categories = [
    { id: 'biryani', label: 'Biryani', image: 'https://b.zmtcdn.com/data/o2_assets/52eb9796bb9bcf0eba64c643349e97211634401116.png' },
    { id: 'burger', label: 'Burger', image: 'https://b.zmtcdn.com/data/dish_images/ccb7dc2ba2b054419f805da7f05704471634886169.png' },
    { id: 'pizza', label: 'Pizza', image: 'https://b.zmtcdn.com/data/o2_assets/d0bd7c9405ac87f6aa65e31fe55800941632716575.png' },
    { id: 'dessert', label: 'Dessert', image: 'https://b.zmtcdn.com/data/dish_images/c2f22c42d7fb909805c23d162ee5b3e61634819771.png' },
    { id: 'curry', label: 'Curry', image: 'https://b.zmtcdn.com/data/dish_images/197987b7ebcd1ee08f8c25ea4e77e20f1634731334.png' },
    { id: 'salad', label: 'Salad', image: 'https://b.zmtcdn.com/data/o2_assets/8dc39742916ddc369ebeb91928391b931632716660.png' },
    { id: 'rolls', label: 'Rolls', image: 'https://b.zmtcdn.com/data/dish_images/c2f22c42d7fb909805c23d162ee5b3e61634819771.png' },
    { id: 'thali', label: 'Thali', image: 'https://b.zmtcdn.com/data/o2_assets/52eb9796bb9bcf0eba64c643349e97211634401116.png' },
  ];

  // We duplicate the array to create a seamless infinite scrolling marquee
  const marqueeItems = [...categories, ...categories];

  return (
    <div className="mb-12 overflow-hidden">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-6 text-2xl font-black px-4 md:px-8 uppercase tracking-tight">
          <span className="relative inline-block">
            <span className="relative z-10 text-gray-900 dark:text-white">Inspiration for your</span>
            <span className="absolute bottom-1 left-0 -z-10 h-3 w-full rotate-1 bg-yellow-300 dark:bg-primary/60"></span>
          </span>{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">First Order</span>
        </h2>
      </div>
      
      {/* Marquee Container */}
      <div className="relative flex w-full overflow-hidden">
        {/* Animated Track */}
        <div className="flex w-max custom-animate-marquee gap-6 px-4 md:px-8 pb-4">
          {marqueeItems.map((cat, index) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={`${cat.id}-${index}`}
                onClick={() => onSelectCategory(isSelected ? '' : cat.id)}
                className="group flex min-w-[120px] cursor-pointer flex-col items-center gap-3 transition-transform hover:-translate-y-1"
              >
                <div className={`flex h-32 w-32 items-center justify-center overflow-hidden rounded-full transition-all ${
                  isSelected ? 'ring-4 ring-primary' : 'ring-1 ring-gray-100 shadow-md dark:ring-gray-800'
                }`}>
                  <img 
                    src={cat.image} 
                    alt={cat.label} 
                    className="h-full w-full object-cover transition-transform group-hover:scale-110 custom-animate-spin-slow" 
                    onError={(e) => {
                      e.target.src = "https://b.zmtcdn.com/data/o2_assets/52eb9796bb9bcf0eba64c643349e97211634401116.png";
                    }}
                  />
                </div>
                <span className={`text-lg font-medium ${isSelected ? 'font-bold text-primary' : 'text-gray-700 dark:text-gray-200'}`}>
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CategorySelector;
