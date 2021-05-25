import React from 'react'
import Layout from '../../components/layout/layout'
import { useSession, getSession } from 'next-auth/client'

const AuthLayout = ({ children }) => {
  return <Layout>{children}</Layout>
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
    props: { session },
  }
}
export default AuthLayout
