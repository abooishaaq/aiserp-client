import Head from "next/head";
import { Suspense } from "react";
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
    <Suspense fallback={<Loader />}>
        <ViewProfilesComp />
    </Suspense>
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
            <Suspense fallback={<Loader />}>
                <AddProfilesXLSX />
            </Suspense>

            <Space />
            <hr />
            <Space />
            <Suspense fallback={<Loader />}>
                <AddProfile />
            </Suspense>
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
            <Suspense fallback={<Loader />}>
                <AddStudentsXLSX />
            </Suspense>

            <Space />
            <hr />
            <Space />
            <Suspense fallback={<Loader />}>
                <AddStudent />
            </Suspense>
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
        <Suspense fallback={<Loader />}>
            <ViewStudentsComp />
        </Suspense>
    );
};

const Students = () => {
    return (
        <>
            <Head>
                <title>Students</title>
            </Head>
            <div className="container h-screen bg-beige/95 max-h-screen max-w-3xl md:max-w-4xl mg:max-w-5xl overflow-hidden">
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
        </>
    );
};

Students.getLayout = (page: any) => (
    <AdminDashContainer>{page}</AdminDashContainer>
);

export default Students;
