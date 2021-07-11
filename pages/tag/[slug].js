import React from "react";
import {
  getTag,
  getTagCollections,
  getTagCollectionsCount,
} from "../../lib/mongodb/tags";
import { NextSeo } from "next-seo";
import Container from "../../components/layout/container";
import Layout from "../../components/layout/layout";
import PageHeader from "../../components/layout/page-header";
import Breadcrumb from "../../components/ui/breadcrumb";
import PhotoCard from "../../components/photos/photo-card";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import axios from "axios";
const Tag = ({ firstPageCollections, tag, collectionCount }) => {
  const [collections, setCollections] = useState(firstPageCollections);
  const [hasMore, setHasMore] = useState(true);
  console.log(`collectionCount`, collectionCount);

  const getMoreCollection = async () => {
    const response = await axios.get(
      `/api/tag/collection?slug=${tag.slug}&skip=${collections.length}`
    );
    console.log(`response`, response);
    const moreCollections = response.data;
    setCollections((collections) => [...collections, ...moreCollections]);
  };

  useEffect(() => {
    setHasMore(collectionCount > collections.length ? true : false);
  }, [collections]);

  const breadcrumbs = [
    { url: "/", name: "Home" },
    {
      url: `/category`,
      name: `Collections`,
    },
    {
      url: `/tag/${tag.slug}`,
      name: tag.name,
      last: true,
    },
  ];

  return (
    <Layout>
      <NextSeo
        title={`${tag.name} collections`}
        description={`${tag.name} collections`}
      />
      <Container className="pl-2">
        <Breadcrumb breadcrumbs={breadcrumbs} />
      </Container>

      <PageHeader title={`${tag.name} Collections`} />

      <Container>
        <InfiniteScroll
          dataLength={collections.length}
          hasMore={hasMore}
          next={getMoreCollection}
          loader={<h4>Loading...</h4>}
          endMessage={<p className="text-center">You have seen it all!</p>}
        >
          <div className="grid grid-cols-2 gap-4 px-1 py-2">
            {collections.map((data) => (
              <PhotoCard data={data} key={data.url} />
            ))}
          </div>
        </InfiniteScroll>
      </Container>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { slug } = context.query;

  const firstPageCollections = await getTagCollections(slug, 4);
  const collectionCount = await getTagCollectionsCount(slug);
  const tag = await getTag(slug);

  return {
    props: {
      firstPageCollections,
      tag,
      collectionCount,
    },
  };
}

export default Tag;
