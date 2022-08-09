import Head from "next/head";
import { useRouter } from "next/router";
import { Suspense, useEffect, useState } from "react";
import { Container } from "@mui/material";
import AdminDashContainer from "../../../components/dash/AdminDash";
import { gradeToRoman } from "../../../lib/grade";
import dynamic from "next/dynamic";
import { useFetch } from "../../../lib/fetch";
import Loader from "../../../components/Loader";

const ViewClassComp = dynamic(
  () => import("../../../components/classes/ViewClass"),
  {
    suspense: true,
  }
);

const ViewClass = (props: any) => (
  <Suspense>
    <ViewClassComp {...props} />
  </Suspense>
);

const Class = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useFetch(
    typeof id === "string" ? `/api/get/class-id/${id}` : ""
  );
  const [class_, setClass] = useState<any>({});

  useEffect(() => {
    if (data?.class) {
      setClass(data.class);
    }
  }, [data]);

  return (
    <>
      <Head>
        <title>
          Class {gradeToRoman(class_.grade)}-{class_.section}
        </title>
      </Head>
      <AdminDashContainer>
        <Container maxWidth="md">
          {class_.id ? <ViewClass {...class_} /> : <Loader />}
        </Container>
      </AdminDashContainer>
    </>
  );
};

export default Class;
