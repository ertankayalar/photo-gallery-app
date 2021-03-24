import React from 'react'
import Card from './collection-card'
function CollectionList({ collections }) {
  return (
    <div className='grid grid-cols-2 gap-4 px-1 py-2'>
      {collections.map((collection) => (
        <Card collection={collection} />
      ))}
    </div>
  )
}

export default CollectionList
