import Head from "next/head";
import AdminDashContainer from "../../../components/dash/AdminDash";

const Notices = () => {
    return (
        <>
            <Head>
                <title>Notices</title>
            </Head>
                <div className="container h-screen bg-beige/95 max-h-screen max-w-3xl md:max-w-4xl mg:max-w-5xl overflow-hidden">
                    <h1 className="text-4xl font-semibold my-8">Notices</h1>
                </div>
        </>
    );
};

Notices.getLayout = (page: any) => (
    <AdminDashContainer>{page}</AdminDashContainer>
);

export default Notices;
