import React, { useState, useEffect, useContext } from 'react'
import Container from '../../components/layout/container'
import Router from 'next/router'
import axios from 'axios'

function CollectionForm({ session, api_url, collection = null }) {
  const [id, setId] =
    collection != null ? useState(collection.id) : useState('')
  const [name, setName] =
    collection != null ? useState(collection.name) : useState('')
  const [description, setDescription] =
    collection != null ? useState(collection.description) : useState('')
  const [error, setError] = useState('')
  const [isAddCollection, setIsAddCollection] = useState(true)

  const addCollectionHandler = async (event) => {
    event.preventDefault()
    if (session) {
      const resAddCollection = await axios.post(
        `${api_url}/collections`,
        {
          name: name,
          description: description,
          user: session.user.id,
        },
        {
          headers: {
            Authorization: `Bearer ${session.jwt}`,
          },
        }
      )

      if (resAddCollection.error) {
        console.log('Error:', resAddCollection.error)
      }
      console.log('resAddCollection', resAddCollection)

      if (resAddCollection.status == 200) {
        Router.push(`/member/collection/${resAddCollection.data.id}`)
      }
    }
  }

  return (
    <Container>
      <div>
        <form onSubmit={addCollectionHandler}>
          <div className='border w-full px-5 py-8 my-10  mx-auto rounded bg-gray-50'>
            <div className='w-full text-center'>
              <h2 className='text-2xl text-gray-700 my-3'>New Collection</h2>
              <p className='text-gray-500 text-sm'>
                Describe your collection details
              </p>
            </div>
            <label className='block'>
              <span className='text-gray-700'>Name</span>
              <input
                type='text'
                value={name}
                onChange={(event) => {
                  setError('')
                  setName(event.target.value)
                }}
                className='mt-1 block  rounded py-2 px-3 border-gray-300 border shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full'
              />
            </label>
            <label className='block mt-5'>
              <span className='text-gray-700'>Description</span>
              <textarea
                onChange={(event) => {
                  setError('')
                  setDescription(event.target.value)
                }}
                className='mt-1 block  rounded py-2 px-3 border-gray-300 border shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full'
              >
                {description}
              </textarea>
            </label>
            <div className='flex items-center justify-center'>
              <button className='bg-gray-700 text-white py-3 px-4 my-5 rounded hover:bg-gray-600  focus:bg-gray-800 focus:outline-none'>
                Add Collection
              </button>
            </div>
          </div>
        </form>
      </div>
      {error && (
        <div className='w-1/2 bg-gray-50 border rounded p-5 my-5 mx-auto text-red-700'>
          <h3 className='text-red-700 text-lg font-semibold'>Error</h3>
          {error}
        </div>
      )}
    </Container>
  )
}

export default CollectionForm