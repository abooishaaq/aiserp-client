import { Container } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { useFetch } from "../../../lib/fetch";
import { useEffect } from "react";
import Link from "next/link";
import AdminDashContainer from "../../../components/dash/AdminDash";
import Head from "next/head";

const Subject = () => {
  const router = useRouter();
  let { name } = router.query;
  const { data, status } = useFetch(
    `/api/get/subject-teachers/${
      typeof name === "string" ? name.toUpperCase() : ""
    }`
  );
  const [teachers, setTeachers] = useState<any[]>([]);

  useEffect(() => {
    if (data?.teachers) {
      setTeachers(data.teachers);
    }
  }, [data]);

  if (status === 400) {
    return (
      <AdminDashContainer>
        <Container maxWidth="md">
          <p>nonexistent subject</p>
        </Container>
      </AdminDashContainer>
    );
  }

  let title = `Subject | ${name}`;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <AdminDashContainer>
        <Container maxWidth="md">
          <h1>{name}</h1>
          <h2>Teachers</h2>
          <ul>
            {teachers.map((teacher) => (
              <li key={teacher.id}>
                <Link
                  href={{
                    pathname: "/admin/teachers/[id]",
                    query: { id: teacher.id },
                  }}
                >
                  <a>{teacher.user.name}</a>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </AdminDashContainer>
    </>
  );
};

export default Subject;
