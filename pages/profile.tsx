import Head from "next/head";

import { useUser } from "../lib/auth";
import Loader from "../components/Loader";
import Link from "next/link";
import { post } from "../lib/fetch";
import { useRouter } from "next/router";
import { useAppDispatch } from "../lib/redux/hooks";
import { authSlice } from "../lib/redux/reducers/auth";
import { getAuth } from "firebase/auth";
import firebase from "../firebase";

const Profile = () => {
    const { user, loading } = useUser();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const auth = getAuth(firebase);

    const afterSignOut = () => {
        localStorage.removeItem("token");
        dispatch(authSlice.actions.logout());
        router.push("/");
    };

    const logout = () => {
        post("/api/logout").then(() => {
            if (auth.currentUser) {
                auth.signOut().then(afterSignOut);
            } else {
                afterSignOut();
            }
        });
    };

    if (loading) {
        return <Loader />;
    }

    if (user.type === "UNAUTHORIZED") {
        return (
            <div className="container backdrop-blur-lg overflow-y-auto max-h-screen max-w-3xl md:max-w-4xl mg:max-w-5xl">
                <Link href="/login">
                    <a>Login</a>
                </Link>
            </div>
        );
    }

    return (
        <>
            <Head>
                <title>Profile</title>
            </Head>
            <div className="container backdrop-blur-lg overflow-y-auto max-h-screen max-w-3xl md:max-w-4xl mg:max-w-5xl">
                <h1 className="text-4xl font-semibold my-8">{user.name}</h1>
                <p>{user.email}</p>
                <a onClick={logout}>logout</a>
            </div>
        </>
    );
};

export default Profile;
