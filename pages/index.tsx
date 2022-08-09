import Head from "next/head";
import Link from "next/link";
import type { NextPage } from "next";
import { useUser } from "../lib/auth";
import Logo from "../components/Logo";

const Home: NextPage = () => {
  const { user } = useUser();

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className="out-div">
        <div className="logo-container">
          <Logo width={240} height={240} />
        </div>
        <div>
          {user.type === "UNAUTHORIZED" && (
            <Link href="/login">
              <a>Login</a>
            </Link>
          )}
          {user.type === "ADMIN" || user.type === "SU" ? (
            <Link href="/admin">
              <a>Dashboard</a>
            </Link>
          ) : null}
          {user.type === "TEACHER" ? (
            <Link href="/teacher">
              <a>Dashboard</a>
            </Link>
          ) : null}
          {user.type === "STUDENT" ? (
            <Link href="/student">
              <a>Dashboard</a>
            </Link>
          ) : null}
        </div>
      </div>
      <style jsx>{`
        .out-div {
          display: grid;
          grid-template-rows: 1fr 1fr;
          grid-gap: 20px;
          padding-top: 20vh;
          padding-bottom: 30vh;
          max-height: 100vh;
          width: 100vw;
          align-items: center;
        }

        .out-div > div:not(:first-child) {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 15vh;
          background-color: var(--blue);
          width: 50%;
          margin: auto;
          max-width: 480px;
          border-radius: 10px;
        }

        a {
          font-size: 1.5rem;
          margin: 1rem;
          color: var(--beige);
        }

        .logo-container {
          width: 100vw;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </>
  );
};

export default Home;
