import React from 'react'
import Link from 'next/link'

function UserCollectionCard({ collection }) {
  const { name, photos } = collection

  const thumbPhotos = photos.slice(0, 3)

  let mainPhoto = ''
  if (thumbPhotos[0] !== undefined) {
    mainPhoto = (
      <img
        src={thumbPhotos[0]?.photo?.formats?.small?.url}
        className='rounded-l'
      />
    )
  }
  let secondPhoto = ''
  if (thumbPhotos[1] !== undefined) {
    secondPhoto = thumbPhotos[1]?.photo?.formats?.small?.url
  }
  let thirdPhoto = ''
  if (thumbPhotos[2] !== undefined) {
    thirdPhoto = thumbPhotos[2]?.photo?.formats?.small?.url
  }

  return (
    <Link href={`/member/collection/${collection.id}`}>
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
              <span>{collection.photos.length} photos</span>
              <span className='ml-2'>
                Published at {collection.published_at}
              </span>
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default UserCollectionCard
