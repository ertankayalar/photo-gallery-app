import React, { useState, useEffect, useContext } from 'react'
import Container from '../../components/layout/container'
import Router from 'next/router'

function CollectionForm() {
  const API_URL = 'http://localhost:1337'
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')
  const [isAddCollection, setIsAddCollection] = useState(true)
  const addCollectionHandler = async (event) => {
    event.preventDefault()
    // add collection field
    // add default user id
    // get new collection id and open photos

    const newCollection = {
      name: name,
      description: description,
    }

    const add = await fetch(`${API_URL}/collections`, {
      method: 'POST',
      headers: {
        //  Authorization: `Bearer ${jwt}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCollection),
    })

    const addResponse = await add.json()

    if (addResponse._id) {
      const collection_id = addResponse._id
      Router.push(`/member/collection/${collection_id}`)
    }

    console.log(addResponse)
  }

  return (
    <Container>
      <div>
        <form onSubmit={addCollectionHandler}>
          <div className='border w-1/2 p-5 my-10 bg-gray-50 mx-auto rounded shadow'>
            <h2 className='text-lg my-5 font-semibold'>Add New Collection</h2>
            <label className='block'>
              <span className='text-gray-700'>Name</span>
              <input
                type='text'
                value={name}
                onChange={(event) => {
                  setError('')
                  setName(event.target.value)
                }}
                className='mt-1 block  rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full'
              />
            </label>
            <label className='block mt-5'>
              <span className='text-gray-700'>Description</span>
              <textarea
                onChange={(event) => {
                  setError('')
                  setDescription(event.target.value)
                }}
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
              >
                {description}
              </textarea>
            </label>
            <button className='bg-indigo-700 text-white py-2 px-3 my-5 rounded '>
              Add
            </button>
            <span className='ml-2 text-gray-500'>Next Step: Upload Photos</span>
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
