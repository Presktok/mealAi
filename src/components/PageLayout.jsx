import Navbar from './Navbar'
import Footer from './Footer'

const contentClass = 'mx-auto min-h-[60vh] max-w-3xl px-4 py-8 md:px-8 md:py-12'

function PageLayout({ children, variant = 'default' }) {
  const className = variant === 'content' ? contentClass : ''

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 font-sans text-gray-800">
      <Navbar />
      <main className={`flex-1 ${className}`.trim()}>{children}</main>
      <Footer />
    </div>
  )
}

export default PageLayout
