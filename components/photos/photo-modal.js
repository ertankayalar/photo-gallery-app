import React, { useState, useEffect } from 'react'
import Select from 'react-dropdown-select'

function PhotoModal({ photos, photo, count, user, large, caption, onCancel }) {
  const [activeIndex, setActiveIndex] = useState(count)
  const [activePhoto, setActivePhoto] = useState(photos[activeIndex])
  const { Firstname, Lastname } = user
  const options = [
    {
      id: 0,
      name: 'Download',
    },
    {
      id: 1,
      name: 'Medium',
    },
    { id: 2, name: 'Large' },
    { id: 3, name: 'Original' },
  ]

  useEffect(() => {
    setActivePhoto(photos[activeIndex])
  }, [activeIndex])

  console.log(`photos`, photos)
  console.log(`activePhoto`, activePhoto)
  console.log(`active index`, activeIndex)
  console.log(`photos.length`, photos.length)

  function modalHandler(event) {
    event.preventDefault()
  }

  function closeHandler(event) {
    event.preventDefault()
    onCancel()
  }

  function nextHandler(event) {
    event.preventDefault()
    if (activeIndex < photos.length) {
      setActiveIndex(activeIndex + 1)
    }
    event.stopPropagation()
  }

  function prevHandler(event) {
    event.preventDefault()
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1)
    }
    event.stopPropagation()
  }

  return (
    <div className='w-screen h-screen fixed top-0 left-0 opacity-100 z-40 flex '>
      <div className='w-full pt-3 z-40'>
        <button
          className=' text-white hover:text-gray-400 mr-5  h-10 w-10 absolute right-1'
          onClick={closeHandler}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={1}
              d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
        </button>
      </div>

      <div className='flex fixed left-0 w-1/6 h-4/5 justify-end z-40 top-0'>
        <button
          className='text-white fixed top-60 mr-5 focus:outline-none disabled:opacity-40'
          onClick={prevHandler}
          disabled={activeIndex == 0}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-8 w-8'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M15 19l-7-7 7-7'
            />
          </svg>
        </button>
      </div>

      <div
        className='modal bg-white rounded fixed w-3/6 h-5/6 text-gray-600 z-50 top-5'
        onClick={modalHandler}
      >
        <div className='w-full flex h-12 py-3 px-5'>
          <div className='w-1/2'>
            {Firstname && Firstname} {Lastname && Lastname}
          </div>
          <div className='w-1/2'>
            {/* <Select
              options={options}
              values={[]}
              onChange={(value) => console.log(value)}
            /> */}
          </div>
        </div>
        <div className='w-full flex items-center justify-center p-2'>
          <img src={activePhoto.files[0].formats.large.url} />
        </div>
        <div className='w-full text-center py-5'>
          <p className='text-2xl font-normal  text-gray-700'>
            {activePhoto.caption}
          </p>
          <p className='text-gray-500 text-sm'>{activePhoto.descripton}</p>
        </div>
      </div>

      <div className='flex fixed right-0 top-0 z-40 w-1/6 h-5/6 justify-start'>
        <button
          className='text-white fixed top-60 ml-5 focus:outline-none disabled:opacity-40'
          onClick={nextHandler}
          disabled={activeIndex == photos.length - 1}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-8 w-8'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M9 5l7 7-7 7'
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default PhotoModal
