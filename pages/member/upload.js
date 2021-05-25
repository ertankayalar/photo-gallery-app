import React from 'react'
import Layout from '../../components/layout/layout'
import Container from '../../components/layout/container'
import CollectionForm from '../../components/user/collection-form'
import PageHeader from '../../components/layout/page-header'
import { getSession } from 'next-auth/client'

function Upload({ photos, session }) {
  console.log(`photos`, photos)
  console.log(`session`, session)
  return (
    <Layout>
      <PageHeader title='Upload Your Collection' />
      <Container>
        <CollectionForm />
      </Container>
    </Layout>
  )
}

export async function getServerSideProps({ req }) {
  const { API_URL } = process.env

  // const loginInfo = {
  //   identifier: 'deneme@gmail.com',
  //   password: 'deneme-123',
  // }

  // const login = await fetch(`${API_URL}/auth/local`, {
  //   method: 'POST',
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(loginInfo),
  // })

  // const loginRes = await login.json()

  //  const jwt = parseCookies(ctx).jwt

  console.log('upload requst session')
  let headers = {}
  const session = await getSession({ req })
  if (session) {
    headers = { Authorization: `Bearer ${session.jwt}` }
  }
  console.log(`getSession **>`, session)

  const res = await fetch(`${API_URL}/photos`, {
    headers: headers,
  })

  // const res = await fetch(`${API_URL}/photos`, {
  //   headers: {
  //     Authorization: `Bearer ${loginRes.jwt}`,
  //   },
  // })

  //const res = await fetch(`${API_URL}/photos`)
  const photos = await res.json()

  return {
    props: {
      photos: photos,
    },
  }
}

Upload.auth = true

export default Upload
