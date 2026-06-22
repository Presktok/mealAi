import PageLayout from '../components/PageLayout'

function Dashboard() {
  return (
    <PageLayout variant="content">
      <h1 className="mb-4 text-3xl font-bold">Your Meal Board</h1>
      <p className="leading-relaxed text-gray-700">
        This is where saved dishes, past picks, and preference settings will
        live once the full version ships. For now, it is a preview of the
        space you will use to keep track of what you have enjoyed.
      </p>
    </PageLayout>
  )
}

export default Dashboard
