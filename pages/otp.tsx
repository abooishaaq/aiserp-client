import { FormEvent, useEffect, useRef, useState } from "react";
import {
    ConfirmationResult,
    getAuth,
    RecaptchaVerifier,
    signInWithPhoneNumber,
    User,
} from "firebase/auth";
import Head from "next/head";
import firebase from "../firebase";
import { Input, Button } from "../components/ui";
import { fetcher, post } from "../lib/fetch";
import { phone } from "phone";
import { useError, useInfo } from "../lib/message";
import { useRouter } from "next/router";
import { useAppDispatch } from "../lib/redux/hooks";
import { authSlice } from "../lib/redux/reducers/auth";
import { useUser } from "../lib/auth";
import Loader from "../components/Loader";

const OTP = () => {
    const auth = getAuth(firebase);
    const { user, loading } = useUser();
    const containerRef = useRef<HTMLDivElement>(null);
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [otpValue, setOTPValue] = useState<string>("");
    const [otpResult, setOtpResult] = useState<ConfirmationResult>();
    const [verifier, setVerifier] = useState<RecaptchaVerifier>();
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { setError } = useError();
    const { setInfo } = useInfo();

    useEffect(() => {
        if (!containerRef.current) return;
        const recaptchaVerifier = new RecaptchaVerifier(
            containerRef.current!,
            {
                size: "invisible",
                callback: (response: string) => {
                    console.log(response);
                },
            },
            auth
        );
        setVerifier(recaptchaVerifier);
    }, [auth]);

    const afterLogin = async (token: string, user: User) => {
        const res = await post("/api/login", {
            token,
        });

        if (!res.ok) {
            res.json().then(({ error }) => {
                setError(error);
            });
            return;
        }

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
    };

    const sendOTP = async (e: FormEvent) => {
        e.preventDefault();
        const { isValid, phoneNumber: p } = phone(phoneNumber, {
            country: "IN",
        });
        if (!isValid) {
            setError("Invalid phone number");
            return;
        }

        const data = await fetcher("/api/phone?phone=" + encodeURIComponent(p));

        if (data.no) {
            setError("You are unauthorized to login!");
            return;
        }

        if (verifier) {
            try {
                const confirmationResult = await signInWithPhoneNumber(
                    auth,
                    p,
                    verifier
                );

                setOtpResult(confirmationResult);
            } catch (err) {
                setError((err as { message: string }).message);
            }
        } else {
            setError("Developer sends his apologies as something went wrong!");
        }
    };

    const confirmOTP = async (e: FormEvent) => {
        e.preventDefault();
        if (otpResult) {
            try {
                const result = await otpResult.confirm(otpValue);
                result.user.getIdToken().then((token) => {
                    afterLogin(token, result.user);
                });
            } catch (err) {
                setError((err as { message: string }).message);
                router.push("/login");
            }
        }
    };

    return (
        <>
            <Head>
                <title>OTP Login</title>
            </Head>
            <div className="flex justify-center items-center w-screen h-screen">
                {loading ? (
                    <Loader />
                ) : user.type === "UNAUTHORIZED" ? (
                    <div className="flex w-full max-w-3xl max-h-80 h-full bg-beige/95 justify-center items-center rounded-lg">
                        <div className="flex w-full justify-center items-center rounded">
                            {otpResult ? (
                                <form
                                    className="flex justify-center items-center flex-col"
                                    onSubmit={confirmOTP}
                                >
                                    <Input
                                        value={otpValue}
                                        onChange={(e) =>
                                            setOTPValue(e.target.value)
                                        }
                                        type="text"
                                        inputMode="numeric"
                                        autoComplete="one-time-code"
                                        pattern="\d{6}"
                                        required
                                    />
                                    <Button type="submit">verify</Button>
                                </form>
                            ) : (
                                <form
                                    className="flex justify-center items-center flex-col"
                                    onSubmit={sendOTP}
                                >
                                    <Input
                                        type="tel"
                                        label="phone number"
                                        value={phoneNumber}
                                        onChange={(e) =>
                                            setPhoneNumber(e.target.value)
                                        }
                                    />
                                    <Button type="submit">Send OTP</Button>
                                </form>
                            )}
                            <div ref={containerRef} id="recaptcha-container" />
                        </div>
                    </div>
                ) : (
                    <div className="flex h-screen w-screen justify-center items-center">
                        <div className="flex w-full max-w-3xl max-h-80 h-full bg-beige/95 justify-center items-center">
                            <p className="text-2xl rounded font-regular">
                                Already Logged In
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default OTP;
