# Dark / Light Mode

MoodMeal AI supports theme switching via the navbar toggle.

- Preference is saved in `localStorage` under the key `theme`
- Tailwind `darkMode: 'class'` applies styles when `dark` is on `<html>`
- `ThemeProvider` in `src/context/ThemeContext.jsx` manages the theme state

Toggle labels: Light / Dark
