import React from 'react'
import DeleteIcon from '../ui/delete-icon'
import EditIcon from '../ui/edit-icon'

const UserPhotoCard = ({ photo, onDelete }) => {
  const {
    id,
    caption,
    published_at,
    photo: {
      formats: { medium, large },
    },
  } = photo

  function deleteHandler(event) {
    onDelete(id)
  }

  return (
    <div className='text-center'>
      <img src={medium.url} alt={caption} className='shadow-xl' />
      <p className='my-4 text-md text-gray-600'>{caption}</p>

      <div className='w-full flex items-center justify-center'>
        <button className='border bg-gray-100 text-gray-600  p-2 m-1 rounded hover:bg-gray-200 hover:text-gray-800  focus:bg-gray-800 focus:outline-none text-sm flex items-center'>
          <EditIcon className='h-5 w-5 text-gray-500 hover:text-gray-800' />
        </button>
        <button
          className='border bg-gray-100 text-gray-600  p-2 m-1 rounded hover:bg-gray-200 hover:text-gray-800  focus:bg-gray-800 focus:outline-none text-sm flex items-center'
          onClick={deleteHandler}
        >
          <DeleteIcon className='h-5 w-5 text-gray-500 hover:text-gray-800' />
        </button>
      </div>
    </div>
  )
}

export default UserPhotoCard
