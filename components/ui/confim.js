import React, { useState, useRef } from 'react'

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
          <div className='w-full'>
            <button className='bg-red-700 text-white py-3 px-4 my-5 rounded  '>
              Delete
            </button>

            <button
              className=' bg-gray-700 text-white py-3 px-4 my-5 mx-2 rounded'
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
