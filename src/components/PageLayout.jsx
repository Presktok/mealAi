import Navbar from './Navbar'
import Footer from './Footer'
import CartSidebar from './CartSidebar'

const contentClass = 'mx-auto min-h-[60vh] max-w-3xl px-4 py-8 md:px-8 md:py-12'

function PageLayout({ children, variant = 'default', hideFooter = false, hideSearch = false }) {
  const className = variant === 'content' ? contentClass : ''

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 font-sans text-gray-800 dark:bg-gray-900 dark:text-gray-100">
      <Navbar hideSearch={hideSearch} />
      <CartSidebar />
      <main className={`flex-1 ${className}`.trim()}>{children}</main>
      {!hideFooter && <Footer />}
    </div>
  )
}

export default PageLayout
