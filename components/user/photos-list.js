import React, { useState } from 'react'

const PhotoList = ({ photos }) => {
  const [colPhotos, setColPhotos] = useState(photos)
  return (
    <div className='w-full'>
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
