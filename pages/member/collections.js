import React from 'react'
import Layout from '../../components/layout/layout'
import Container from '../../components/layout/container'
import PageHeader from '../../components/layout/page-header'

function MyCollections({ photos }) {
  console.log(photos)
  return (
    <Layout>
      <PageHeader title='My Collections' />
      <Container></Container>
    </Layout>
  )
}

export default MyCollections
