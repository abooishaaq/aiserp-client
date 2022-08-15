import type { NextPage } from "next";
import firebase from "../firebase";
import { useCallback, useEffect } from "react";
import { useAppDispatch } from "../lib/redux/hooks";
import { authSlice } from "../lib/redux/reducers/auth";
import { post } from "../lib/fetch";
import { useError, useInfo } from "../lib/message";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    User,
} from "firebase/auth";
import { useUser } from "../lib/auth";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePhoneFlip } from "@fortawesome/free-solid-svg-icons";

const provider = new GoogleAuthProvider();

const Login: NextPage = () => {
    const { user, loading } = useUser();
    const auth = getAuth(firebase);
    const router = useRouter();
    const { setError } = useError();
    const dispatch = useAppDispatch();
    const { setInfo } = useInfo();

    const afterLogin = useCallback(
        async (token: string, user: User) => {
            const res = await post("/api/login", {
                token,
            });

            const { token: jwtToken } = await res.json();

            localStorage.setItem("token", jwtToken);

            fetch("/api/me", {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            }).then((res) => {
                if (res.ok) {
                    res.json().then((data) => {
                        if (!data.user) return;
                        localStorage.setItem("user", JSON.stringify(data.user));
                        dispatch(
                            authSlice.actions.login({
                                user: { ...data.user, pic: user.photoURL },
                            })
                        );
                        setInfo("Logged In");
                        const type = data.user.type;
                        if (type === "ADMIN" || type === "SU") {
                            router.push("/admin");
                        } else if (type === "STUDENT") {
                            router.push("/student");
                        } else if (type === "TEACHER") {
                            router.push("/teacher");
                        }
                    });
                }
            });
        },
        [dispatch, router, setInfo]
    );

    useEffect(() => {
        if (!loading && auth.currentUser) {
            auth.currentUser.getIdToken().then((token) => {
                if (token && auth.currentUser) {
                    afterLogin(token, auth.currentUser);
                }
            });
        }
    }, [afterLogin, auth.currentUser, loading]);

    const buttonClick = async () => {
        signInWithPopup(auth, provider)
            .then(async (result) => {
                const token = await auth.currentUser?.getIdToken();
                if (token) {
                    const user = result.user;
                    afterLogin(token, user);
                } else {
                    setError("Failed to get token");
                }
            })
            .catch((error) => {
                const errorMessage = error.message;
                setInfo(errorMessage);
            });
    };

    return (
        <div>
            <Head>
                <title>Login</title>
            </Head>
            <div className="h-screen w-screen flex justify-cener items-center">
                <div className="container bg-beige/95 rounded-lg w-96">
                    {user.type === "UNAUTHORIZED" ? (
                        <>
                            <h1 className="text-4xl font-semibold my-8 text-center">
                                Login
                            </h1>
                            <a className="h-12 rounded-lg flex justify-center items-center bg-beige hover:bg-burlywood transition-colors duration-200 my-8 py-2 px-4">
                                <p
                                    className="grid grid-cols-3 items-center"
                                    onClick={buttonClick}
                                >
                                    <Image
                                        src="/google.svg"
                                        height={24}
                                        width={24}
                                        alt="Google"
                                        className="col-start-1 col-end-2"
                                    />
                                    <span className="col-start-2 col-end-4">
                                        Sign In with Google
                                    </span>
                                </p>
                            </a>
                            <Link href="/otp">
                                <a className="h-12 rounded-lg flex justify-center items-center bg-beige hover:bg-burlywood transition-colors duration-200 my-8 py-2 px-4">
                                    <p className="grid grid-cols-3 items-center">
                                        <span className="col-start-1 col-end-2">
                                            <FontAwesomeIcon
                                                icon={faSquarePhoneFlip}
                                                size="2x"
                                                color="#03363d"
                                            />
                                        </span>
                                        <span className="col-start-2 col-end-4">
                                            Sign In with OTP
                                        </span>
                                    </p>
                                </a>
                            </Link>
                        </>
                    ) : (
                        <>
                            <h2 className="text-3xl my-6 text-center">
                                already logged in
                            </h2>
                            {user.type === "ADMIN" || user.type === "SU" ? (
                                <Link href="/admin">
                                    <a className="h-12 rounded-lg flex justify-center items-center bg-beige hover:bg-burlywood transition-colors duration-200 my-8 py-2 px-4">
                                        Dashboard
                                    </a>
                                </Link>
                            ) : null}
                            {user.type === "TEACHER" ? (
                                <Link href="/teacher">
                                    <a className="h-12 rounded-lg flex justify-center items-center bg-beige hover:bg-burlywood transition-colors duration-200 my-8 py-2 px-4">
                                        Dashboard
                                    </a>
                                </Link>
                            ) : null}
                            {user.type === "STUDENT" ? (
                                <Link href="/student">
                                    <a className="h-12 rounded-lg flex justify-center items-center bg-beige hover:bg-burlywood transition-colors duration-200 my-8 py-2 px-4">
                                        Dashboard
                                    </a>
                                </Link>
                            ) : null}
                        </>
                    )}
                    <Link href="/">
                        <a className="h-12 rounded-lg flex justify-center items-center bg-beige hover:bg-burlywood transition-colors duration-200 my-8 py-2 px-4">
                            Home
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
