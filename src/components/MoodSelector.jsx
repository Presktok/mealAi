import React from 'react';

const MOODS = [
  { id: 'spicy', label: 'Spicy', icon: '🌶️' },
  { id: 'sweet', label: 'Sweet', icon: '🍰' },
  { id: 'comfort', label: 'Comfort', icon: '🍕' },
  { id: 'healthy', label: 'Healthy', icon: '🥗' },
  { id: 'quick', label: 'Quick Bite', icon: '⚡' },
  { id: 'trending', label: 'Trending', icon: '🔥' },
  { id: 'vegan', label: 'Vegan', icon: '🌱' },
  { id: 'cheat', label: 'Cheat Meal', icon: '🍔' },
  { id: 'home', label: 'Home Style', icon: '🍛' },
  { id: 'midnight', label: 'Late Night', icon: '🌙' },
  { id: 'guilty', label: 'Guilty', icon: '🍩' },
  { id: 'festive', label: 'Festive', icon: '🎊' },
  { id: 'date', label: 'Date Night', icon: '🥂' },
  { id: 'budget', label: 'Budget', icon: '💰' },
];

function MoodSelector({ selectedMood, onSelectMood }) {
  // Duplicate for seamless infinite scrolling
  const marqueeMoods = [...MOODS, ...MOODS];

  return (
    <div className="mb-12 overflow-hidden bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-2xl font-black px-4 md:px-8 pt-6 uppercase tracking-tight">
          <span className="relative inline-block">
            <span className="relative z-10 text-gray-900 dark:text-white">Discover by</span>
            <span className="absolute bottom-0 left-0 -z-10 h-3 w-full -rotate-1 bg-yellow-300 dark:bg-primary/60"></span>
          </span>{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">Mood</span>
        </h2>
      </div>
      
      <div className="relative flex w-full overflow-hidden">
        <div className="flex w-max custom-animate-marquee gap-4 px-4 pb-4 pt-2">
          {marqueeMoods.map((mood, index) => {
            const isSelected = selectedMood === mood.id;
            return (
              <button
                key={`${mood.id}-${index}`}
                onClick={() => onSelectMood(isSelected ? '' : mood.id)}
                className={`flex min-w-[100px] cursor-pointer flex-col items-center gap-2 rounded-2xl p-4 transition-all card-hover ${
                  isSelected
                    ? 'border-2 border-primary bg-red-50 dark:bg-primary-dark/20'
                    : 'border border-transparent bg-white shadow-sm dark:bg-surface-dark'
                }`}
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-50 text-3xl shadow-inner dark:bg-gray-800 transition-transform hover:scale-110">
                  {mood.icon}
                </div>
                <span className={`text-sm font-medium ${isSelected ? 'text-primary font-bold' : 'text-text-secondary dark:text-gray-300'}`}>
                  {mood.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MoodSelector;
