import React from 'react'

import Layout from '../../components/layout/layout'
import Container from '../../components/layout/container'
import PageHeader from '../../components/layout/page-header'
// import ChangePasswordForm from '../../components/user/change-password-form'
import Breadcrumb from '../../components/ui/breadcrumb'

import { useSession, getSession } from 'next-auth/client'
const breadcrumbs = [
  { url: '/', name: 'Home' },
  {
    url: `/member/profile/`,
    name: `My Profile`,
    last: true,
  },
]
const Profile = () => {
  return (
    <Layout>
      <Container className='pl-2'>
        <Breadcrumb breadcrumbs={breadcrumbs} />
      </Container>
      <PageHeader title='Your Profile' />
      <Container>{/* <ChangePasswordForm /> */}</Container>
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
    props: { session },
  }
}

export default Profile
