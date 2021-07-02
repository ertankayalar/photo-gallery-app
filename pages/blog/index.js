import React from 'react'
import axios from 'axios'

import Container from '../../components/layout/container'
import Layout from '../../components/layout/layout'
import PageHeader from '../../components/layout/page-header'
import Breadcrumb from '../../components/ui/breadcrumb'
import List from '../../components/post/list'

/**
 * ! sadece blog_posts soruglanıp pagination yapılacak
 * ! blog post sayfalama için fitekrandan kopyala
 * @param {} param0
 * @returns
 */

function Blog({ posts, lastPage }) {
  const breadcrumbs = [
    { url: '/', name: 'Home' },
    {
      url: `/blog`,
      name: `Blog`,
      last: true,
    },
  ]

  console.log(`posts`, posts)
  return (
    <Layout>
      <Container>
        <Breadcrumb breadcrumbs={breadcrumbs} />
      </Container>
      <Container>
        <PageHeader title='Under Microscope Blog' />
      </Container>
      <Container>
        <List posts={posts} lastPage={lastPage} />
      </Container>
    </Layout>
  )
}

// export async function getStaticPaths() {
//   const result = await axios.get(`${process.env.API_URL}/blog-posts`)
//   if (result.error) {
//     console.log('Error:', result.error)
//   }

//   // console.log(`result.data`, result.data)

//   // const paths = result.data.map((post) => {
//   //   return {
//   //     params: {
//   //       slug: `/blog/${post.slug}`,
//   //     },
//   //   }
//   // })

//   const paths = [
//     {
//       params: { slug: '/blog/1' },
//     },
//     {
//       params: { slug: '/blog/2' },
//     },
//   ]
//   console.log(`paths`, paths)
//   return {
//     paths,
//     fallback: false,
//   }
// }

export async function getStaticProps() {
  const result = await axios.get(`${process.env.API_URL}/blog-posts`)
  if (result.error) {
    console.log('Error:', result.error)
  }

  const postData = result.data

  return {
    props: { posts: postData, lastPage: 10 },
    revalidate: 10,
  }
}

export default Blog
