import { Container } from "@mui/system";
import Head from "next/head";
import AdminDashContainer from "../../components/dash/AdminDash";
import { useFetch } from "../../lib/fetch";

const Activity = () => {
    const {
        data: { activity },
        refresh,
    } = useFetch("/api/get/activity");

    return (
        <>
            <Head>
                <title>Activity</title>
            </Head>
            <AdminDashContainer>
                <Container maxWidth="md">
                    <h1>Activity</h1>
                    <div className="left-align">
                        <a onClick={refresh}>refresh</a>
                    </div>
                    {activity &&
                        activity.map((act: any) => {
                            if (!act) return null;
                            return (
                                <div key={act.id}>
                                    <h2>{act.type}</h2>
                                    <p>{JSON.stringify(act.data)}</p>
                                </div>
                            );
                        })}
                </Container>
            </AdminDashContainer>
        </>
    );
};

export default Activity;
