import React from "react";

import Layout from "../../components/layout/layout";
import Container from "../../components/layout/container";
import PageHeader from "../../components/layout/page-header";
import ChangePasswordForm from "../../components/user/change-password";
import Breadcrumb from "../../components/ui/breadcrumb";

import { useSession, getSession } from "next-auth/client";
import axios from "axios";

const ChangePassword = () => {
  const breadcrumbs = [
    { url: "/", name: "Home" },
    {
      url: `/member/profile/`,
      name: `My Profile`,
    },
    { url: "/member/change-password", name: "Change Password", last: true },
  ];

  async function changePasswordHandler(passwordData) {
    // const response = await fetch('/api/user/change-password', {
    //   method: 'PATCH',
    //   body: JSON.stringify(passwordData),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // })
    // const data = await response.json()
    //console.log(`data`, data)
    console.log("change pass start");

    // check  login

    const response = await axios.post("/api/user/change-password", {
      oldPassword: passwordData.oldPassword,
      newPassword: passwordData.newPassword,
    });

    console.log(`response`, response);

    return response;
  }

  return (
    <Layout>
      <Container className="pl-2">
        <Breadcrumb breadcrumbs={breadcrumbs} />
      </Container>
      <Container>
        <ChangePasswordForm onChangePassword={changePasswordHandler} />
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
    props: { session },
  };
}

export default ChangePassword;
