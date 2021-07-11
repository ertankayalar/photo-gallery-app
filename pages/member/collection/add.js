import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { getSession } from "next-auth/client";
import Layout from "../../../components/layout/layout";
import Container from "../../../components/layout/container";
import UserCollectionForm from "../../../components/user/collection/form";
import Breadcrumb from "../../../components/ui/breadcrumb";

const AddCollection = ({ session, api_url }) => {
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
        <UserCollectionForm onSubmit={addCollectionHandler} />
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

  return {
    props: { session, api_url: process.env.API_URL },
  };
}

export default AddCollection;
