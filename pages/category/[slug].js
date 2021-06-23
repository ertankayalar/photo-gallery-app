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
} from '../../lib/mongodb/category'
import PhotoCard from '../../components/photos/photo-card'

const CategoryPage = ({ category, subCategories, collections }) => {
  console.log(`collections`, collections)
  console.log(`category`, category)
  console.log(`subCategories`, subCategories)
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
              <PhotoCard data={data} />
            ))}
          </div>
        </Container>
      )}

      <Container>
        <div className='grid grid-cols-2 gap-4 px-1 py-2'>
          {collections.map((data) => (
            <PhotoCard data={data} />
          ))}
        </div>
      </Container>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const { slug } = context.query
  console.log(`slug`, slug)
  const collections = await getCategoryCollections(slug)
  const category = await getCategory(slug)
  const subCategories = await getSubCategories(slug)
  return {
    props: {
      collections,
      category,
      subCategories,
    },
  }
}

export default CategoryPage
