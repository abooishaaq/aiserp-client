import Head from "next/head";
import type { NextPage } from "next";
import AdminDashContainer from "../../components/dash/AdminDash";

const Dashboard: NextPage = () => {
    return (
        <>
            <Head>
                <title>Admin Dashboard</title>
            </Head>
            <AdminDashContainer>
                <div className="container backdrop-blur-lg overflow-y-auto max-h-screen mx-auto max-w-4xl mg:max-w-5xl">
                    <h1 className="text-4xl font-semibold my-8">Welcome</h1>
                </div>
            </AdminDashContainer>
        </>
    );
};

export default Dashboard;
