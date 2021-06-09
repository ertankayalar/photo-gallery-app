import React from 'react'
import Card from './card'
function UserCollectionList({ collections }) {
  return (
    <div className='grid grid-cols-2 gap-4 px-1 py-2'>
      {collections.map((collection) => (
        <Card collection={collection} key={collection.id} />
      ))}
    </div>
  )
}

export default UserCollectionList
