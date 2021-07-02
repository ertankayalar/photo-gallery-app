import Layout from '../components/layout/layout'
import Container from '../components/layout/container'
import Hero from '../components/ui/hero'
import axios from 'axios'

import { getFeaturedCollections } from '../lib/mongodb/utils'
import HomeFeatured from '../components/photos/home-featured'

export default function Home({ collections }) {
  return (
    <Layout>
      <Hero />

      <Container>
        <HomeFeatured collections={collections} />
      </Container>
    </Layout>
  )
}

export const getStaticProps = async () => {
  const collections = await getFeaturedCollections()
  //console.log(`collections`, collections)
  // const result = await axios.get(`${process.env.API_URL}/collections`, {
  //   params: {
  //     featured: true,
  //   },
  // })

  return {
    props: { collections: collections },
    revalidate: 10,
  }
}
