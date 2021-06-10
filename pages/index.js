import Layout from '../components/layout/layout'
import Container from '../components/layout/container'
import Hero from '../components/ui/hero'
import axios from 'axios'
import FeaturedCollections from '../components/photos/featured-collections'

export default function Home({ featuredCollections }) {
  return (
    <Layout>
      <Hero />
      <Container>
        <FeaturedCollections collections={featuredCollections} />
      </Container>
    </Layout>
  )
}

export const getStaticProps = async () => {
  const result = await axios.get(`${process.env.API_URL}/collections`, {
    params: {
      featured: true,
    },
  })

  return {
    props: { featuredCollections: result.data },
    revalidate: 10,
  }
}
