import React from 'react'
import Container from '../../components/layout/container'
import Layout from '../../components/layout/layout'
import { COLLECTIONS_DATA } from '../../lib/constants'
import CollectionList from '../../components/photos/collection-list'

function CollectionsHome({ collections }) {
  return (
    <Layout>
      <Container className='py-10 px-1'>
        <h1 className='text-2xl font-semibold text-gray-800'>Collections</h1>
      </Container>
      <Container>
        <CollectionList collections={collections} />
      </Container>
    </Layout>
  )
}

export default CollectionsHome

export const getStaticProps = async () => {
  const { API_URL } = process.env
  const res = await fetch(`${API_URL}/collections`)
  const data = await res.json()

  return {
    props: { collections: data },
    revalidate: 10,
  }
}
