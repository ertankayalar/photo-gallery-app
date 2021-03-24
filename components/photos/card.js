import { useState } from 'react'
import cardStyles from './card.module.css'
import PhotoModal from './photo-modal'
import Backdrop from '../ui/backdrop'

function PhotoCard({ photo }) {
  const {
    caption,
    published_at,
    photo: {
      formats: { medium, large },
    },
  } = photo

  const [isPhotoModalOpen, setPhotoModalOpen] = useState(false)

  function photoModalHandler() {
    setPhotoModalOpen(true)
  }

  function closeModalHandler() {
    setPhotoModalOpen(false)
  }
  return (
    <div className='w-full'>
      <figure className={cardStyles.galleryImage} onClick={photoModalHandler}>
        <img src={medium.url} alt={caption} className='shadow-xl' />
        <figcaption>
          <h3>{caption}</h3>
          <p>image description</p>
        </figcaption>
        <a href='#'></a>
      </figure>
      {isPhotoModalOpen && (
        <PhotoModal
          large={large}
          caption={caption}
          onCancel={closeModalHandler}
        />
      )}
      {isPhotoModalOpen && <Backdrop onCancel={closeModalHandler} />}
    </div>
  )
}

export default PhotoCard
