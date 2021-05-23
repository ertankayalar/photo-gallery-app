import React from 'react'
import Layout from '../components/layout/layout'
import Container from '../components/layout/container'
import PageHeader from '../components/layout/page-header'
import AuthForm from '../components/user/auth-form'

function LoginPage() {
  return (
    <Layout>
      <Container>
        <AuthForm />
      </Container>
    </Layout>
  )
}

export default LoginPage
