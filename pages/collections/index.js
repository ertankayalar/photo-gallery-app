import React from 'react'
import Container from '../../components/layout/container'
import Layout from '../../components/layout/layout'
import CollectionList from '../../components/photos/collection-list'
import PageHeader from '../../components/layout/page-header'
import Breadcrumb from '../../components/ui/breadcrumb'

function CollectionsHome({ collections }) {
  const breadcrumbs = [
    { url: '/', name: 'Home' },
    {
      url: `/collections/`,
      name: `Collections`,
      last: true,
    },
  ]
  return (
    <Layout>
      <Container className='pl-2'>
        <Breadcrumb breadcrumbs={breadcrumbs} />
      </Container>
      <PageHeader title='Collections' />

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
