import React from 'react'

const DeleteIcon = ({ className }) => {
  return (
    // <svg
    //   xmlns='http://www.w3.org/2000/svg'
    //   className={className}
    //   fill='none'
    //   viewBox='0 0 24 24'
    //   stroke='currentColor'
    // >
    //   <path
    //     strokeLinecap='round'
    //     strokeLinejoin='round'
    //     strokeWidth={2}
    //     d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
    //   />
    // </svg>

    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      viewBox='0 0 24 24'
      stroke-width='1.5'
      // stroke='#2c3e50'
      stroke='currentColor'
      fill='none'
      stroke-linecap='round'
      stroke-linejoin='round'
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <line x1='4' y1='7' x2='20' y2='7' />
      <line x1='10' y1='11' x2='10' y2='17' />
      <line x1='14' y1='11' x2='14' y2='17' />
      <path d='M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12' />
      <path d='M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3' />
    </svg>
  )
}

export default DeleteIcon
