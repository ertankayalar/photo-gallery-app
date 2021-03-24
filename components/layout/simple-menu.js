import Link from 'next/link'
export default function SimpleMenu({ menuItems }) {
  return (
    <div>
      {menuItems.map(({ href, label }) => (
        <Link href={href} key={href}>
          <a className='text-md hover:underline mr-1'>{label}</a>
        </Link>
      ))}
    </div>
  )
}
