import Head from "next/head";
import { Container } from "@mui/material";
import type { NextPage } from "next";
import AdminDashContainer from "../../components/dash/AdminDash";

const Dashboard: NextPage = () => {
    return (
        <>
            <Head>
                <title>Admin Dashboard</title>
            </Head>
            <AdminDashContainer>
                <Container maxWidth="md">
                    <h1>Welcome</h1>
                </Container>
            </AdminDashContainer>
        </>
    );
};

export default Dashboard;
