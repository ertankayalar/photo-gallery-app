import Link from 'next/link'

export default function NavButton({ href, children }) {
  return (
    <Link href={href}>
      <a className='py-2 px-3 bg-blue-500 hover:bg-blue-600  my-2 mx-2 text-white rounded w-44 flex items-center justify-center'>
        {children}
      </a>
    </Link>
  )
}
