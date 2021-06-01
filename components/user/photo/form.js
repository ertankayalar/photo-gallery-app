import { useState, useRef } from 'react'
import ProgressBar from '../../ui/progress-bar'
import UploadIcon from '../../ui/icon/upload'
import Image from 'next/image'

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
  // edit photo
  const [id, setId] = photo != null ? useState(photo.id) : useState(null)
  const [caption, setCaption] =
    photo != null ? useState(photo.caption) : useState('')
  const [description, setDescription] =
    photo != null ? useState(photo.description) : useState('')
  const smallPhoto =
    photo != null && photo.photo ? photo.photo.formats.small.url : ''

  const formTitle = id == null ? 'Add Photo' : 'Edit Photo'

  function submitHandler(event) {
    event.preventDefault()
    // const enteredCaption = captionRef.current.value
    // const enteredDescription = descriptionRef.current.value
    // const enteredPhoto = photoRef.current.value

    // console.log('enteredCaption', enteredCaption)
    // console.log('enteredPhoto', enteredPhoto)
    console.log('files', files)

    // if id is null
    if (id == null) {
      const result = onAddPhoto({
        caption: caption,
        description: description,
        photoFiles: files,
      })
    }

    // if id is not null
    if (id != null) {
      const result = onUpdatePhoto({
        id: id,
        caption: caption,
        description: description,
        photoFiles: files,
      })
    }

    if (isUploadSuccess) {
      setMessage('Upload completed')
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
        <h2 className='text-lg text-gray-700'>
          {/* {id != null && `Edit Photo`} {id == null && `Add Photo`} */}
          {formTitle}
        </h2>
      </div>

      <div>
        <form onSubmit={submitHandler}>
          <div className='w-full p-5 my-3'>
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
              ></textarea>
            </label>
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
              />
            </label>
            <ProgressBar percent={percent} />
            <p>{message}</p>
            <div className='w-full flex items-center justify-content-center'>
              <img
                src={smallPhoto}
                width={500}
                height={200}
                className='mx-auto'
              />
            </div>
            <div className='w-full flex items-center justify-center'>
              <button className='bg-blue-700 hover:bg-blue-600 text-white py-2 px-3 my-5 rounded  flex items-center text-md '>
                <UploadIcon className='h-4 w-4 mr-2' />
                Upload
              </button>

              <button
                className=' bg-gray-700 hover:bg-gray-600 text-white py-2 px-3 my-5 mx-2 rounded'
                onClick={closeHandler}
              >
                Close{' '}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PhotoForm
