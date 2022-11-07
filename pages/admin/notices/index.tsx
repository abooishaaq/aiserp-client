import Head from "next/head";
import AdminDashContainer from "../../../components/dash/AdminDash";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Loader from "../../../components/Loader";
import TabsContainer from "../../../components/TabsContainer";

const ViewNoticesComp = dynamic(
    () => import("../../../components/notices/ViewNotices"),
    {
        suspense: true,
    }
);

const ViewNotices = () => (
    <Suspense fallback={<Loader />}>
        <ViewNoticesComp />
    </Suspense>
);

const AddNoticesComp = dynamic(
    () => import("../../../components/notices/AddNotices"),
    {
        suspense: true,
    }
);

const AddNotices = () => (
    <Suspense fallback={<Loader />}>
        <AddNoticesComp />
    </Suspense>
);

const Notices = () => {
    return (
        <>
            <Head>
                <title>Notices</title>
            </Head>
            <div className="container h-screen bg-beige/95 max-h-screen max-w-3xl md:max-w-4xl mg:max-w-5xl overflow-hidden">
                <h1 className="text-4xl font-semibold my-8">Notices</h1>
                <TabsContainer
                    tabNames={["View Notices", "Create Notice"]}
                    tabPanels={[
                        <ViewNotices key={0} />,
                        <AddNotices key={1} />,
                    ]}
                />
            </div>
        </>
    );
};

Notices.getLayout = (page: any) => (
    <AdminDashContainer>{page}</AdminDashContainer>
);

export default Notices;
