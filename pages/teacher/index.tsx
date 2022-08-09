import { Container } from "@mui/system";
import { useAppSelector } from "../../lib/redux/hooks";
import AuthTeacher from "../../components/auth/AuthTeacher";
import Head from "next/head";

const Teacher = () => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <>
      <Head>
        <title>Teacher Dashboard</title>
      </Head>
      <AuthTeacher>
        <Container maxWidth="md">
          <h1>Welcome {user.name}</h1>
        </Container>
      </AuthTeacher>
    </>
  );
};

export default Teacher;
