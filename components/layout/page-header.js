export default function PageHeader({ title }) {
  return (
    <div className='w-full px-2'>
      <h1 className='text-2xl lg:text-3xl py-3 lg:py-4 text-strong text-gray-700'>
        {title}
      </h1>
    </div>
  )
}
