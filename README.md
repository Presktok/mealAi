# MoodMeal AI

MoodMeal AI is a React web app that suggests food based on how you feel. Pick a mood, browse meal ideas, and see deals on dishes that match your vibe.

## What It Does

- Shows a landing page with mood-based meal suggestions
- Includes About, Dashboard, Sign In, and UI component demo screens
- Reusable UI library (Button, Input, Modal, Toast, Loader)
- Dark and light mode with saved preference
- Adapts to phone and desktop screen sizes
- Uses React Router for page navigation

## Built With

- [React](https://react.dev/) 18
- [Vite](https://vitejs.dev/) 5
- [React Router](https://reactrouter.com/) 6
- [Tailwind CSS](https://tailwindcss.com/) 3

## Setup

You need [Node.js](https://nodejs.org/) 18+ and npm.

```bash
git clone https://github.com/Presktok/mealAi.git
cd mealAi
npm install
```

## Run the App

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173).

To open it on your phone over the same Wi-Fi:

```bash
npm run dev -- --host
```

Then open the Network URL from the terminal on your phone.

## Production Build

```bash
npm run build
npm run preview
```

## Folder Layout

```
moodmeal/
├── src/
│   ├── components/
│   │   ├── ui/           # Button, Input, Modal, Toast, Loader
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── Card.jsx
│   │   ├── Footer.jsx
│   │   └── PageLayout.jsx
│   ├── context/          # ThemeContext (dark/light mode)
│   ├── data/             # Shared meal data
│   ├── pages/            # Home, About, Dashboard, Login, ComponentsDemo
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
└── vite.config.js
```

## Pages

| URL                | Screen          |
| ------------------ | --------------- |
| `/`                | Home            |
| `/about`           | About           |
| `/dashboard`       | Dashboard       |
| `/login`           | Sign In         |
| `/components-demo` | UI Components   |

## Author

Presktok — [github.com/Presktok/mealAi](https://github.com/Presktok/mealAi)
