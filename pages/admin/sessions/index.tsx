import Link from "next/link";
import dynamic from "next/dynamic";
import { useState, useEffect, Suspense } from "react";

import { monthNames } from "../../../lib/constants";
import { useFetch } from "../../../lib/fetch";
import Head from "next/head";
import TabsContainer from "../../../components/TabsContainer";
import AdminDashContainer from "../../../components/dash/AdminDash";
import Loader from "../../../components/Loader";

const CreateSessionComp = dynamic(
    () => import("../../../components/sessions/CreateSession"),
    {
        suspense: true,
    }
);

const CreateSession = () => (
    
        <Suspense fallback={<Loader/>}>
            <CreateSessionComp />
        </Suspense>
    
);

const ViewSessions = () => {
    const { data } = useFetch("/api/get/sessions");
    const [sessions, setSessions] = useState<any[]>([]);

    useEffect(() => {
        if (data.success) {
            setSessions(
                data.sessions.map((session: any) => ({
                    id: session.id,
                    start: new Date(session.start),
                    end: new Date(session.end),
                }))
            );
        }
    }, [data]);

    return (
        <>
            <h3 className="text-2xl my-4">Sessions</h3>
            <ul>
                {sessions.map((session) => (
                    <li key={session.id}>
                        <Link
                            href={{
                                pathname: "/admin/sessions/[id]",
                                query: { id: session.id },
                            }}
                        >
                            <a>
                                {monthNames[session.start.getMonth()]}{" "}
                                {session.start.getFullYear()}-
                                {monthNames[session.end.getMonth()]}{" "}
                                {session.end.getFullYear()}
                            </a>
                        </Link>
                    </li>
                ))}
            </ul>
            <style jsx>{`
                ul {
                    list-style: none;
                }
            `}</style>
        </>
    );
};

const Sessions = () => {
    return (
        <>
            <Head>
                <title>Sessions</title>
            </Head>
                <div className="container h-screen bg-beige/95 max-h-screen max-w-3xl md:max-w-4xl mg:max-w-5xl overflow-hidden">
                    <h1 className="text-4xl font-semibold my-8">Session</h1>
                    <TabsContainer
                        tabNames={["View Sessions", "Create Session"]}
                        tabPanels={[
                            <ViewSessions key={0} />,
                            <CreateSession key={1} />,
                        ]}
                    />
                </div>
        </>
    );
};

Sessions.getLayout = (page: any) => (
    <AdminDashContainer>{page}</AdminDashContainer>
);

export default Sessions;
