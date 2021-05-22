import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import ProgressBar from '../ui/progress-bar'

const calcPercent = (value, total) => Math.round((value / total) * 100)

function AddPhoto({ api_url, collection, upCollection, upText }) {
  const API_URL = 'http://localhost:1337'
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [files, setFiles] = useState(null)
  const [error, setError] = useState('')
  const [percent, setPercent] = useState(0)

  const addPhotoHandler = async (event) => {
    event.preventDefault()

    console.log('Files =>', files)
    let uploadedFiles = []
    let uploadSuccess = false
    const data = new FormData()
    for (let i = 0; i < files.length; i++) {
      data.append('files', files[i])
    }

    try {
      const uploadRes = await axios({
        method: 'POST',
        url: `${API_URL}/upload`,
        data,
        onUploadProgress: (progress) =>
          setPercent(calcPercent(progress.loaded, progress.total)),
      })
      // buraya kadar completed dememesi gerekiyor
      console.log('Upload Result =>', uploadRes)
      if (uploadRes.status == 200) {
        uploadedFiles = uploadRes.data
        uploadSuccess = true
      }
    } catch (err) {
      console.log('Exception Error', err)
    }

    console.log(`uploaded Files`, uploadedFiles)

    if (uploadSuccess) {
      const newPhoto = {
        caption: name,
        description: description,
        photo: uploadedFiles[0].id, // id
        collection_id: collection._id,
      }
      const add = await fetch(`${API_URL}/photos`, {
        method: 'POST',
        headers: {
          // Authorization: `Bearer ${jwt}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPhoto),
      })

      const addResponse = await add.json()
      console.log(`addResponse`, addResponse)

      upCollection(collection._id)
      upText('addReponse completed')

      // updateCollection
    }
  }
  return (
    <div className='w-full border rounded px-5 py-5'>
      <div className='text-center'>
        <h2 className='text-lg text-gray-700'>Add Photos</h2>
      </div>

      <div>
        <form onSubmit={addPhotoHandler}>
          <div className='w-full p-5 my-5'>
            <label className='block'>
              <span className='text-gray-700'>Caption</span>
              <input
                type='text'
                value={name}
                onChange={(event) => {
                  setError('')
                  setName(event.target.value)
                }}
                className='mt-1 block  rounded-sm py-2 px-3 border-gray-300 border shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full'
              />
            </label>
            <label className='block mt-5'>
              <span className='text-gray-700'>Description</span>
              <textarea
                onChange={(event) => {
                  setError('')
                  setDescription(event.target.value)
                }}
                className='mt-1 block w-full rounded-sm py-2 px-3 border-gray-300 border shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
              >
                {description}
              </textarea>
            </label>
            <label className='block mt-5'>
              <span className='text-gray-700'>Select Your Photos</span>
              <input
                type='file'
                className='mt-1 block'
                onChange={(event) => {
                  setError('')
                  setFiles(event.target.files)
                  console.log(files)
                }}
                multiple
              />
            </label>
            <ProgressBar percent={percent} />
            <div className='w-full flex items-center justify-center'>
              <button className='bg-gray-700 text-white py-2 px-3 my-5 rounded  '>
                Upload
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddPhoto
