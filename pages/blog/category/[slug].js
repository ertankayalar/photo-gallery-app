import React from "react";
import axios from "axios";
import Container from "../../../components/layout/container";
import Layout from "../../../components/layout/layout";
import PageHeader from "../../../components/layout/page-header";
import Breadcrumb from "../../../components/ui/breadcrumb";
import List from "../../../components/post/list";

const BlogCategory = ({ category, lastPage }) => {
  const breadcrumbs = [
    { url: "/", name: "Home" },
    {
      url: `/blog`,
      name: `Blog`,
      last: true,
    },
  ];
  const { blog_posts } = category;

  return (
    <Layout>
      <Container>
        <Breadcrumb breadcrumbs={breadcrumbs} />
      </Container>
      <Container>
        <PageHeader title={category.name} description={category.description} />
      </Container>
      <Container>
        <List
          categorySlug={category.slug}
          posts={category.blog_posts}
          lastPage={lastPage}
        />
      </Container>
    </Layout>
  );
};

export async function getStaticPaths() {
  const result = await axios.get(`${process.env.API_URL}/blog-categories`);
  if (result.error) {
    console.log("Error:", result.error);
  }

  console.log(`result.data`, result.data);

  const paths = result.data.map((category) => {
    return {
      params: {
        slug: category.slug,
      },
    };
  });

  console.log(`paths`, paths);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;

  const result = await axios.get(
    `${process.env.API_URL}/blog-categories?slug=${slug}`
  );
  if (result.error) {
    console.log("Error:", result.error);
  }

  const postData = result.data;

  return {
    props: { category: postData[0], lastPage: 10 },
    revalidate: 10,
  };
}

export default BlogCategory;
