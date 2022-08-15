import Head from "next/head";
import { Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

import AdminDashContainer from "../../../components/dash/AdminDash";
import Loader from "../../../components/Loader";

const ViewUsers = dynamic(() => import("../../../components/users/ViewUsers"), {
    suspense: true,
});

const Users = () => {
    return (
        <>
            <Head>
                <title>Users</title>
            </Head>
            <AdminDashContainer>
                <div className="container h-screen bg-beige/95 max-h-screen max-w-3xl md:max-w-4xl mg:max-w-5xl overflow-hidden">
                    <h1 className="text-4xl font-semibold my-8">Users</h1>
                    <AnimatePresence>
                        <Suspense fallback={<Loader />}>
                            <ViewUsers />
                        </Suspense>
                    </AnimatePresence>
                </div>
            </AdminDashContainer>
        </>
    );
};

export default Users;
