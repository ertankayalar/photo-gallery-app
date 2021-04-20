import React from 'react'
import Layout from '../../components/layout/layout'
import Container from '../../components/layout/container'

function MyCollections({ photos }) {
  console.log(photos)
  return (
    <Layout>
      <Container>
        <h1>My Collections</h1>
      </Container>
    </Layout>
  )
}

export default MyCollections
