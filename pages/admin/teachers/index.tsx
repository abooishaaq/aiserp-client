import Head from "next/head";
import { Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
            <AnimatePresence exitBeforeEnter>
                <Suspense fallback={<Loader />}>
                    <AddTeacher />
                </Suspense>
            </AnimatePresence>
            <Space />
            <hr />
            <Space />
            <AnimatePresence exitBeforeEnter>
                <Suspense fallback={<Loader />}>
                    <AddTeachersXLSX />
                </Suspense>
            </AnimatePresence>
        </>
    );
};

const ViewTeachersComp = dynamic(
    () => import("../../../components/teachers/ViewTeachers"),
    { suspense: true }
);

const ViewTeachers = () => {
    return (
        <AnimatePresence exitBeforeEnter>
            <Suspense fallback={<Loader />}>
                <ViewTeachersComp />
            </Suspense>
        </AnimatePresence>
    );
};

const Teachers = () => {
    return (
        <>
            <Head>
                <title>Teachers</title>
            </Head>
            <AdminDashContainer>
                <div className="container backdrop-blur-lg overflow-y-auto max-h-screen max-w-3xl md:max-w-4xl mg:max-w-5xl">
                    <h1 className="text-4xl font-semibold my-8">Teachers</h1>
                    <TabsContainer
                        tabNames={["Add Teachers", "View Teachers"]}
                        tabPanels={[
                            <AddTeachers key={0} />,
                            <ViewTeachers key={1} />,
                        ]}
                    />
                </div>
            </AdminDashContainer>
        </>
    );
};

export default Teachers;
function dispatch(arg0: any) {
    throw new Error("Function not implemented.");
}
