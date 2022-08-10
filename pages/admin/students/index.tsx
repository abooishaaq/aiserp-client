import Head from "next/head";
import { Suspense } from "react";
import { Container } from "@mui/material";
import AdminDashContainer from "../../../components/dash/AdminDash";
import { Divider } from "@mui/material";
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
    <Suspense>
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
            <Suspense>
                <AddProfilesXLSX />
            </Suspense>
            <Space />
            <Divider />
            <Space />
            <Suspense>
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
            <Suspense>
                <AddStudentsXLSX />
            </Suspense>
            <Space />
            <Divider />
            <Space />
            <Suspense>
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
            <AdminDashContainer>
                <Container maxWidth="md">
                    <h1>Students</h1>
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
                </Container>
            </AdminDashContainer>
        </>
    );
};

export default Students;
