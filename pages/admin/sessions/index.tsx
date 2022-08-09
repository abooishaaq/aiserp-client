import Link from "next/link";
import dynamic from "next/dynamic";
import { useState, useEffect, Suspense } from "react";
import { Container } from "@mui/material";
import { monthNames } from "../../../lib/constants";
import { useFetch } from "../../../lib/fetch";
import Head from "next/head";
import TabsContainer from "../../../components/TabsContainer";
import AdminDashContainer from "../../../components/dash/AdminDash";

const CreateSessionComp = dynamic(
  () => import("../../../components/sessions/CreateSession"),
  {
    suspense: true,
  }
);

const CreateSession = () => (
  <Suspense>
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
      <h3>Sessions</h3>
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
                {monthNames[session.end.getMonth()]} {session.end.getFullYear()}
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
      <AdminDashContainer>
        <Container maxWidth="md">
          <h1>Session</h1>
          <TabsContainer
            tabNames={["View Sessions", "Create Session"]}
            tabPanels={[<ViewSessions key={0} />, <CreateSession key={1} />]}
          />
        </Container>
      </AdminDashContainer>
    </>
  );
};

export default Sessions;
