import Link from 'next/link'
import Image from 'next/image'

export default function Card({ post }) {
  const { slug, title, coverimage } = post
  const coverImageUrl = coverimage?.formats?.large?.url

  return (
    <div key={slug} className='m-0 md:mx-2 md:my-2 '>
      <div className='w-full flex items-center justify-center md:text-sm text-gray-400 '>
        {coverImageUrl && (
          <Link href={`/blog/post/${slug}`}>
            <a>
              {
                <Image
                  src={coverImageUrl}
                  width={320}
                  height={150}
                  alt={title}
                />
              }
            </a>
          </Link>
        )}
      </div>
      <div className='w-full flex justify-center md:justify-start md:items-start text-center'>
        <Link href={`/blog/post/${slug}`}>
          <a className='mx-1'>
            <h2 className='text-sm md:text-md lg:text-lg font-normal text-gray-700 my-1 md:my-1 hover:text-blue-500'>
              {title}
            </h2>
          </a>
        </Link>
      </div>
    </div>
  )
}
