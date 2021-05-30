import React, { useState, useEffect, useContext } from 'react'
import Layout from '../../../components/layout/layout'
import Container from '../../../components/layout/container'
import PageHeader from '../../../components/layout/page-header'
import CollectionForm from '../../../components/user/collection-form'
import { useSession, getSession } from 'next-auth/client'

const AddCollection = ({ session, api_url }) => {
  return (
    <Layout>
      <Container>
        <CollectionForm session={session} api_url={api_url} />
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
