import React from 'react'
import { getTag, getTagCollections } from '../../lib/mongodb/tags'
import { NextSeo } from 'next-seo'
import Container from '../../components/layout/container'
import Layout from '../../components/layout/layout'
import PageHeader from '../../components/layout/page-header'
import Breadcrumb from '../../components/ui/breadcrumb'
import PhotoCard from '../../components/photos/photo-card'

const Tag = ({ collections, tag }) => {
  const breadcrumbs = [
    { url: '/', name: 'Home' },
    {
      url: `/category`,
      name: `Collections`,
    },
    {
      url: `/tag/${tag.slug}`,
      name: tag.name,
      last: true,
    },
  ]

  return (
    <Layout>
      <NextSeo
        title={`${tag.name} collections`}
        description={`${tag.name} collections`}
      />
      <Container className='pl-2'>
        <Breadcrumb breadcrumbs={breadcrumbs} />
      </Container>

      <PageHeader title={`${tag.name} Collections`} />

      <Container>
        <div className='grid grid-cols-2 gap-4 px-1 py-2'>
          {collections.map((data) => (
            <PhotoCard data={data} key={data.url} />
          ))}
        </div>
      </Container>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const { slug } = context.query

  const collections = await getTagCollections(slug)
  const tag = await getTag(slug)

  return {
    props: {
      collections,
      tag,
    },
  }
}

export default Tag
