import Head from "next/head";
import { Suspense } from "react";
import AdminDashContainer from "../../../components/dash/AdminDash";
import dynamic from "next/dynamic";
import TabsContainer from "../../../components/TabsContainer";
import Loader from "../../../components/Loader";

const AddSubjectComp = dynamic(
    () => import("../../../components/subjects/AddSubject"),
    {
        suspense: true,
    }
);

const AddSubject = () => (
    <Suspense fallback={<Loader />}>
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
    <Suspense fallback={<Loader />}>
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
    <Suspense fallback={<Loader />}>
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
    <Suspense fallback={<Loader />}>
        <ViewGroupsComp />
    </Suspense>
);

const Subjects = () => {
    return (
        <>
            <Head>
                <title>Subjects</title>
            </Head>
            <div className="container h-screen bg-beige/95 max-h-screen max-w-3xl md:max-w-4xl mg:max-w-5xl overflow-hidden">
                <h1 className="text-4xl font-semibold my-8">Subjects</h1>
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
            </div>
        </>
    );
};

Subjects.getLayout = (page: any) => (
    <AdminDashContainer>{page}</AdminDashContainer>
);

export default Subjects;
