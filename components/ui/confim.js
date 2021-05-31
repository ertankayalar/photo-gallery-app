import React, { useState, useRef } from 'react'
import DeleteIcon from './icon/delete'

const ConfirmBox = ({ title, message, onCancel, onConfirm }) => {
  function submitHandler(event) {
    event.preventDefault()
    onConfirm()
  }

  function closeHandler(event) {
    event.preventDefault()
    onCancel()
  }
  return (
    <div className='modal rounded  bg-gray-50'>
      <div className='text-center mb-5 px-3 py-10 bg-gray-200 w-full rounded-t'>
        <h2 className='text-2xl text-gray-700'>{title}</h2>
      </div>

      <div className='w-full p-5 my-3'>
        <form onSubmit={submitHandler}>
          <div className='text-lg text-gray-600 my-2'>
            <p>{message}</p>
          </div>
          <div className='w-full  flex items-center justify-center'>
            <button className='bg-red-700 hover:bg-red-600 text-white py-3 px-4 my-5 rounded flex items-center  '>
              <DeleteIcon className='h-5 w-5 text-white mr-2 ' />
              Delete
            </button>

            <button
              className=' bg-gray-600 hover:bg-gray-500 text-white py-3 px-4 my-5 mx-2 rounded'
              onClick={closeHandler}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ConfirmBox
