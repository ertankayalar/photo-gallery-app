import React from 'react'
import Layout from '../../components/layout/layout'
import Container from '../../components/layout/container'

function Upload({ photos, authData }) {
  console.log(photos, authData)
  return (
    <Layout>
      <Container>
        <h1>Member Photos Upload Page</h1>
      </Container>
    </Layout>
  )
}

export async function getServerSideProps() {
  const { API_URL } = process.env

  const loginInfo = {
    identifier: 'deneme@gmail.com',
    password: 'deneme-123',
  }

  const login = await fetch(`${API_URL}/auth/local`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginInfo),
  })

  const loginRes = await login.json()

  const res = await fetch(`${API_URL}/photos`, {
    headers: {
      Authorization: `Bearer ${loginRes.jwt}`,
    },
  })

  const photos = await res.json()

  return {
    props: {
      photos: photos,
      authData: loginRes,
    },
  }
}

export default Upload
