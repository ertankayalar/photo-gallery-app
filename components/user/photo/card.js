import React, { useState } from 'react'
import DeleteIcon from '../../ui/icon/delete'
import EditIcon from '../../ui/icon/edit'
import ConfirmBox from '../../ui/confim'
import Backdrop from '../../ui/backdrop'
const UserPhotoCard = ({ photo, onDelete, onEditPhoto }) => {
  console.log(`photo`, photo)
  const [isConfirmBoxOpen, setConfirmBoxOpen] = useState(false)
  const {
    id,
    caption,
    published_at,
    // photo: {
    //   formats: { medium, large },
    // },
  } = photo

  const photoUrl =
    photo.photo != null
      ? photo.photo.formats.medium != null
        ? photo.photo.formats.medium.url
        : photo.photo.formats.thumbnail.url
      : ''

  function editPhotoModalHandler(event) {
    event.preventDefault()
    onEditPhoto(photo)
  }
  function deleteHandler(event) {
    closeConfirmBox()
    onDelete(id)
  }

  function openConfirmBox(event) {
    setConfirmBoxOpen(true)
  }

  function closeConfirmBox() {
    setConfirmBoxOpen(false)
  }

  return (
    <div className='text-center'>
      <div
        className='h-48 bg-gray-50 bg-cover '
        style={{ backgroundImage: `url(${photoUrl})` }}
      >
        {/* <img src={photoUrl} alt={caption} className='shadow-xl' /> */}
      </div>
      <p className='my-4 text-md text-gray-600'>{caption}</p>

      <div className='w-full flex items-center justify-center'>
        <button
          className='border bg-gray-100 text-gray-600  p-2 m-1 rounded hover:bg-gray-200 hover:text-gray-800  focus:bg-gray-800 focus:outline-none text-sm flex items-center'
          onClick={editPhotoModalHandler}
        >
          <EditIcon className='h-5 w-5 text-gray-500 hover:text-gray-800' />
        </button>
        <button
          className='border bg-gray-100 text-gray-600  p-2 m-1 rounded hover:bg-gray-200 hover:text-gray-800  focus:bg-gray-800 focus:outline-none text-sm flex items-center'
          onClick={openConfirmBox}
        >
          <DeleteIcon className='h-5 w-5 text-gray-500 ' />
        </button>
      </div>

      {isConfirmBoxOpen && (
        <ConfirmBox
          title='Photo will be deleted ?'
          message={`Please confirm to delete photo ${caption}`}
          onConfirm={deleteHandler}
          onCancel={closeConfirmBox}
        />
      )}
      {isConfirmBoxOpen && <Backdrop onCancel={closeConfirmBox} />}
    </div>
  )
}

export default UserPhotoCard
