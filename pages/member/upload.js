import React from 'react'
import Layout from '../../components/layout/layout'
import Container from '../../components/layout/container'
import { parseCookies } from 'nookies'
import CollectionForm from '../../components/user/collection-form'

function Upload({ photos }) {
  console.log(photos)
  return (
    <Layout>
      <Container>
        <div>
          <CollectionForm />
        </div>
      </Container>
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
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

  const jwt = parseCookies(ctx).jwt

  const res = await fetch(`${API_URL}/photos`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })

  // const res = await fetch(`${API_URL}/photos`, {
  //   headers: {
  //     Authorization: `Bearer ${loginRes.jwt}`,
  //   },
  // })

  const photos = await res.json()

  return {
    props: {
      photos: photos,
    },
  }
}

export default Upload
