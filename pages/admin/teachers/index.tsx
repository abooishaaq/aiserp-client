import Head from "next/head";
import { Suspense, useState } from "react";
import { Container, Divider } from "@mui/material";
import AdminDashContainer from "../../../components/dash/AdminDash";
import dynamic from "next/dynamic";
import Space from "../../../components/Space";
import TabsContainer from "../../../components/TabsContainer";

const AddTeacher = dynamic(
    () => import("../../../components/teachers/AddTeacher"),
    { suspense: true }
);

const AddTeachersXLSX = dynamic(
    () => import("../../../components/teachers/AddTeachersXLSX"),
    { suspense: true }
);

const AddTeachers = () => {
    return (
        <>
            <Suspense>
                <AddTeacher />
            </Suspense>
            <Space />
            <Divider />
            <Space />
            <Suspense>
                <AddTeachersXLSX />
            </Suspense>
        </>
    );
};

const ViewTeachersComp = dynamic(
    () => import("../../../components/teachers/ViewTeachers"),
    { suspense: true }
);

const ViewTeachers = () => {
    return (
        <Suspense>
            <ViewTeachersComp />
        </Suspense>
    );
};

const Teachers = () => {
    return (
        <>
            <Head>
                <title>Teachers</title>
            </Head>
            <AdminDashContainer>
                <Container maxWidth="md">
                    <h1>Teachers</h1>
                    <TabsContainer
                        tabNames={["Add Teachers", "View Teachers"]}
                        tabPanels={[
                            <AddTeachers key={0} />,
                            <ViewTeachers key={1} />,
                        ]}
                    />
                </Container>
            </AdminDashContainer>
        </>
    );
};

export default Teachers;
function dispatch(arg0: any) {
    throw new Error("Function not implemented.");
}
