import React from 'react'
import AuthLayout from '../../components/user/auth-layout'
import Container from '../../components/layout/container'
import PageHeader from '../../components/layout/page-header'
import { useSession, getSession } from 'next-auth/client'

function MyCollections({ photos, session, req }) {
  console.log(photos)
  console.log(`session==>`, session)

  // async function getTest(req) {
  //   const secret = process.env.JWT_SECRET
  //   const token = await jwt.getToken({ req, secret })
  //   if (token) {
  //     // Signed in
  //     console.log('JSON Web Token', JSON.stringify(token, null, 2))
  //   } else {
  //     // Not Signed in
  //     res.status(401)
  //   }
  // }
  //  getTest()

  return (
    <AuthLayout>
      <PageHeader title='My Collections' />
      <Container>user collections</Container>
    </AuthLayout>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req })
  console.log(`session server side`, session)
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  // get token

  return {
    props: { session },
  }
}

export default MyCollections
