
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
                <div className="container h-screen bg-beige/95 max-h-screen max-w-3xl md:max-w-4xl mg:max-w-5xl overflow-hidden">
                    <h1 className="text-4xl font-semibold my-8">Activity</h1>
                    <div className="left-align">
                        <a onClick={refresh}>refresh</a>
                    </div>
                    {activity &&
                        activity.map((act: any) => {
                            if (!act) return null;
                            return (
                                <div key={act.id}>
                                    <h2 className="text-3xl my-6">{act.type}</h2>
                                    <p>{JSON.stringify(act.data)}</p>
                                </div>
                            );
                        })}
                </div>
            </AdminDashContainer>
        </>
    );
};

export default Activity;
