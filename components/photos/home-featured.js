import React from 'react'
import PhotoCard from './photo-card'

const HomeFeatured = ({ collections }) => {
  return (
    <div className='w-full py-10 text-center'>
      <h2 className='text-xl md:text-3xl text-gray-600 my-3'>
        Featured Collections
      </h2>
      <div className='w-full grid grid-cols-2 gap-4 px-1 py-2'>
        {collections.map((collection) => (
          <PhotoCard data={collection} key={collection.url} />
        ))}
      </div>
    </div>
  )
}

export default HomeFeatured
