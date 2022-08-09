import Head from "next/head";
import { Suspense } from "react";
import AdminDashContainer from "../../../components/dash/AdminDash";
import { Container } from "@mui/material";
import dynamic from "next/dynamic";
import TabsContainer from "../../../components/TabsContainer";

const ViewTestsComp = dynamic(
  () => import("../../../components/tests/ViewTests"),
  {
    suspense: true,
  }
);

const ViewTests = () => (
  <Suspense>
    <ViewTestsComp />
  </Suspense>
);

const AddTestComp = dynamic(() => import("../../../components/tests/AddTest"), {
  suspense: true,
});

const AddTest = () => (
  <Suspense>
    <AddTestComp />
  </Suspense>
);

const Tests = () => {
  return (
    <>
      <Head>
        <title>Tests</title>
      </Head>
      <AdminDashContainer>
        <Container maxWidth="md">
          <h1>Tests</h1>
          <TabsContainer
            tabNames={["View Tests", "Add Test"]}
            tabPanels={[<ViewTests key={0} />, <AddTest key={1} />]}
          />
        </Container>
      </AdminDashContainer>
    </>
  );
};

export default Tests;
