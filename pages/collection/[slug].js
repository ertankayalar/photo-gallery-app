import Container from '../../components/layout/container'
import Layout from '../../components/layout/layout'
import PageHeader from '../../components/layout/page-header'
import PhotoDetailCard from '../../components/photos/photo-detail-card'
import Breadcrumb from '../../components/ui/breadcrumb'
import Link from 'next/link'

import {
  getCollection,
  getCollectionPhotos,
  getAllPublishedCollections,
} from '../../lib/mongodb/photo'

function CollectionPage({ collection, collectionPhotos }) {
  console.log(`collectionPhotos`, collectionPhotos)
  console.log(`collection`, collection)
  const { name, description, user, tags, category } = collection
  const breadcrumbs = [
    { url: '/', name: 'Home' },
    {
      url: `/category`,
      name: `Collections`,
    },
    { url: `/collection/${collection.slug}`, name: name, last: true },
  ]
  return (
    <Layout>
      <Container className='pl-2'>
        <Breadcrumb breadcrumbs={breadcrumbs} />
      </Container>
      <PageHeader title={name} description={description} />

      <Container>
        <div className='text-gray-500 my-2 text-xs md:text-sm flex justify-center items-center'>
          <span className='mr-5 pl-5'>
            {category && category.length > 0 && (
              <Link href={`/category/${category[0].slug}`}>
                <a>{category[0].name}</a>
              </Link>
            )}
          </span>
          <span className=' border-l pl-5 text-xs md:text-md font-semibold'>
            {tags.map((tag) => (
              <Link href={`/tag/${tag.slug}`} key={tag.slug}>
                <a className='mr-3 hover:underline px-3 py-2 bg-gray-50 rounded-sm border shadow-sm'>
                  {tag.name}
                </a>
              </Link>
            ))}
          </span>
        </div>
      </Container>

      <Container>
        <div className='w-full grid grid-cols-3 gap-3'>
          {collectionPhotos.map((photo, index) => (
            <PhotoDetailCard
              photo={photo}
              user={user[0]}
              photos={collectionPhotos}
              count={index}
              key={index}
            />
          ))}
        </div>
      </Container>
    </Layout>
  )
}

export async function getStaticPaths() {
  // const { API_URL } = process.env
  // const res = await fetch(`${API_URL}/collections`)
  // const data = await res.json()

  const collections = await getAllPublishedCollections()

  const paths = collections.map((collection) => {
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
  // const res = await fetch(`${API_URL}/collections?slug=${slug}`)
  // const data = await res.json()

  const collection = await getCollection(slug)
  const collectionPhotos = await getCollectionPhotos(slug)
  // console.log(`collection`, collection)
  // console.log(`collectionPhotos`, collectionPhotos)
  return {
    props: {
      //collection: data[0],
      collection,
      collectionPhotos,
    },
    revalidate: 10,
  }
}

export default CollectionPage
