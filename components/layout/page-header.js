import Container from './container'

export default function PageHeader({ title, description }) {
  return (
    <div className='w-full bg-transparent text-gray-600'>
      <Container className='py-14 text-center'>
        <h1 className='text-4xl mb-3'>{title}</h1>
        {description && <p className='text-md text-gray-500'>{description}</p>}
      </Container>
    </div>
  )
}
