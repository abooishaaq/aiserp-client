import Head from "next/head";
import { Suspense } from "react";
import { Container } from "@mui/material";
import AdminDashContainer from "../../../components/dash/AdminDash";
import dynamic from "next/dynamic";
import TabsContainer from "../../../components/TabsContainer";

const AddSubjectComp = dynamic(
  () => import("../../../components/subjects/AddSubject"),
  {
    suspense: true,
  }
);

const AddSubject = () => (
  <Suspense>
    <AddSubjectComp />
  </Suspense>
);

const ViewSubjectsComp = dynamic(
  () => import("../../../components/subjects/ViewSubjects"),
  {
    suspense: true,
  }
);

const ViewSubjects = () => (
  <Suspense>
    <ViewSubjectsComp />
  </Suspense>
);

const CreateGroupComp = dynamic(
  () => import("../../../components/subjects/CreateGroup"),
  {
    suspense: true,
  }
);

const CreateGroup = () => (
  <Suspense>
    <CreateGroupComp />
  </Suspense>
);

const ViewGroupsComp = dynamic(
  () => import("../../../components/subjects/ViewGroups"),
  {
    suspense: true,
  }
);

const ViewGroups = () => (
  <Suspense>
    <ViewGroupsComp />
  </Suspense>
);

const Subjects = () => {
  return (
    <>
      <Head>
        <title>Subjects</title>
      </Head>
      <AdminDashContainer>
        <Container maxWidth="md">
          <h1>Subjects</h1>
          <TabsContainer
            tabNames={[
              "Add Subject",
              "View Subject",
              "Create Group",
              "View Groups",
            ]}
            tabPanels={[
              <AddSubject key={0} />,
              <ViewSubjects key={1} />,
              <CreateGroup key={2} />,
              <ViewGroups key={3} />,
            ]}
          />
        </Container>
      </AdminDashContainer>
    </>
  );
};

export default Subjects;
