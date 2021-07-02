import Link from 'next/link'
import Image from 'next/image'
import DateFormatter from '../ui/date-formater'

export default function PostHeader({ post }) {
  const { title, coverimage, published_at, blog_categories } = post

  const coverImageUrl = coverimage?.formats?.large?.url
  const coverImageWidth = coverimage?.formats?.large?.width
  const coverImageHeight = coverimage?.formats?.large?.height
  return (
    <header className='w-full md:max-w-3xl mx-auto'>
      <h1 className='text-3xl mb-3 md:text-4xl my-10 text-center text-gray-700 font-header'>
        {title}
      </h1>

      <div className='text-gray-500 my-5 text-xs md:text-sm flex justify-center items-center'>
        <span className='mr-5 pl-5' itemProp='datePublished'>
          <DateFormatter dateString={published_at} />
        </span>
        <span className=' border-l pl-5 text-xs md:text-md font-semibold'>
          {blog_categories.map((cat) => (
            <Link href={`/blog/category/${cat.slug}/`} key={cat.slug}>
              <a className='mr-3 hover:underline'>{cat.name}</a>
            </Link>
          ))}
        </span>
      </div>

      <div className='w-full md:max-w-2xl mx-auto'>
        {coverImageUrl && (
          <Image
            src={coverImageUrl}
            alt={title}
            width={coverImageWidth}
            height={coverImageHeight}
          />
        )}
      </div>
    </header>
  )
}
