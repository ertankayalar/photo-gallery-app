import BreadcrumItem from './breadcrumb-item'
export default function Breadcrumb({ breadcrumbs }) {
  return (
    <nav
      className='text-gray-600 font-semibold my-3 text-xs lg:text-sm px-2 md:px-0'
      aria-label='Breadcrumb'
    >
      <ol className='list-none p-0 inline-flex'>
        {breadcrumbs.map((item) => (
          <BreadcrumItem item={item} key={item.url} />
        ))}
      </ol>
    </nav>
  )
}
