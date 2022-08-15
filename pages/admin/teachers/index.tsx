import Head from "next/head";
import { Suspense } from "react";
import AdminDashContainer from "../../../components/dash/AdminDash";
import dynamic from "next/dynamic";
import Space from "../../../components/Space";
import TabsContainer from "../../../components/TabsContainer";
import Loader from "../../../components/Loader";

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
            <Suspense fallback={<Loader />}>
                <AddTeacher />
            </Suspense>

            <Space />
            <hr />
            <Space />

            <Suspense fallback={<Loader />}>
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
        <Suspense fallback={<Loader />}>
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
            <div className="container h-screen bg-beige/95 max-h-screen max-w-3xl md:max-w-4xl mg:max-w-5xl overflow-hidden">
                <h1 className="text-4xl font-semibold my-8">Teachers</h1>
                <TabsContainer
                    tabNames={["Add Teachers", "View Teachers"]}
                    tabPanels={[
                        <AddTeachers key={0} />,
                        <ViewTeachers key={1} />,
                    ]}
                />
            </div>
        </>
    );
};

Teachers.getLayout = (page: any) => (
    <AdminDashContainer>{page}</AdminDashContainer>
);

export default Teachers;
