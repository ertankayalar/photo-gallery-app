import React from "react";
import { getAllPublishedTags } from "../../../../lib/mongodb/tags";
import { buildCategoryTreeArray } from "../../../../lib/mongodb/category";
import Layout from "../../../../components/layout/layout";
import Container from "../../../../components/layout/container";
import UserCollectionForm from "../../../../components/user/collection/form";
import { useSession, getSession } from "next-auth/client";
import axios from "axios";
import Router from "next/router";
import Breadcrumb from "../../../../components/ui/breadcrumb";

/**
 * Collection Edit
 *
 */

const EditCollection = ({ collection, categories, tags }) => {
  console.log(`categories`, categories);
  const breadcrumbs = [
    { url: "/", name: "Home" },
    {
      url: `/member/collections/`,
      name: `My Collections`,
    },
    {
      url: `/member/collection/${collection.id}`,
      name: collection.name,
      last: true,
    },
  ];

  async function editCollectionHandler(data) {
    // sent data collection to api/collection/update
    // const result = await axios.post('/api/collection/edit', { })

    const result = await axios.post("/api/collection/update", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return result;

    // if (result.status == 200) {
    //   Router.push(`/member/collection/${result.data.data.id}`)
    // }
  }

  return (
    <Layout>
      <Container className="pl-2">
        <Breadcrumb breadcrumbs={breadcrumbs} />
      </Container>
      <Container>
        <UserCollectionForm
          collection={collection}
          categoryOptions={categories}
          tagOptions={tags}
          onSubmit={editCollectionHandler}
        />
      </Container>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  const { API_URL } = process.env;
  const { id } = context.query;
  const userId = session.user.id;

  const result = await axios.get(
    `${API_URL}/collections/${id}?user=${userId}`,
    {
      headers: {
        Authorization: `Bearer ${session.jwt}`,
      },
    }
  );

  // get categories
  const categories = await buildCategoryTreeArray(result.data.category);
  // get tags and convert to react select
  const tagsList = await getAllPublishedTags();
  const tags = tagsList.map((tag) => {
    return {
      label: tag.label,
      value: tag.value.toString(),
    };
  });

  if (result.error) {
    console.log(`Error:`, result.error);
  }

  const setTagIds = (tagValues) => {
    return tagValues.map((tag) => {
      return {
        value: tag._id,
        label: tag.name,
      };
    });
  };

  const collection = {
    ...result.data,
    tags: setTagIds(result.data.tags),
  };

  console.log("collection", collection);

  return {
    props: {
      collection,
      categories,
      tags,
    },
  };
}

export default EditCollection;
