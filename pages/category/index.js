import React from 'react'
import { NextSeo } from 'next-seo'
import Container from '../../components/layout/container'
import Layout from '../../components/layout/layout'
import PageHeader from '../../components/layout/page-header'
import Breadcrumb from '../../components/ui/breadcrumb'
import { getTopCategories } from '../../lib/mongodb/category'
import PhotoCard from '../../components/photos/photo-card'

const CategoryHomePage = ({ topCategories }) => {
  console.log(`topCategories`, topCategories)
  const breadcrumbs = [
    { url: '/', name: 'Home' },
    {
      url: `/category/`,
      name: `Categories`,
      last: true,
    },
  ]

  return (
    <Layout>
      <NextSeo
        title='Collection Categories'
        description='Collection categories.'
      />
      <Container className='pl-2'>
        <Breadcrumb breadcrumbs={breadcrumbs} />
      </Container>
      <PageHeader title='Collections' />

      <Container>
        <div className='grid grid-cols-2 gap-4 px-1 py-2'>
          {topCategories.map((data) => (
            <PhotoCard data={data} />
          ))}
        </div>
      </Container>
    </Layout>
  )
}

export async function getServerSideProps() {
  const topCategories = await getTopCategories()
  return {
    props: {
      topCategories: topCategories,
    },
  }
}

export default CategoryHomePage
