import { Suspense } from "react";
import { AnimatePresence } from "framer-motion";
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
            <AnimatePresence exitBeforeEnter>
                <Suspense fallback={<Loader/>}>
                    <ViewClassesComp />
                </Suspense>
            </AnimatePresence>
            <style jsx>{`
                h2 {
                    margin-bottom: 0;
                }
            `}</style>
        </>
    );
};

const AddClass = () => (
    <AnimatePresence exitBeforeEnter>
        <Suspense fallback={<Loader/>}>
            <AddClassComp />
        </Suspense>
    </AnimatePresence>
);

const Classes = () => {
    return (
        <>
            <Head>
                <title>Classes</title>
            </Head>
            <AdminDashContainer>
                <div className="container h-screen bg-beige/95 max-h-screen max-w-3xl md:max-w-4xl mg:max-w-5xl overflow-hidden">
                    <h1 className="text-4xl font-semibold my-8">Classes</h1>
                    <TabsContainer
                        tabNames={["View Classes", "Add Class"]}
                        tabPanels={[
                            <ViewClasses key={0} />,
                            <AddClass key={1} />,
                        ]}
                    />
                </div>
            </AdminDashContainer>
        </>
    );
};

export default Classes;
