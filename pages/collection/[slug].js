import Container from "../../components/layout/container";
import Layout from "../../components/layout/layout";
import PageHeader from "../../components/layout/page-header";
import PhotoDetailCard from "../../components/photos/photo-detail-card";
import Breadcrumb from "../../components/ui/breadcrumb";
import Link from "next/link";

import {
  getCollection,
  getCollectionPhotos,
  getAllPublishedCollections,
} from "../../lib/mongodb/photo";

function CollectionPage({ collection, collectionPhotos }) {
  const { name, description, user, tags, category } = collection;
  const breadcrumbs = [
    { url: "/", name: "Home" },
    {
      url: `/category`,
      name: `Collections`,
    },
    { url: `/collection/${collection.slug}`, name: name, last: true },
  ];
  return (
    <Layout>
      <Container className="pl-2">
        <Breadcrumb breadcrumbs={breadcrumbs} />
      </Container>
      <PageHeader title={name} description={description} />

      <Container>
        <div className="flex items-center justify-center my-2 text-xs text-gray-500 md:text-sm">
          <span className="pl-5 mr-5">
            {category && category.length > 0 && (
              <Link href={`/category/${category[0].slug}`}>
                <a>{category[0].name}</a>
              </Link>
            )}
          </span>
          <span className="pl-5 text-xs font-semibold border-l  md:text-md">
            {tags.map((tag) => (
              <Link href={`/tag/${tag.slug}`} key={tag.slug}>
                <a className="px-3 py-2 mr-3 border rounded-sm shadow-sm hover:underline bg-gray-50">
                  {tag.name}
                </a>
              </Link>
            ))}
          </span>
        </div>
      </Container>

      <Container>
        <div className="grid w-full grid-cols-3 gap-3">
          {collectionPhotos.map((photo, index) => (
            <PhotoDetailCard
              photo={photo}
              user={user[0]}
              photos={collectionPhotos}
              count={index}
              key={index}
            />
          ))}
        </div>
      </Container>
    </Layout>
  );
}

export async function getStaticPaths() {
  // const { API_URL } = process.env
  // const res = await fetch(`${API_URL}/collections`)
  // const data = await res.json()

  const collections = await getAllPublishedCollections();

  const paths = collections.map((collection) => {
    return {
      params: {
        slug: collection.slug,
      },
    };
  });

  console.log(paths);

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const { API_URL } = process.env;
  // const res = await fetch(`${API_URL}/collections?slug=${slug}`)
  // const data = await res.json()

  const collection = await getCollection(slug);
  const collectionPhotos = await getCollectionPhotos(slug);

  return {
    props: {
      //collection: data[0],
      collection,
      collectionPhotos,
    },
    revalidate: 10,
  };
}

export default CollectionPage;
