import { useState, useRef } from 'react'
import ProgressBar from '../../ui/progress-bar'
import UploadIcon from '../../ui/icon/upload'
import Image from 'next/image'
import Loader from '../../ui/loader'

// collect photo data
const PhotoForm = ({
  photo,
  percent,
  onAddPhoto,
  onUpdatePhoto,
  onCancel,
  isUploadSuccess,
}) => {
  const captionRef = useRef()
  const descriptionRef = useRef()
  const photoRef = useRef()
  const [error, setError] = useState('')
  const [files, setFiles] = useState(null)
  const [message, setMessage] = useState('')
  const [isUpload, setIsUpload] = useState(false)
  console.log(`isUpload`, isUpload)

  // edit photo
  const [id, setId] = photo != null ? useState(photo.id) : useState(null)
  const [caption, setCaption] =
    photo != null ? useState(photo.caption) : useState('')
  const [description, setDescription] =
    photo != null ? useState(photo.description) : useState('')
  const smallPhoto =
    photo != null && photo.photo ? photo.photo.formats.small.url : ''

  const formTitle = id == null ? 'Add Photo' : 'Edit Photo'

  async function submitHandler(event) {
    event.preventDefault()
    // const enteredCaption = captionRef.current.value
    // const enteredDescription = descriptionRef.current.value
    // const enteredPhoto = photoRef.current.value

    // console.log('enteredCaption', enteredCaption)
    // console.log('enteredPhoto', enteredPhoto)

    // error check

    if (!caption || caption.length < 5) {
      setError('invalid input - caption should also be least 7 characters long')
    }

    if (!error != '') {
      // if id is null
      if (id == null) {
        setIsUpload(true)
        const result = await onAddPhoto({
          caption: caption,
          description: description,
          photoFiles: files,
        })
        setIsUpload(false)
      }

      // if id is not null
      if (id != null) {
        setIsUpload(true)
        const result = await onUpdatePhoto({
          id: id,
          caption: caption,
          description: description,
          photoFiles: files,
        })
        setIsUpload(false)
      }
      console.log(`isUpload`, isUpload)
      if (isUploadSuccess) {
        setMessage('Upload completed')
      }
    }
  }

  function closeHandler(event) {
    setId(null)
    setCaption('')
    setDescription('')
    setFiles(null)

    onCancel()
  }

  return (
    <div className='modal  border rounded px-3 py-3'>
      <div className='text-center'>
        <h2 className='text-xl text-gray-700'>{formTitle}</h2>
      </div>

      <form onSubmit={submitHandler}>
        <div className='w-full flex flex-wrap p-2 my-3'>
          <div className='w-full md:w-1/2 p-1'>
            <div
              className='h-48 bg-gray-50 bg-cover rounded'
              style={{ backgroundImage: `url(${smallPhoto})` }}
            ></div>

            <label className='block mt-5'>
              <span className='text-gray-700'>Select Your Photo</span>
              <input
                type='file'
                className='mt-1 block'
                ref={photoRef}
                onChange={(event) => {
                  setError('')
                  setFiles(event.target.files)
                  console.log('event.target.files', event.target.files)
                  console.log(files)
                }}
                disabled={isUpload}
                required
              />
            </label>
          </div>

          <div className='w-full md:w-1/2 p-1'>
            <label className='block'>
              <span className='text-gray-700'>Caption</span>
              <input
                type='text'
                id='caption'
                required
                value={caption}
                onChange={(event) => {
                  setError('')
                  setCaption(event.target.value)
                }}
                ref={captionRef}
                className='mt-1 block  rounded-sm py-2 px-3 border-gray-300 border shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full'
                disabled={isUpload}
              />
            </label>
            <label className='block mt-5'>
              <span className='text-gray-700'>Description</span>
              <textarea
                ref={descriptionRef}
                value={description}
                onChange={(event) => {
                  setError('')
                  setDescription(event.target.value)
                }}
                className='mt-1 block w-full rounded-sm py-2 px-3 border-gray-300 border shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                disabled={isUpload}
              ></textarea>
            </label>
            {error && <p className='text-red-800'>{error}</p>}
            {isUpload && (
              <div className='w-full flex items-center justify-center py-3'>
                <Loader />
                <span className='text-gray-600'>Uploading...</span>
              </div>
            )}
            <p>{message}</p>
          </div>

          <div className='w-full'>
            {/* <ProgressBar percent={percent} /> */}

            <div className='w-full flex items-center justify-center'>
              <button
                className='bg-blue-700 hover:bg-blue-600 text-white py-2 px-3 my-5 rounded  flex items-center text-md disabled:opacity-50'
                disabled={isUpload}
              >
                <UploadIcon className='h-4 w-4 mr-2' />
                Upload
              </button>

              <button
                className=' bg-gray-700 hover:bg-gray-600 text-white py-2 px-3 my-5 mx-2 rounded disabled:opacity-50'
                onClick={closeHandler}
                disabled={isUpload}
              >
                Close{' '}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default PhotoForm
