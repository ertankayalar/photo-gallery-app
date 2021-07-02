import NavButton from './nav-button'

export default function Pagination({ url = '', pageNumber, lastPage }) {
  return (
    <div className='w-full flex items-center justify-center'>
      {pageNumber > 1 && (
        <NavButton href={`${url}/${+pageNumber - 1}/`}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            className='h-6 w-6 mr-2'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z'
            />
          </svg>{' '}
          Previous Page
        </NavButton>
      )}

      {pageNumber < lastPage && (
        <NavButton href={`${url}/${+pageNumber + 1}/`}>
          Next Page
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            className='h-6 w-6 ml-2'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
        </NavButton>
      )}
    </div>
  )
}
