import Link from 'next/link'
export default function TopMenu({ menuItems }) {
  return (
    <nav className='flex flex-wrap items-center justify-center ml-5 md:ml-0  md:justify-center md:space-x-4 h-auto md:h-14 text-gray-700  bg-gray-100 p-0'>
      {menuItems.map(({ href, label }) => (
        <Link key={`${href}${label}`} href={href}>
          <a className='w-full text-left  py-2 md:py-1 px-1 font-header md:w-auto hover:underline'>
            {label}
          </a>
        </Link>
      ))}
    </nav>
  )
}
