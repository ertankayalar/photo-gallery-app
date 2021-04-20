import React from 'react'
import Layout from '../../../components/layout/layout'
import Container from '../../../components/layout/container'
import AddPhoto from '../../../components/user/add-photo'

function collection({ collection, api_url }) {
  console.log(collection)
  const { id, name, description } = collection
  // show collection and photos
  // add new photos
  // edit photos
  // edit collection
  return (
    <Layout>
      <Container>
        <div className='w-full px-5 py-10'>
          <h1 className='text-xl  my-5 text-center'>Edit Collection</h1>
          <h2 className='text-lg font-semibold text-gray-800'>{name}</h2>
          <p className='text-md text-gray-600'>{description}</p>
        </div>
      </Container>
      <Container>
        <AddPhoto api_url={api_url} />
      </Container>
      <Container>
        <div className='w-full px-5 py-10 '>
          <h2 className='text-xl text-center my-5'>Photos</h2>
        </div>
      </Container>
    </Layout>
  )
}

export default collection

export async function getServerSideProps(ctx) {
  const { API_URL } = process.env
  const { id } = ctx.query

  // get collection data

  const res = await fetch(`${API_URL}/collections/${id}`)
  const data = await res.json()

  return {
    props: {
      collection: data,
      api_url: API_URL,
    },
  }
}
