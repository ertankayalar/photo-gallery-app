import Container from '../../components/layout/container'
import Layout from '../../components/layout/layout'
import { COLLECTIONS_DATA } from '../../lib/constants'
import PhotoCard from '../../components/photos/card'

function CollectionPage({ collection }) {
  const { name, description, photos } = collection
  return (
    <Layout>
      <Container className='py-10 px-1'>
        <h1 className='text-2xl font-semibold text-gray-800'>{name}</h1>
        <p className='text-gray-600'>{description}</p>
      </Container>
      <Container>
        <div className='w-full grid grid-cols-3 gap-3'>
          {photos.map((photo) => (
            <PhotoCard photo={photo} />
          ))}
        </div>
      </Container>
    </Layout>
  )
}

export async function getStaticPaths() {
  const collections = COLLECTIONS_DATA
  const paths = collections.map((collection) => {
    return '/collections/' + collection.slug
  })
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const { slug } = params
  const collections = COLLECTIONS_DATA
  const collection = collections.find((collection) => {
    return collection.slug.indexOf(slug) > -1
  })

  return {
    props: {
      collection,
    },
  }
}

export default CollectionPage
