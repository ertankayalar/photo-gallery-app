import { useRouter } from 'next/router'
import { getSession } from 'next-auth/client'
import { useEffect, useState } from 'react'
import Layout from '../components/layout/layout'
import Container from '../components/layout/container'
import PageHeader from '../components/layout/page-header'
import AuthForm from '../components/user/auth-form'
import Loader from '../components/ui/loader'

function AuthPage() {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace('/')
      } else {
        setIsLoading(false)
      }
    })
  }, [router])
  if (isLoading) {
    return <Loader />
  }

  return (
    <Layout>
      <Container>
        <AuthForm />
      </Container>
    </Layout>
  )
}

export default AuthPage
