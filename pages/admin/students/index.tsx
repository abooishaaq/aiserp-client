import Head from "next/head";
import { Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import AdminDashContainer from "../../../components/dash/AdminDash";
import Space from "../../../components/Space";
import Loader from "../../../components/Loader";
import dynamic from "next/dynamic";
import TabsContainer from "../../../components/TabsContainer";

const ViewProfilesComp = dynamic(
    () => import("../../../components/students/ViewProfiles"),
    {
        suspense: true,
    }
);

const ViewProfiles = () => (
    <AnimatePresence exitBeforeEnter>
        <Suspense fallback={<Loader />}>
            <ViewProfilesComp />
        </Suspense>
    </AnimatePresence>
);

const AddProfilesXLSX = dynamic(
    () => import("../../../components/students/AddProfilesXLSX"),
    {
        suspense: true,
    }
);

const AddProfile = dynamic(
    () => import("../../../components/students/AddProfile"),
    {
        suspense: true,
    }
);

const AddProfiles = () => {
    return (
        <>
            <AnimatePresence>
                <Suspense fallback={<Loader />}>
                    <AddProfilesXLSX />
                </Suspense>
            </AnimatePresence>
            <Space />
            <hr />
            <Space />
            <AnimatePresence>
                <Suspense fallback={<Loader />}>
                    <AddProfile />
                </Suspense>
            </AnimatePresence>
        </>
    );
};

const AddStudent = dynamic(
    () => import("../../../components/students/AddStudent"),
    {
        suspense: true,
    }
);

const AddStudentsXLSX = dynamic(
    () => import("../../../components/students/AddStudentsXLSX"),
    {
        suspense: true,
    }
);

const AddStudents = () => {
    return (
        <>
            <AnimatePresence>
                <Suspense fallback={<Loader />}>
                    <AddStudentsXLSX />
                </Suspense>
            </AnimatePresence>
            <Space />
            <hr />
            <Space />
            <AnimatePresence>
                <Suspense fallback={<Loader />}>
                    <AddStudent />
                </Suspense>
            </AnimatePresence>
        </>
    );
};

const ViewStudentsComp = dynamic(
    () => import("../../../components/students/ViewStudents"),
    {
        suspense: true,
    }
);

const ViewStudents = () => {
    return (
        <AnimatePresence>
            <Suspense fallback={<Loader />}>
                <ViewStudentsComp />
            </Suspense>
        </AnimatePresence>
    );
};

const Students = () => {
    return (
        <>
            <Head>
                <title>Students</title>
            </Head>
            <AdminDashContainer>
                <div className="container backdrop-blur-lg overflow-y-auto max-h-screen max-w-3xl md:max-w-4xl mg:max-w-5xl">
                    <h1 className="text-4xl font-semibold my-8">Students</h1>
                    <TabsContainer
                        tabNames={[
                            "Add Students",
                            "View Students",
                            "Add Profiles",
                            "View Profiles",
                        ]}
                        tabPanels={[
                            <AddStudents key={0} />,
                            <ViewStudents key={1} />,
                            <AddProfiles key={2} />,
                            <ViewProfiles key={3} />,
                        ]}
                    />
                </div>
            </AdminDashContainer>
        </>
    );
};

export default Students;
