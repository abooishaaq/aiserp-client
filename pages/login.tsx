import type { NextPage } from "next";
import firebase from "../firebase";
import { useState } from "react";
import { useAppDispatch } from "../lib/redux/hooks";
import { authSlice } from "../lib/redux/reducers/auth";
import { Button } from "../components/neumorphic";
import { Snackbar } from "@mui/material";
import { post } from "../lib/fetch";
import { useError } from "../lib/message";
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
    const { user } = useUser();
    const auth = getAuth(firebase);
    const router = useRouter();
    const { setError } = useError();
    const dispatch = useAppDispatch();
    const [message, setMessage] = useState("");

    const afterLogin = async (token: string, user: User) => {
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
                    setMessage("Logged In");
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
    };

    const buttonClick = async () => {
        if (auth.currentUser) {
            auth.currentUser.getIdToken().then((token) => {
                if (token && auth.currentUser) {
                    afterLogin(token, auth.currentUser);
                }
            });
        } else {
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
                    setMessage(errorMessage);
                });
        }
    };

    return (
        <div>
            <Head>
                <title>Login</title>
            </Head>
            {user.type === "UNAUTHORIZED" ? (
                <>
                    <h1>Login</h1>
                    <Button onClick={buttonClick}>
                        <p className="btn-text">
                            <Image
                                src="/google.svg"
                                height={24}
                                width={24}
                                alt="Google"
                            />
                            <span>Sign In with Google</span>
                        </p>
                    </Button>
                    <Button>
                        <Link href="otp">
                            <a>
                                <p className="btn-text">
                                    <span>
                                        <FontAwesomeIcon
                                            icon={faSquarePhoneFlip}
                                            size="2x"
                                            color="#03363d"
                                        />
                                    </span>
                                    <span>Sign In with OTP</span>
                                </p>
                            </a>
                        </Link>
                    </Button>
                </>
            ) : (
                <>
                    <h2>already logged in</h2>
                    {user.type === "ADMIN" || user.type === "SU" ? (
                        <Link href="/admin">
                            <a className="dash-link">Dashboard</a>
                        </Link>
                    ) : null}
                    {user.type === "TEACHER" ? (
                        <Link href="/teacher">
                            <a className="dash-link">Dashboard</a>
                        </Link>
                    ) : null}
                    {user.type === "STUDENT" ? (
                        <Link href="/student">
                            <a className="dash-link">Dashboard</a>
                        </Link>
                    ) : null}
                </>
            )}
            <Link href="/">
                <a className="dash-link">Home</a>
            </Link>
            <Snackbar
                open={message !== ""}
                message={message}
                onClose={() => setMessage("")}
                autoHideDuration={3000}
            />
            <style jsx>{`
                div {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    padding-bottom: 100px;
                }

                h1 {
                    font-size: 2rem;
                    margin-bottom: 20px;
                }

                h2 {
                    text-shadow: 1px 1px 1px var(--beige);
                }

                .dash-link {
                    display: block;
                    margin-top: 20px;
                    padding: 10px;
                    text-align: center;
                    border-radius: 5px;
                    background-color: var(--beige);
                    position: relative;
                    max-width: 360px;
                    height: 50px;
                    margin: 12px auto;
                    width: 100%;
                }

                .dash-link :before {
                    content: "";
                    display: block;
                    width: 100%;
                    height: 3px;
                    background-color: var(--blue);
                    position: absolute;
                    bottom: -1px;
                    left: 50%;
                    width: 0;
                    transform: translateX(-50%);
                    transition: width 0.3s ease-in-out;
                }

                .dash-link:hover:before {
                    width: 100%;
                }

                @media (max-width: 480px) {
                    .dash-link {
                        max-width: 280px;
                    }
                }

                .btn-text {
                    display: grid;
                    grid-template-columns: 1fr 3fr;
                    grid-gap: 10px;
                    align-items: center;
                    padding: 0 25%;
                    width: 100%;
                }

                @media (max-width: 480px) {
                    .btn-text {
                        padding: 0 15%;
                    }
                }

                a {
                    width: 100%;
                }
            `}</style>
        </div>
    );
};

export default Login;
