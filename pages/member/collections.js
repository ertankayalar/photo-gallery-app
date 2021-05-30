import React from 'react'
import Layout from '../../components/layout/layout'
import Container from '../../components/layout/container'
import PageHeader from '../../components/layout/page-header'
import CollectionList from '../../components/user/user-collection-list'
import { useSession, getSession } from 'next-auth/client'
import axios from 'axios'
import Link from 'next/link'

function MyCollections({ collections, session, req }) {
  console.log('collections', collections)
  console.log('session', session)

  return (
    <Layout>
      <PageHeader title='My Collections' />
      <Container className='w-full flex items-center justify-center  '>
        <Link href='/member/collection/add'>
          <a className='bg-gray-700 text-white py-3 px-4 my-5 rounded hover:bg-gray-600  focus:bg-gray-800 focus:outline-none'>
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
        destination: '/login',
        permanent: false,
      },
    }
  }

  let headers = {}
  //const session = await getSession({ req })
  if (session) {
    headers = { Authorization: `Bearer ${session.jwt}` }
  }
  const resUserCollections = await axios.get(
    `${process.env.API_URL}/collections?user=${session.user.id}`
  )

  if (resUserCollections.error) {
    console.log('Error:', resUserCollections.error)
  }

  const collections = resUserCollections.data

  return {
    props: { session, collections },
  }
}

export default MyCollections
