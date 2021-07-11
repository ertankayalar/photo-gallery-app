import React from "react";

import Layout from "../../components/layout/layout";
import Container from "../../components/layout/container";
import PageHeader from "../../components/layout/page-header";
import Breadcrumb from "../../components/ui/breadcrumb";

import { useSession, getSession } from "next-auth/client";
import Link from "next/link";
import ProfileForm from "../../components/user/profile-form";
import axios from "axios";

const Profile = ({ session, userData }) => {
  const breadcrumbs = [
    { url: "/", name: "Home" },
    {
      url: `/member/profile/`,
      name: `My Profile`,
      last: true,
    },
  ];

  return (
    <Layout>
      <Container className="pl-2">
        <Breadcrumb breadcrumbs={breadcrumbs} />
      </Container>
      <PageHeader title="Your Profile" />
      <Container>
        <div className="w-full text-center">
          <Link href="/member/change-password">
            <a>Change Password</a>
          </Link>
        </div>
        <ProfileForm userProfile={userData} />
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
  const userId = session.user.id;
  console.log(`userId`, userId);
  const result = await axios.get(
    `${API_URL}/users/${userId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${session.jwt}`,
      },
    }
  );

  console.log(`result.data`, result.data);
  // get collection data
  if (result.error) {
    console.log(`Error:`, result.error);
    return;
  }

  return {
    props: { session, userData: result.data },
  };
}

export default Profile;
