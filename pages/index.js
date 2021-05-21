import Layout from '../components/layout/layout'
import Container from '../components/layout/container'
import Hero from '../components/ui/hero'

export default function Home() {
  return (
    <Layout>
      <Hero />
      <div>
        <Container>
          <div className='w-full py-10 text-center'>
            <h2 className='text-xl md:text-3xl text-gray-600'>
              Latest Collections
            </h2>
          </div>
        </Container>
      </div>
    </Layout>
  )
}
