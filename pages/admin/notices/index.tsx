import { Container } from "@mui/material";
import Head from "next/head";
import AdminDashContainer from "../../../components/dash/AdminDash";

const Notices = () => {
  return (
    <>
      <Head>
        <title>Notices</title>
      </Head>
      <AdminDashContainer>
        <Container maxWidth="md">
          <h1>Notices</h1>
        </Container>
      </AdminDashContainer>
    </>
  );
};

export default Notices;
