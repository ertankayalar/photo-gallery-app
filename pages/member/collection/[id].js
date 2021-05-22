import React, { useState, useEffect, useContext } from 'react'
import Layout from '../../../components/layout/layout'
import Container from '../../../components/layout/container'
import AddPhoto from '../../../components/user/add-photo'
import PageHeader from '../../../components/layout/page-header'
import PhotosList from '../../../components/user/photos-list'

function collection({ collection, api_url }) {
  console.log(collection)
  const [myCollection, setMyCollection] = useState(collection)
  const [myText, setMyText] = useState('boş')

  const { id, name, description } = collection

  const updateMyCollection = async (collectionId) => {
    // get latest collection data
    console.log('new collection update')

    const API_URL = 'http://localhost:1337'

    // get collection data

    const res = await fetch(`${API_URL}/collections/${collectionId}`)
    const data = await res.json()

    setMyCollection(data)
    console.log(`myCollection`, myCollection)
  }
  const upText = (newText) => {
    setMyText(newText)
  }

  useEffect(() => {
    console.log('myText', myText)
  })

  // show collection and photos
  // add new photos
  // edit photos
  // edit collection
  return (
    <Layout>
      <PageHeader title='Edit Collection' />
      <Container>
        <div className='w-full px-5 py-1 text-center'>
          <h2 className='text-lg font-semibold text-gray-800'>{name}</h2>
          <p className='text-md text-gray-600'>{description}</p>
        </div>
      </Container>
      <Container>
        <AddPhoto
          api_url={api_url}
          collection={collection}
          upCollection={updateMyCollection}
          upText={upText}
        />
      </Container>
      <Container>
        <div className='w-full px-5 py-10 '>
          <h2 className='text-xl text-center my-5'>Photos</h2>
          <PhotosList photos={myCollection.photos} />
          myText:{myText}
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
