import Head from "next/head";
import { Suspense } from "react";
import AdminDashContainer from "../../../components/dash/AdminDash";
import dynamic from "next/dynamic";
import TabsContainer from "../../../components/TabsContainer";
import Loader from "../../../components/Loader";

const ViewTestsComp = dynamic(
    () => import("../../../components/tests/ViewTests"),
    {
        suspense: true,
    }
);

const ViewTests = () => (
    
        <Suspense fallback={<Loader />}>
            <ViewTestsComp />
        </Suspense>
    
);

const AddTestComp = dynamic(() => import("../../../components/tests/AddTest"), {
    suspense: true,
});

const AddTest = () => (
    
        <Suspense fallback={<Loader />}>
            <AddTestComp />
        </Suspense>
    
);

const Tests = () => {
    return (
        <>
            <Head>
                <title>Tests</title>
            </Head>
            <div className="container h-screen bg-beige/95 max-h-screen max-w-3xl md:max-w-4xl mg:max-w-5xl overflow-hidden">
                <h1 className="text-4xl font-semibold my-8">Tests</h1>
                <TabsContainer
                    tabNames={["View Tests", "Add Test"]}
                    tabPanels={[<ViewTests key={0} />, <AddTest key={1} />]}
                />
            </div>
        </>
    );
};

Tests.getLayout = (page: any) => (
    <AdminDashContainer>{page}</AdminDashContainer>
);

export default Tests;
