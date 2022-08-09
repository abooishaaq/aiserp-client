import Head from "next/head";
import { Container } from "@mui/material";
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
            <Container maxWidth="md">
                <Link href="/login">
                    <a>Login</a>
                </Link>
            </Container>
        );
    }

    return (
        <>
            <Head>
                <title>Profile</title>
            </Head>
            <Container maxWidth="md">
                <h1>{user.name}</h1>
                <p>{user.email}</p>
                <a onClick={logout}>logout</a>
            </Container>
        </>
    );
};

export default Profile;
