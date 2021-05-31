import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import Layout from '../../../components/layout/layout'
import Container from '../../../components/layout/container'
import CollectionForm from '../../../components/user/collection-form'
import UserCollectionForm from '../../../components/user/collection/form'
import { getSession } from 'next-auth/client'

const AddCollection = ({ session, api_url }) => {
  async function addCollectionHandler(data) {
    const result = await axios.post('/api/collection/add', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return result
  }

  return (
    <Layout>
      <Container>
        <UserCollectionForm onSubmit={addCollectionHandler} />
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

  return {
    props: { session, api_url: process.env.API_URL },
  }
}

export default AddCollection
