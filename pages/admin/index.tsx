import Head from "next/head";
import type { NextPage } from "next";
import AdminDashContainer from "../../components/dash/AdminDash";

const Dashboard = () => {
    return (
        <>
            <Head>
                <title>Admin Dashboard</title>
            </Head>
            <div className="container max-h-screen bg-beige/95 mx-auto max-w-4xl mg:max-w-5xl">
                <h1 className="text-4xl font-semibold my-8">Welcome</h1>
            </div>
        </>
    );
};

Dashboard.getLayout = (page: any) => (
    <AdminDashContainer>{page}</AdminDashContainer>
);

export default Dashboard;
