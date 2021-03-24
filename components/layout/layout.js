import Header from './header'
import Footer from './footer'

export default function Layout({ children }) {
  return (
    <div className='main_wrapper'>
      <Header className='w-full bg-white' />
      <div className='min-h-full'>
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  )
}
