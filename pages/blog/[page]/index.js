import React from 'react'
import axios from 'axios'
import { PAGE_SIZE } from '../../../lib/constants'
import Container from '../../../components/layout/container'
import Layout from '../../../components/layout/layout'
import PageHeader from '../../../components/layout/page-header'
import Breadcrumb from '../../../components/ui/breadcrumb'
import List from '../../../components/post/list'

const BlogPage = ({ posts, lastPage, pageNumber }) => {
  const breadcrumbs = [
    { url: '/', name: 'Home' },
    {
      url: `/blog`,
      name: `Blog`,
      last: true,
    },
  ]

  return (
    <Layout>
      <Container>
        <Breadcrumb breadcrumbs={breadcrumbs} />
      </Container>
      <Container>
        <PageHeader title='Under Microscope Blog' />
      </Container>
      <Container>
        <List posts={posts} pageNumber={pageNumber} lastPage={lastPage} />
      </Container>
    </Layout>
  )
}

/**
 * * pathleri oluştur
 * ! tüm post sayısını öğren
 * ! kaç sayfa yaptığını hesapla
 * ! blog/1, blog/2... pathlerini oluştur
 */

export async function getStaticPaths() {
  const result = await axios.get(`${process.env.API_URL}/blog-posts/count`)
  const count = +result.data
  const lastPage = Math.ceil(count / PAGE_SIZE)

  let paths = []

  for (let i = 0; i < lastPage; i++) {
    const pageNumber = i + 1
    paths.push({
      params: {
        page: `${pageNumber}`,
      },
    })
  }

  return {
    paths,
    fallback: false,
  }
}

// TODO: hangi sayfada başladığını öğren
// TODO: başlantıç satırını hesapla
// TODO: başlangıç, limit kadar kaydı getir

/**
 * * Get Paginated Posts
 *
 * @param {string} page
 * @returns paginatedPosts
 */
export async function getStaticProps({ params }) {
  const { page } = params

  const pageNumber = page === null ? 1 : +page
  const startRow = pageNumber == 1 ? 0 : (pageNumber - 1) * PAGE_SIZE

  console.log(`startRow`, startRow)

  // LastPage
  const countResult = await axios.get(`${process.env.API_URL}/blog-posts/count`)
  const count = +countResult.data
  const lastPage = Math.ceil(count / PAGE_SIZE)

  const result = await axios.get(
    `${process.env.API_URL}/blog-posts?_start=${startRow}&_limit=${PAGE_SIZE}`
  )
  if (result.error) {
    console.log('Error:', result.error)
  }

  const posts = result.data

  return {
    props: {
      posts,
      pageNumber: +pageNumber,
      lastPage,
    },

    revalidate: 10,
  }
}

export default BlogPage
