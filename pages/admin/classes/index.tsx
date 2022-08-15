import { Suspense } from "react";
import AdminDashContainer from "../../../components/dash/AdminDash";
import Head from "next/head";
import TabsContainer from "../../../components/TabsContainer";
import dynamic from "next/dynamic";
import Loader from "../../../components/Loader";

const AddClassComp = dynamic(
    () => import("../../../components/classes/AddClass"),
    {
        suspense: true,
    }
);
const ViewClassesComp = dynamic(
    () => import("../../../components/classes/ViewClasses"),
    {
        suspense: true,
    }
);

const ViewClasses = () => {
    return (
        <>
            <h2 className="text-3xl my-6">View Classes</h2>

            <Suspense fallback={<Loader />}>
                <ViewClassesComp />
            </Suspense>

            <style jsx>{`
                h2 {
                    margin-bottom: 0;
                }
            `}</style>
        </>
    );
};

const AddClass = () => (
    <Suspense fallback={<Loader />}>
        <AddClassComp />
    </Suspense>
);

const Classes = () => {
    return (
        <>
            <Head>
                <title>Classes</title>
            </Head>
            <div className="container h-screen bg-beige/95 max-h-screen max-w-3xl md:max-w-4xl mg:max-w-5xl overflow-hidden">
                <h1 className="text-4xl font-semibold my-8">Classes</h1>
                <TabsContainer
                    tabNames={["View Classes", "Add Class"]}
                    tabPanels={[<ViewClasses key={0} />, <AddClass key={1} />]}
                />
            </div>
        </>
    );
};

Classes.getLayout = (page: any) => (
    <AdminDashContainer>{page}</AdminDashContainer>
);

export default Classes;
