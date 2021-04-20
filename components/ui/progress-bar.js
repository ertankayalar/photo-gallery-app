import React from 'react'

function ProgressBar({ percent }) {
  const message =
    percent < 100 ? `${percent}% loading...` : `${percent}% completed`
  return (
    <div className='w-full my-4'>
      <div className='bg-gray-200 w-full h-2  rounded overflow-hidden mb-2'>
        <div
          className='h-2 bg-green-400'
          style={{
            width: `${percent}%`,
          }}
        ></div>
      </div>
      <div className='w-full text-lg font-semibold text-gray-600'>
        {percent > 0 && (
          <span className='flex flex-wrap items-center justify-items-center'>
            <span>{message}</span>
          </span>
        )}
      </div>
    </div>
  )
}

export default ProgressBar
