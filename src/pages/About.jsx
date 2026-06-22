import PageLayout from '../components/PageLayout'

function About() {
  return (
    <PageLayout variant="content">
      <h1 className="mb-4 text-3xl font-bold">What Is MoodMeal AI?</h1>
      <p className="leading-relaxed text-gray-700 dark:text-gray-300">
        MoodMeal AI is a student-built meal finder that connects how you feel
        with what you might want to eat. Instead of scrolling endlessly, you
        get a short list of options shaped around your mood, taste, and diet.
        We built it to take the guesswork out of ordering food.
      </p>
    </PageLayout>
  )
}

export default About
