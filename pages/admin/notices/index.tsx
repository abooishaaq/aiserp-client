
import Head from "next/head";
import AdminDashContainer from "../../../components/dash/AdminDash";

const Notices = () => {
    return (
        <>
            <Head>
                <title>Notices</title>
            </Head>
            <AdminDashContainer>
                <div className="container backdrop-blur-lg overflow-y-auto max-h-screen max-w-3xl md:max-w-4xl mg:max-w-5xl">
                    <h1 className="text-4xl font-semibold my-8">Notices</h1>
                </div>
            </AdminDashContainer>
        </>
    );
};

export default Notices;
