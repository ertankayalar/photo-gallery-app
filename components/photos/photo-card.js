import React from 'react'
import Link from 'next/link'

const PhotoCard = ({ data }) => {
  const { name, photos, url, count, author } = data

  let mainPhoto = ''

  if (photos[0] != undefined) {
    mainPhoto = <img src={photos[0].formats.medium.url} className='rounded-l' />
  }

  let secondPhoto = ''

  if (photos[1] != undefined) {
    secondPhoto = photos[1].formats.medium.url
  }

  let thirdPhoto = ''
  if (photos[2] != undefined) {
    thirdPhoto = photos[2].formats.medium.url
  }

  return (
    <Link href={url}>
      <a>
        <div className='w-full'>
          <div className='w-full flex '>
            <div
              className='w-3/4'
              style={{
                paddingRight: '2px',
              }}
            >
              {mainPhoto}
            </div>
            <div className='w-1/4'>
              <div
                className='w-full h-1/2'
                style={{
                  paddingBottom: '2px',
                }}
              >
                <div
                  className='h-full w-full bg-no-repeat bg-center bg-cover rounded-tr'
                  style={{
                    backgroundImage: `url(${secondPhoto})`,
                  }}
                ></div>
              </div>

              <div className='w-full h-1/2'>
                <div
                  className='h-full bg-no-repeat bg-center bg-cover rounded-br'
                  style={{
                    backgroundImage: `url(${thirdPhoto})`,
                  }}
                ></div>
              </div>
            </div>
          </div>
          <div className='w-4/4 py-2'>
            <div className='w-full font-semibold py-2'>{name}</div>
            <div className='w-full  text-gray-600'>
              {photos.length > 0 && <span>{count} photos</span>}
              {author && <span className='ml-2'>{author}</span>}
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default PhotoCard
