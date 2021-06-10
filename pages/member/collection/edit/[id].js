import React from 'react'
import Layout from '../../../../components/layout/layout'
import Container from '../../../../components/layout/container'
import UserCollectionForm from '../../../../components/user/collection/form'
import { useSession, getSession } from 'next-auth/client'
import axios from 'axios'
import Router from 'next/router'
import Breadcrumb from '../../../../components/ui/breadcrumb'

/**
 * Collection Edit
 *
 */

const EditCollection = ({ collection }) => {
  const breadcrumbs = [
    { url: '/', name: 'Home' },
    {
      url: `/member/collections/`,
      name: `My Collections`,
    },
    {
      url: `/member/collection/${collection.id}`,
      name: collection.name,
      last: true,
    },
  ]

  async function editCollectionHandler(data) {
    // sent data collection to api/collection/update
    // const result = await axios.post('/api/collection/edit', { })

    const result = await axios.post('/api/collection/update', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return result

    // if (result.status == 200) {
    //   Router.push(`/member/collection/${result.data.data.id}`)
    // }
  }

  return (
    <Layout>
      <Container className='pl-2'>
        <Breadcrumb breadcrumbs={breadcrumbs} />
      </Container>
      <Container>
        <UserCollectionForm
          collection={collection}
          onSubmit={editCollectionHandler}
        />
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

  const { API_URL } = process.env
  const { id } = context.query
  const userId = session.user.id

  const result = await axios.get(
    `${API_URL}/collections/${id}?user=${userId}`,
    {
      headers: {
        Authorization: `Bearer ${session.jwt}`,
      },
    }
  )

  // get collection data
  if (result.error) {
    console.log(`Error:`, result.error)
  }

  return {
    props: {
      collection: result.data,
    },
  }
}

export default EditCollection
