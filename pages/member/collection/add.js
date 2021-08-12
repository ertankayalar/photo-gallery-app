import React, { useState, useEffect, useContext } from "react";
import * as utils from "../../../lib/utils";
import axios from "axios";
import { getSession } from "next-auth/client";
import { getAllPublishedTags } from "../../../lib/mongodb/tags";
import { buildCategoryTreeArray } from "../../../lib/mongodb/category";
import { buildTagOptions } from "../../../lib/tag-utils";
import Layout from "../../../components/layout/layout";
import Container from "../../../components/layout/container";
import UserCollectionForm from "../../../components/user/collection/form";
import Breadcrumb from "../../../components/ui/breadcrumb";

const AddCollection = ({ session, api_url, categoryOptions, tagOptions }) => {
  utils.showData(`categoryOptions:`, categoryOptions);
  utils.showData(`tagOptions`, tagOptions);

  const breadcrumbs = [
    { url: "/", name: "Home" },
    {
      url: `/member/collections/`,
      name: `My Collections`,
    },
    { url: "/member/collections/add", name: "Add", last: true },
  ];

  async function addCollectionHandler(data) {
    console.log(`data`, data);
    const result = await axios.post("/api/collection/add", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return result;
  }

  return (
    <Layout>
      <Container className="pl-2">
        <Breadcrumb breadcrumbs={breadcrumbs} />
      </Container>
      <Container>
        <UserCollectionForm
          onSubmit={addCollectionHandler}
          categoryOptions={categoryOptions}
          tagOptions={tagOptions}
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

  // get categories
  const categoryOptions = await buildCategoryTreeArray();
  // get tags and convert to react select
  const publishedTags = await getAllPublishedTags();
  const tagOptions = buildTagOptions(publishedTags);

  return {
    props: {
      session,
      api_url: process.env.API_URL,
      categoryOptions,
      tagOptions,
    },
  };
}

export default AddCollection;
