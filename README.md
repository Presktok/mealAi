# MoodMeal AI

MoodMeal AI is a React web app that suggests food based on how you feel. Pick a mood, browse meal ideas, and see deals on dishes that match your vibe.

## What It Does

- Shows a landing page with mood-based meal suggestions loaded from the Express API
- Includes About, Dashboard, Sign In, and UI component demo screens
- Reusable UI library (Button, Input, Modal, Toast, Loader)
- Dark and light mode with saved preference
- Adapts to phone and desktop screen sizes
- Uses React Router for page navigation
- RESTful Meal API with JSON file storage (no database required)

## Built With

**Frontend**

- [React](https://react.dev/) 18
- [Vite](https://vitejs.dev/) 5
- [React Router](https://reactrouter.com/) 6
- [Tailwind CSS](https://tailwindcss.com/) 3
- [Axios](https://axios-http.com/) for API requests

**Backend**

- [Node.js](https://nodejs.org/) 18+
- [Express](https://expressjs.com/) 4
- JSON file storage (`backend/data/meals.json`)

## Setup

You need [Node.js](https://nodejs.org/) 18+ and npm.

```bash
git clone https://github.com/Presktok/mealAi.git
cd mealAi
npm install
cd backend && npm install && cd ..
```

### Environment variables

Copy the example env files and adjust if needed:

```bash
cp .env.example .env
cp backend/.env.example backend/.env
```

| File | Variable | Default | Purpose |
| ---- | -------- | ------- | ------- |
| `.env` | `VITE_API_URL` | `http://localhost:5000/api` | Frontend API base URL |
| `backend/.env` | `PORT` | `5000` | Backend server port |
| `backend/.env` | `CORS_ORIGIN` | `http://localhost:5173` | Allowed frontend origin |

## Run the App

Start the backend and frontend in **two terminals**:

**Terminal 1 — API server**

```bash
npm run dev:backend
```

API available at [http://localhost:5000](http://localhost:5000).

**Terminal 2 — React app**

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173).

To open the frontend on your phone over the same Wi-Fi:

```bash
npm run dev -- --host
```

Then open the Network URL from the terminal on your phone.

## Production Build

```bash
npm run build
npm run preview
```

For production, set `VITE_API_URL` to your deployed API URL before building.

## Backend API

Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| GET | `/meals` | List all meals |
| GET | `/meals/:id` | Get one meal by id |
| POST | `/meals` | Create a meal |
| PUT | `/meals/:id` | Update a meal |
| DELETE | `/meals/:id` | Delete a meal |
| GET | `/meals/search?q=` | Search meals by title |

### Example responses

**GET /api/meals** — `200 OK`

```json
{
  "success": true,
  "count": 3,
  "data": [
    { "id": 1, "title": "Hyderabadi Chicken Biryani", "rating": 4.8, "discount": "25%" }
  ]
}
```

**POST /api/meals** — `201 Created`

```json
{
  "success": true,
  "data": { "id": 4, "title": "Mango Lassi", "rating": 4.5, "discount": "10%" }
}
```

**Error** — e.g. `404 Not Found`

```json
{
  "success": false,
  "error": "Meal with id 99 not found"
}
```

### Postman

Import `backend/postman/MoodMeal-API.postman_collection.json` into Postman for sample requests covering every endpoint.

## Folder Layout

```
moodmeal/
├── backend/
│   ├── config/           # Environment config
│   ├── controllers/      # Request handlers
│   ├── data/             # meals.json storage
│   ├── middleware/       # Error handling
│   ├── postman/          # Postman collection
│   ├── routes/           # API route definitions
│   ├── utils/            # JSON file helpers
│   ├── server.js         # Express entry point
│   └── package.json
├── src/
│   ├── api/              # Axios client and meal service
│   ├── components/
│   │   ├── ui/           # Button, Input, Modal, Toast, Loader
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── Card.jsx
│   │   ├── Footer.jsx
│   │   └── PageLayout.jsx
│   ├── context/          # ThemeContext (dark/light mode)
│   ├── data/             # Static meal data (legacy)
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
