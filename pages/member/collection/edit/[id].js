import React, { useState, useEffect, useContext } from 'react'
import Layout from '../../../../components/layout/layout'
import Container from '../../../../components/layout/container'
import UserCollectionForm from '../../../../components/user/user-collection-form'
import { useSession, getSession } from 'next-auth/client'
import axios from 'axios'
import Router from 'next/router'

const EditCollection = ({ collection }) => {
  async function editConnectionHandler(data) {
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
      <Container>
        <UserCollectionForm
          collection={collection}
          onSubmit={editConnectionHandler}
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
        destination: '/login',
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
