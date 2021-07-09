import { useState } from 'react'
import cardStyles from './card.module.css'

import ModalBox from './photo/modal-box'

function PhotoDetailCard({ user, photo, photos, count }) {
  const { caption, description, files } = photo

  const [isPhotoModalOpen, setPhotoModalOpen] = useState(false)

  function photoModalHandler() {
    setPhotoModalOpen(true)
  }

  function closeModalHandler() {
    setPhotoModalOpen(false)
  }
  //console.log(`photo`, photo)
  const photoUrl =
    files[0].formats.medium != null ? files[0].formats.medium.url : ''
  return (
    <div className='w-full'>
      <div className={cardStyles.galleryImage} onClick={photoModalHandler}>
        <figure
          className='h-48 bg-cover'
          style={{ backgroundImage: `url(${photoUrl})` }}
        >
          {/* <img
          src={files[0].formats.medium.url}
          alt={caption}
          className='shadow-xl'
        /> */}
          <a href='#'></a>
        </figure>
        <figcaption className='text-white z-20'>
          {caption && <h3>{caption}</h3>}
          {description && <p>{description}</p>}
        </figcaption>
      </div>
      {/* {isPhotoModalOpen && (
        <PhotoModal
          large={files[0].formats.large}
          caption={caption}
          onCancel={closeModalHandler}
        />
      )} */}

      {/* {isPhotoModalOpen && (
        <PhotoModal
          user={user}
          large={files[0].formats.large}
          caption={caption}
          onCancel={closeModalHandler}
          photos={photos}
          photo={photo}
          count={count}
        />
      )}
      {isPhotoModalOpen && <Backdrop onCancel={closeModalHandler} />} */}
      {isPhotoModalOpen && (
        <ModalBox
          user={user}
          large={files[0].formats.large}
          caption={caption}
          onCancel={closeModalHandler}
          photos={photos}
          photo={photo}
          count={count}
        />
      )}
    </div>
  )
}

export default PhotoDetailCard
