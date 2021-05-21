import React from 'react'
import Container from '../layout/container'
import Image from 'next/image'
import Link from 'next/link'

const Hero = () => {
  return (
    <div className='w-full bg-gray-100 py-10'>
      <Container className='flex flex-wrap'>
        <div className='w-full md:w-2/3'>
          <h1 className='text-xl md:text-3xl font-semibold my-3 text-gray-700'>
            Add Your Microsope Photos
          </h1>
          <div className='my-3 py-3  text-md text-gray-700'>
            <p className='my-1'>Line 1</p>
            <p className='my-1'>Line 2</p>
          </div>

          <div className='w-full'>
            <Link href='/upload'>
              <a className='max-w-sm px-3 py-4 text-white bg-gray-600 rounded focus:bg-gray-700 focus:outline-none flex items-center justify-center '>
                Upload Your Photos
                <svg
                  aria-hidden='true'
                  focusable='false'
                  data-icon='cloud-upload-alt'
                  class='h-8 w-8 ml-3 text-white'
                  role='img'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 640 512'
                >
                  <path
                    fill='currentColor'
                    d='M537.6 226.6c4.1-10.7 6.4-22.4 6.4-34.6 0-53-43-96-96-96-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32c-88.4 0-160 71.6-160 160 0 2.7.1 5.4.2 8.1C40.2 219.8 0 273.2 0 336c0 79.5 64.5 144 144 144h368c70.7 0 128-57.3 128-128 0-61.9-44-113.6-102.4-125.4zM393.4 288H328v112c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V288h-65.4c-14.3 0-21.4-17.2-11.3-27.3l105.4-105.4c6.2-6.2 16.4-6.2 22.6 0l105.4 105.4c10.1 10.1 2.9 27.3-11.3 27.3z'
                  ></path>
                </svg>
              </a>
            </Link>
          </div>
        </div>
        <div className='w-ful md:w-1/3 flex items-center justify-center'>
          <svg
            aria-hidden='true'
            focusable='false'
            data-icon='microscope'
            className='h-36 w-36 text-gray-600'
            role='img'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 512 512'
          >
            <path
              fill='currentColor'
              d='M160 320h12v16c0 8.84 7.16 16 16 16h40c8.84 0 16-7.16 16-16v-16h12c17.67 0 32-14.33 32-32V64c0-17.67-14.33-32-32-32V16c0-8.84-7.16-16-16-16h-64c-8.84 0-16 7.16-16 16v16c-17.67 0-32 14.33-32 32v224c0 17.67 14.33 32 32 32zm304 128h-1.29C493.24 413.99 512 369.2 512 320c0-105.88-86.12-192-192-192v64c70.58 0 128 57.42 128 128s-57.42 128-128 128H48c-26.51 0-48 21.49-48 48 0 8.84 7.16 16 16 16h480c8.84 0 16-7.16 16-16 0-26.51-21.49-48-48-48zm-360-32h208c4.42 0 8-3.58 8-8v-16c0-4.42-3.58-8-8-8H104c-4.42 0-8 3.58-8 8v16c0 4.42 3.58 8 8 8z'
            ></path>
          </svg>
        </div>
      </Container>
    </div>
  )
}

export default Hero
