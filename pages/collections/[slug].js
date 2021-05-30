import Container from '../../components/layout/container'
import Layout from '../../components/layout/layout'
import PageHeader from '../../components/layout/page-header'
import PhotoCard from '../../components/photos/card'

function CollectionPage({ collection }) {
  const { name, description, photos } = collection
  return (
    <Layout>
      <PageHeader title={name} description={description} />

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
  const { API_URL } = process.env
  const res = await fetch(`${API_URL}/collections`)
  const data = await res.json()
  const paths = data.map((collection) => {
    return {
      params: {
        slug: collection.slug,
      },
    }
  })

  console.log(paths)

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const { slug } = params
  const { API_URL } = process.env
  const res = await fetch(`${API_URL}/collections?slug=${slug}`)
  const data = await res.json()

  return {
    props: {
      collection: data[0],
    },
    revalidate: 10,
  }
}

export default CollectionPage
