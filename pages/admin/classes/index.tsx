import { Suspense } from "react";
import { Container } from "@mui/material";
import AdminDashContainer from "../../../components/dash/AdminDash";
import Head from "next/head";
import TabsContainer from "../../../components/TabsContainer";
import Loader from "../../../components/Loader";
import dynamic from "next/dynamic";

const AddClassComp = dynamic(
  () => import("../../../components/classes/AddClass"),
  {
    suspense: true,
  }
);
const ViewClassesComp = dynamic(
  () => import("../../../components/classes/ViewClasses"),
  {
    suspense: true,
  }
);

const ViewClasses = () => {
  return (
    <>
      <h2>View Classes</h2>
      <Suspense>
        <ViewClassesComp />
      </Suspense>
      <style jsx>{`
        h2 {
          margin-bottom: 0;
        }
      `}</style>
    </>
  );
};

const AddClass = () => (
  <Suspense fallback={<Loader />}>
    <AddClassComp />
  </Suspense>
);

const Classes = () => {
  return (
    <>
      <Head>
        <title>Classes</title>
      </Head>
      <AdminDashContainer>
        <Container maxWidth="md">
          <h1>Classes</h1>
          <TabsContainer
            tabNames={["View Classes", "Add Class"]}
            tabPanels={[<ViewClasses key={0} />, <AddClass key={1} />]}
          />
        </Container>
      </AdminDashContainer>
    </>
  );
};

export default Classes;
