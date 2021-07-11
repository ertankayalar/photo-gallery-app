import React from 'react'
import axios from 'axios'
import Link from 'next/link'
import { getSession } from 'next-auth/client'
import Layout from '../../components/layout/layout'
import Container from '../../components/layout/container'
import PageHeader from '../../components/layout/page-header'
import CollectionList from '../../components/user/collection/list'
import Breadcrumb from '../../components/ui/breadcrumb'

function MyCollections({ collections }) {
  const breadcrumbs = [
    { url: '/', name: 'Home' },
    {
      url: `/member/collections/`,
      name: `My Collections`,
      last: true,
    },
  ]
  return (
    <Layout>
      <Container className='pl-2'>
        <Breadcrumb breadcrumbs={breadcrumbs} />
      </Container>
      <PageHeader title='My Collections' />

      <Container className='flex items-center justify-center w-full '>
        <Link href='/member/collection/add'>
          <a className='px-4 py-3 my-5 text-white bg-gray-700 rounded hover:bg-gray-600 focus:bg-gray-800 focus:outline-none'>
            New Collection
          </a>
        </Link>
      </Container>
      <Container className='py-10'>
        <CollectionList collections={collections} />
      </Container>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req })
  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    }
  }

  const result = await axios.get(
    `${process.env.API_URL}/collections?user=${session.user.id}`,
    {
      headers: { Authorization: `Bearer ${session.jwt}` },
    }
  )

  if (result.error) {
    console.log('Error:', result.error)
  }

  const collections = result.data

  return {
    props: { session, collections },
  }
}

export default MyCollections
