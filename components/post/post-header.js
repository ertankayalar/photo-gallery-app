import Link from "next/link";
import Image from "next/image";
import DateFormatter from "../ui/date-formater";

export default function PostHeader({ post }) {
  const { title, coverimage, published_at, blog_categories } = post;

  const coverImageUrl = coverimage?.formats?.large?.url;
  const coverImageWidth = coverimage?.formats?.large?.width;
  const coverImageHeight = coverimage?.formats?.large?.height;
  return (
    <header className="w-full mx-auto md:max-w-3xl">
      <h1 className="my-10 mb-3 text-3xl text-center text-gray-700 md:text-4xl font-header">
        {title}
      </h1>

      <div className="flex items-center justify-center my-5 text-xs text-gray-500 md:text-sm">
        <span className="pl-5 mr-5" itemProp="datePublished">
          <DateFormatter dateString={published_at} />
        </span>
        <span className="pl-5 text-xs font-semibold border-l  md:text-md">
          {blog_categories.map((cat) => (
            <Link href={`/blog/category/${cat.slug}/`} key={cat.slug}>
              <a className="mr-3 hover:underline">{cat.name}</a>
            </Link>
          ))}
        </span>
      </div>

      <div className="w-full mx-auto md:max-w-2xl">
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
  );
}
