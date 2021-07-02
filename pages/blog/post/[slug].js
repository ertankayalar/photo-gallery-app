import React from 'react'
import axios from 'axios'
import remark from 'remark'
import html from 'remark-html'
import Container from '../../../components/layout/container'
import Layout from '../../../components/layout/layout'
import PageHeader from '../../../components/layout/page-header'
import PostHeader from '../../../components/post/post-header'
import Breadcrumb from '../../../components/ui/breadcrumb'

function Post({ post, contentHtml }) {
  console.log(`post`, post)
  console.log(`contentHtml`, contentHtml)
  const { title, excerpt, content, blog_categories } = post

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
        <PostHeader post={post} />
      </Container>

      <Container>
        <div
          className='prose prose-sm md:prose-md w-full md:max-w-3xl mx-auto my-5'
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        ></div>
      </Container>
    </Layout>
  )
}

export async function getStaticPaths() {
  const result = await axios.get(`${process.env.API_URL}/blog-posts`)
  if (result.error) {
    console.log('Error:', result.error)
  }

  console.log(`result.data`, result.data)

  const paths = result.data.map((post) => {
    return {
      params: {
        slug: post.slug,
      },
    }
  })
  // const { API_URL } = process.env
  // const res = await fetch(`${API_URL}/pages`)
  // const data = await res.json()
  // const paths = data.map((page) => {
  //   return {
  //     params: {
  //       slug: page.slug,
  //     },
  //   }
  // })

  console.log(`paths`, paths)
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const { slug } = params

  const result = await axios.get(
    `${process.env.API_URL}/blog-posts?slug=${slug}`
  )

  if (result.error) {
    console.log('Error:', result.error)
  }

  const postData = result.data

  const processedContent = await remark().use(html).process(postData[0].content)
  const contentHtml = processedContent.toString()

  console.log(`postData`, postData[0])
  return {
    props: { post: postData[0], contentHtml },
    revalidate: 10,
  }
}

export default Post
