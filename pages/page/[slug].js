import remark from "remark";
import html from "remark-html";
import Container from "../../components/layout/container";
import Layout from "../../components/layout/layout";
import PageHeader from "../../components/layout/page-header";

function Page({ page }) {
  const { title, content, slug } = page;
  return (
    <Layout>
      <PageHeader title={title} />

      <Container>
        <div
          className="prose prose-lg"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </Container>
    </Layout>
  );
}

export async function getStaticPaths() {
  const { API_URL } = process.env;
  const res = await fetch(`${API_URL}/pages`);
  const data = await res.json();
  const paths = data.map((page) => {
    return {
      params: {
        slug: page.slug,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps({ params }) {
  const { slug } = params;
  const { API_URL } = process.env;
  const res = await fetch(`${API_URL}/pages?slug=${slug}`);
  const data = await res.json();
  const processedContent = await remark().use(html).process(data[0].content);
  const contentHtml = processedContent.toString();

  const page = {
    ...data[0],
    content: contentHtml,
  };
  return {
    props: {
      page: page,
    },
    revalidate: 10,
  };
}

export default Page;
