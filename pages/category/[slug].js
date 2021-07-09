import React from 'react'
import { NextSeo } from 'next-seo'
import Container from '../../components/layout/container'
import Layout from '../../components/layout/layout'
import PageHeader from '../../components/layout/page-header'
import Breadcrumb from '../../components/ui/breadcrumb'
import {
  getCategory,
  getSubCategories,
  getCategoryCollections,
  getCategoryCollectionCount,
} from '../../lib/mongodb/category'
import PhotoCard from '../../components/photos/photo-card'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useEffect, useState } from 'react'
import axios from 'axios'

const CategoryPage = ({
  category,
  subCategories,
  firstPageCollections,
  collectionCount,
}) => {
  const [collections, setCollections] = useState(firstPageCollections)
  const [hasMore, setHasMore] = useState(true)
  console.log(`collectionCount`, collectionCount)
  const getMoreCollection = async () => {
    const response = await axios.get(
      `/api/category/collection?slug=${category.slug}&skip=${collections.length}`
    )
    console.log(`response`, response)
    const moreCollections = response.data
    setCollections((collections) => [...collections, ...moreCollections])
  }

  useEffect(() => {
    setHasMore(collectionCount > collections.length ? true : false)
  }, [collections])

  // console.log(`collections`, collections)
  // console.log(`category`, category)
  // console.log(`subCategories`, subCategories)
  const breadcrumbs = [
    { url: '/', name: 'Home' },
    {
      url: `/category`,
      name: `Collections`,
    },
    {
      url: `/category/${category.slug}`,
      name: category.name,
      last: true,
    },
  ]

  return (
    <Layout>
      <NextSeo
        title='Category collections'
        description='category collections.'
      />
      <Container className='pl-2'>
        <Breadcrumb breadcrumbs={breadcrumbs} />
      </Container>
      <PageHeader title={`${category.name} Collections`} />

      {subCategories.length > 0 && (
        <Container>
          <div className='w-full text-center text-xl'>
            <h2>Categories</h2>
          </div>
          <div className='grid grid-cols-2 gap-4 px-1 py-2'>
            {subCategories.map((data) => (
              <PhotoCard data={data} key={data.url} />
            ))}
          </div>
        </Container>
      )}

      <Container>
        <InfiniteScroll
          dataLength={collections.length}
          hasMore={hasMore}
          next={getMoreCollection}
          loader={<h4>Loading...</h4>}
          endMessage={<p className='text-center'>You have seen it all!</p>}
        >
          <div className='grid grid-cols-2 gap-4 px-1 py-2'>
            {collections.map((data) => (
              <PhotoCard data={data} key={data.url} />
            ))}
          </div>
        </InfiniteScroll>
      </Container>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const { slug } = context.query

  const firstPageCollections = await getCategoryCollections(slug, 4)
  const category = await getCategory(slug)
  const subCategories = await getSubCategories(slug)
  const collectionCount = await getCategoryCollectionCount(slug)
  return {
    props: {
      firstPageCollections,
      category,
      subCategories,
      collectionCount,
    },
  }
}

export default CategoryPage
