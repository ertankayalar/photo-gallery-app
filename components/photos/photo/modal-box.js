import React, { useState, useEffect } from 'react'
import Select from 'react-dropdown-select'

const ModalBox = ({ photos, photo, count, user, large, caption, onCancel }) => {
  const [activeIndex, setActiveIndex] = useState(count)
  const [activePhoto, setActivePhoto] = useState(photos[activeIndex])
  const [downloadOptions, setDownloadOptions] = useState([])
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
    const { formats, height, width, url } = activePhoto.files[0]

    setDownloadOptions([
      {
        id: 0,
        name: 'Download',
      },
      {
        id: 1,
        name: `Small (${formats.small.height}x${formats.small.width})`,
        url: formats.small.url,
      },
      {
        id: 2,
        name: `Medium (${formats.medium.height}x${formats.medium.width})`,
        url: formats.medium.url,
      },
      {
        id: 3,
        name: `Large (${formats.large.height}x${formats.large.width})`,
        url: formats.large.url,
      },
      {
        id: 4,
        name: `Orginal (${height}x${width})`,
        url: url,
      },
    ])
    //   console.log(`downloadOptions`, downloadOptions)
  }, [activeIndex])

  //   console.log(`photos`, photos)
  //   console.log(`activePhoto`, activePhoto)
  //   console.log(`active index`, activeIndex)
  //   console.log(`photos.length`, photos.length)

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
    <div className='modal fixed w-full h-full top-0 left-0 flex items-center justify-center z-20'>
      <div className='modal-overlay absolute w-full h-full bg-gray-900 opacity-50'></div>

      <div className='flex fixed left-0 w-1/6 md:h-4/5 justify-end z-40 top-0'>
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
        className='modal-container bg-white w-11/12 md:w-4/6 md:h-4/5 mx-auto rounded shadow-lg z-50 overflow-y-auto'
        onClick={modalHandler}
      >
        <div className='modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50'>
          <button
            className=' text-white hover:text-gray-400 mr-5  h-10 w-10  focus:outline-none'
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

        <div className='w-full flex h-12 py-3 px-5'>
          <div className='w-3/4'>
            {user.Firstname} {user.Lastname}
          </div>
          <div className='w-1/4'>
            <Select
              options={downloadOptions}
              values={[
                {
                  id: 0,
                  name: 'Download',
                },
              ]}
              searchable={false}
              placeholder='Download'
              name='select'
              separator={true}
              labelField='name'
              valueField='id'
              onChange={(value) => {
                window.open(value[0].url, '_blank')
                // console.log(value)
              }}
            />
          </div>
        </div>
        <div className='w-full flex items-center justify-center p-2'>
          <img src={activePhoto.files[0].formats.large.url} />
        </div>
        <div className='w-full text-center py-5'>
          {activePhoto.caption && (
            <p className='text-2xl font-normal  text-gray-700'>
              {activePhoto.caption}
            </p>
          )}

          {activePhoto.description && (
            <p className='text-gray-500 text-sm'>{activePhoto.description}</p>
          )}
        </div>
      </div>

      <div className='flex fixed right-0 top-0 z-40 w-1/6 md:h-4/6 justify-start'>
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

export default ModalBox
