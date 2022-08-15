import Head from "next/head";
import { Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";

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
    <AnimatePresence exitBeforeEnter>
        <Suspense fallback={<Loader/>}>
            <AddSubjectComp />
        </Suspense>
    </AnimatePresence>
);

const ViewSubjectsComp = dynamic(
    () => import("../../../components/subjects/ViewSubjects"),
    {
        suspense: true,
    }
);

const ViewSubjects = () => (
    <AnimatePresence exitBeforeEnter>
        <Suspense fallback={<Loader/>}>
            <ViewSubjectsComp />
        </Suspense>
    </AnimatePresence>
);

const CreateGroupComp = dynamic(
    () => import("../../../components/subjects/CreateGroup"),
    {
        suspense: true,
    }
);

const CreateGroup = () => (
    <AnimatePresence exitBeforeEnter>
        <Suspense fallback={<Loader/>}>
            <CreateGroupComp />
        </Suspense>
    </AnimatePresence>
);

const ViewGroupsComp = dynamic(
    () => import("../../../components/subjects/ViewGroups"),
    {
        suspense: true,
    }
);

const ViewGroups = () => (
    <AnimatePresence exitBeforeEnter>
        <Suspense fallback={<Loader/>}>
            <ViewGroupsComp />
        </Suspense>
    </AnimatePresence>
);

const Subjects = () => {
    return (
        <>
            <Head>
                <title>Subjects</title>
            </Head>
            <AdminDashContainer>
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
            </AdminDashContainer>
        </>
    );
};

export default Subjects;
