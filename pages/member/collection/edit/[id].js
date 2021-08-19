import React from "react";
import * as utils from "../../../../lib/utils";
import { getAllPublishedTags } from "../../../../lib/mongodb/tags";
import { buildTagOptions } from "../../../../lib/tag-utils";
import { buildCategoryTreeArray } from "../../../../lib/mongodb/category";
import Layout from "../../../../components/layout/layout";
import Container from "../../../../components/layout/container";
import UserCollectionForm from "../../../../components/user/collection/form";
import { useSession, getSession } from "next-auth/client";
import axios from "axios";
import Breadcrumb from "../../../../components/ui/breadcrumb";

/**
 * Collection Edit
 *
 */

const EditCollection = ({ collection, categoryOptions, tagOptions }) => {
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
          categoryOptions={categoryOptions}
          tagOptions={tagOptions}
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
  const categoryOptions = await buildCategoryTreeArray(result.data.category);
  // get tags and convert to react select
  const publishedTags = await getAllPublishedTags();
  const tagOptions = buildTagOptions(publishedTags);

  utils.showData("publishedTags:", publishedTags);
  utils.showData("tagOptions:", tagOptions);

  // const tags = tagsList.map((tag) => {
  //   return {
  //     label: tag.label,
  //     value: tag.value.toString(),
  //   };
  // });

  utils.showError(result);

  const collection = {
    ...result.data,
    // tags: setTagIds(result.data.tags),
  };

  utils.showData("collection:", collection);

  return {
    props: {
      collection,
      categoryOptions,
      tagOptions,
    },
  };
}

export default EditCollection;
