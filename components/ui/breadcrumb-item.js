import RightArrow from './right-arrow'
import Link from 'next/link'
function BreadcrumItem({ item }) {
  const lastItemClass = item?.last ? ' text-gray-400' : ''
  return (
    <li className='flex items-center' key={item.url}>
      <Link href={item.url}>
        <a className={'flex items-center hover:underline' + lastItemClass}>
          {item.name}
          {!item?.last && <RightArrow />}
        </a>
      </Link>
    </li>
  )
}

export default BreadcrumItem
