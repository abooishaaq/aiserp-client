import Head from "next/head";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Container } from "@mui/material";
import AdminDashContainer from "../../../components/dash/AdminDash";

const ViewUsers = dynamic(() => import("../../../components/users/ViewUsers"), {
  suspense: true,
});

const Users = () => {
  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
      <AdminDashContainer>
        <Container maxWidth="md">
          <h1>Users</h1>
          <Suspense>
            <ViewUsers />
          </Suspense>
        </Container>
      </AdminDashContainer>
    </>
  );
};

export default Users;
