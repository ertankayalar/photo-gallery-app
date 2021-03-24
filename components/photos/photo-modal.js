import React from 'react'

function PhotoModal({ large, caption, onCancel }) {
  function closeHandler() {
    onCancel()
  }
  return (
    <div className='modal'>
      <div className='w-full flex  h-12 px-2 py-2'>
        <span className='text-2xl font-semibold text-gray-700'>{caption}</span>
        <button
          className=' text-gray-400 hover:text-gray-700  h-10 w-10 absolute right-1'
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
      <div className='w-full text-center p-2'>
        <img src={large.url} />
      </div>
    </div>
  )
}

export default PhotoModal
