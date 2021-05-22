import React, { useState } from 'react'

const PhotoList = ({ photos }) => {
  const [colPhotos, setColPhotos] = useState(photos)
  return (
    <div className='w-full'>
      e
      {colPhotos &&
        colPhotos.map((photo) => {
          {
            photo.caption
          }
        })}
    </div>
  )
}

export default PhotoList
