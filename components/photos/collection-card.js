import React from 'react'
import Link from 'next/link'

function CollectionCard({ collection }) {
  const { name, photos } = collection
  const thumbPhotos = photos.slice(0, 3)
  return (
    <Link href={`/collections/${collection.slug}`}>
      <a>
        <div className='w-full'>
          <div className='w-full flex '>
            <div
              className='w-3/4'
              style={{
                paddingRight: '2px',
              }}
            >
              <img
                src={thumbPhotos[0].photo.formats.small.url}
                className='rounded-l'
              />
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
                    backgroundImage: `url(${thumbPhotos[1].photo.formats.small.url})`,
                  }}
                ></div>
              </div>

              <div className='w-full h-1/2'>
                <div
                  className='h-full bg-no-repeat bg-center bg-cover rounded-br'
                  style={{
                    backgroundImage: `url(${thumbPhotos[2].photo.formats.small.url})`,
                  }}
                ></div>
              </div>
            </div>
          </div>
          <div className='w-4/4 py-2'>
            <div className='w-full font-semibold py-2'>{name}</div>
            <div className='w-full  text-gray-600'>
              <span>{collection.photos.length} photos</span>
              <span className='ml-2'>by AuthorName</span>
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default CollectionCard
