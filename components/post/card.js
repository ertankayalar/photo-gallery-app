import Link from "next/link";
import Image from "next/image";

export default function Card({ post }) {
  const { slug, title, coverimage } = post;
  const coverImageUrl = coverimage?.formats?.large?.url;

  return (
    <div key={slug} className="m-0 md:mx-2 md:my-2 ">
      <div className="flex items-center justify-center w-full text-gray-400 md:text-sm ">
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
      <div className="flex justify-center w-full text-center md:justify-start md:items-start">
        <Link href={`/blog/post/${slug}`}>
          <a className="mx-1">
            <h2 className="my-1 text-sm font-normal text-gray-700 md:text-md lg:text-lg md:my-1 hover:text-blue-500">
              {title}
            </h2>
          </a>
        </Link>
      </div>
    </div>
  );
}
