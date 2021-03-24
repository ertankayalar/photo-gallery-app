import Link from 'next/link'

function UserMenu({ menuItems }) {
  return (
    <div>
      {menuItems.map(({ href, label }) => (
        <Link key={`${href}${label}`} href={href}>
          <a className='w-full text-left  py-2 md:py-1 px-1 font-header md:w-auto hover:underline'>
            {label}
          </a>
        </Link>
      ))}
    </div>
  )
}

export default UserMenu
