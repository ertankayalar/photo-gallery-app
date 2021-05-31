import React, { useState, useEffect, useContext } from 'react'
import Router from 'next/router'
import Container from '../../../components/layout/container'

const UserCollectionForm = ({ collection = null, onSubmit }) => {
  const [id, setId] =
    collection != null ? useState(collection.id) : useState(null)
  const [name, setName] =
    collection != null ? useState(collection.name) : useState('')
  const [description, setDescription] =
    collection != null ? useState(collection.description) : useState('')
  const [error, setError] = useState('')
  const [statusMsg, setStatusMsg] = useState('')
  const formTitle = collection == null ? 'New Collection' : 'Update Collection'
  const submitButtonText = collection == null ? 'Add' : 'Update'

  async function submitHandler(event) {
    event.preventDefault()

    // check required fields

    // if ok then
    //    console.info('form submit handler here')

    const result = await onSubmit({
      id: id,
      name: name,
      description: description,
    })

    // console.log('result form', result)
    // setStatusMsg(result.data.status_message)

    // redirect to view

    if (result.status == 200) {
      Router.push(`/member/collection/${result.data.id}`)
    }
  }

  return (
    <Container>
      <div>
        <form onSubmit={submitHandler}>
          <div className='border w-full px-5 py-8 my-10  mx-auto rounded bg-gray-50'>
            <div className='w-full text-center'>
              <h2 className='text-2xl text-gray-700 my-3'>{formTitle}</h2>
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
                {submitButtonText}
              </button>
            </div>
          </div>
        </form>
        <p>{statusMsg}</p>
      </div>
      {error && (
        <div className='w-1/2 bg-gray-50 border rounded p-5 my-5 mx-auto text-red-700'>
          <h3 className='text-red-700 text-lg font-semibold'>Error</h3>
          <p>{error}</p>
        </div>
      )}
    </Container>
  )
}

export default UserCollectionForm
