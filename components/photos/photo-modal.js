import React, { useState, useEffect } from 'react'

function PhotoModal({ photos, photo, count, user, large, caption, onCancel }) {
  const [activeIndex, setActiveIndex] = useState(count)
  const [activePhoto, setActivePhoto] = useState(photos[activeIndex])

  useEffect(() => {
    setActivePhoto(photos[activeIndex])
  }, [activeIndex])

  console.log(`photos`, photos)
  console.log(`activePhoto`, activePhoto)
  console.log(`active index`, activeIndex)
  console.log(`photos.length`, photos.length)

  function closeHandler() {
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
    <div className='w-full h-screen absolute'>
      <div className='w-full pt-3'>
        <button className=' text-white hover:text-gray-400 mr-5  h-10 w-10 absolute right-1'>
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

      <div className='flex fixed left-0 w-1/6 h-5/6 justify-end '>
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

      <div className='flex fixed right-0 w-1/6 h-5/6 justify-start'>
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

      <div className='modal  bg-white rounded h-5/6 w-4/6 mx-auto text-gray-600'>
        <div className='w-full flex h-12 py-3 px-5'>
          {user.Firstname} {user.Lastname}
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
    </div>
  )
}

export default PhotoModal
