import { useState, useRef } from 'react'
import ProgressBar from '../ui/progress-bar'

// collect photo data
const AddPhotoForm = (props) => {
  const captionRef = useRef()
  const descriptionRef = useRef()
  const photoRef = useRef()
  const [error, setError] = useState('')
  const [files, setFiles] = useState(null)
  const [message, setMessage] = useState('')

  function submitHandler(event) {
    event.preventDefault()
    const enteredCaption = captionRef.current.value
    const enteredDescription = descriptionRef.current.value
    const enteredPhoto = photoRef.current.value

    console.log('enteredCaption', enteredCaption)
    console.log('enteredPhoto', enteredPhoto)
    console.log('files', files)

    const result = props.onAddPhoto({
      caption: enteredCaption,
      description: enteredDescription,
      photoFiles: files,
    })

    if (props.isUploadSuccess) {
      setMessage('Upload completed')
    }
  }

  function closeHandler(event) {
    props.onCancel()
  }
  return (
    <div className='modal  border rounded px-3 py-3'>
      <div className='text-center'>
        <h2 className='text-lg text-gray-700'>Add Photo</h2>
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
                ref={captionRef}
                className='mt-1 block  rounded-sm py-2 px-3 border-gray-300 border shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full'
              />
            </label>
            <label className='block mt-5'>
              <span className='text-gray-700'>Description</span>
              <textarea
                ref={descriptionRef}
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
            <ProgressBar percent={props.percent} />
            <p>{message}</p>
            <div className='w-full flex items-center justify-center'>
              <button className='bg-blue-700 text-white py-2 px-3 my-5 rounded  '>
                Upload
              </button>

              <button
                className=' bg-gray-700 text-white py-2 px-3 my-5 mx-2 rounded'
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

export default AddPhotoForm
