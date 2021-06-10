import React from 'react'
import CollectionList from './collection-list'

const FeaturedCollections = ({ collections }) => {
  return (
    <div>
      <div className='w-full py-10 text-center'>
        <h2 className='text-xl md:text-3xl text-gray-600 my-3'>
          Featured Collections
        </h2>
        <div className='w-full my-5'>
          <CollectionList collections={collections} />
        </div>
      </div>
    </div>
  )
}

export default FeaturedCollections
