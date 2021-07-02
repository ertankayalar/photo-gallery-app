import Link from 'next/link'
import Image from 'next/image'
import Pagination from '../ui/pagination'
import Card from './card'
import NoPost from '../ui/no-post'

export default function List({
  categorySlug = '',
  posts,
  pageNumber = 1,
  lastPage,
}) {
  const url = categorySlug ? `/blog/category/${categorySlug}` : `/blog`
  return (
    <>
      {posts.length > 0 ? (
        <div className='w-full'>
          <div className='grid grid-cols-1 md:grid-cols-3  '>
            {posts.map((post) => (
              <Card post={post} key={post.slug} />
            ))}
          </div>
          <Pagination url={url} pageNumber={+pageNumber} lastPage={+lastPage} />
        </div>
      ) : (
        <NoPost />
      )}
    </>
  )
}
