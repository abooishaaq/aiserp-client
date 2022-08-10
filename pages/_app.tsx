import "../styles/globals.css";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import MuiAlert from "@mui/material/Alert";
import { createTheme, Snackbar, ThemeProvider } from "@mui/material";
import { wrapper } from "../lib/redux/store";
import { useError, useSuccess, useInfo } from "../lib/message";
import Head from "next/head";
import { useCallback, useEffect, useRef, useState } from "react";
import { Workbox } from "workbox-window";
import { useAppDispatch, useAppSelector } from "../lib/redux/hooks";
import { largeSlice } from "../lib/redux/reducers/large";
import { motion } from "framer-motion";

const transition = { duration: 2 };

const themeOptions = {
    palette: {
        type: "light",
        primary: {
            main: "#03363d",
            contrastText: "#f5f5dc",
        },
        secondary: {
            main: "#f50057",
        },
        background: {
            paper: "#ece0ce",
        },
    },
    typography: {
        fontFamily: [
            "Work Sans",
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(","),
    },
};

const LogoLoading = (props: { hidden: boolean }) => {
    return (
        <>
            <div id="logo-container" hidden={props.hidden}>
                <div id="logo-loader" hidden={props.hidden}>
                    <svg
                        id="logo-svg"
                        width="500pt"
                        height="500pt"
                        version="1.2"
                        viewBox="0 0 500 500"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g transform="translate(0 125)">
                            <motion.circle
                                cx="250"
                                cy="125"
                                r="250"
                                fill="#03363d"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            />
                            <motion.g transform="translate(55.234 -54.969)">
                                <svg
                                    x="23.117"
                                    y="264.313"
                                    width="100%"
                                    height="100%"
                                    overflow="visible"
                                >
                                    <motion.path
                                        initial={{
                                            pathLength: 0,
                                        }}
                                        animate={{
                                            pathLength: 2,
                                        }}
                                        transition={transition}
                                        stroke="#e3d5c0"
                                        fill="#e3d4bf"
                                        strokeWidth={6}
                                        strokeLinecap="round"
                                        d="M74.672-168.69 150.25 0h-20.469L101.89-61.859a71.743 71.743 0 0 1-3.719 22.844c-2.469 7.418-6.105 14.055-10.906 19.906C82.472-13.265 76.55-8.617 69.5-5.171 62.445-1.721 54.347.001 45.202.001c-9.898 0-18.37-2.133-25.422-6.406-7.043-4.282-12.289-10.13-15.734-17.547C.597-31.378-.598-39.815.452-49.264c.75-6.895 2.508-13.602 5.282-20.125a146.309 146.309 0 0 1 9.78-19c3.75-6.145 7.5-11.992 11.25-17.547 4.645-6.895 8.806-13.488 12.485-19.781a123.308 123.308 0 0 0 9.328-19.906c2.55-6.977 4.352-14.664 5.406-23.062zm22.047 95.359-40.031-89.297c-1.656 9.305-4.324 18.117-8 26.438-3.668 8.324-7.902 16.684-12.703 25.078a1366.4 1366.4 0 0 0-10.344 19.234c-3.594 6.824-6.516 13.797-8.766 20.922-2.25 7.117-3 14.273-2.25 21.469.75 7.344 3.11 13.828 7.078 19.453 3.977 5.625 9.266 9.715 15.86 12.266C44.156-15.213 51.8-14.69 60.5-16.19c5.551-.906 10.989-3.379 16.313-7.422 5.32-4.05 9.894-8.926 13.718-14.625 3.82-5.695 6.407-11.617 7.75-17.766 1.352-6.156.833-11.93-1.562-17.328z"
                                    />
                                </svg>
                                <svg
                                    x="191.789"
                                    y="264.313"
                                    width="100%"
                                    height="100%"
                                    overflow="visible"
                                >
                                    <motion.path
                                        initial={{
                                            pathLength: 0,
                                        }}
                                        animate={{
                                            pathLength: 2,
                                        }}
                                        transition={transition}
                                        stroke="#e3d5c0"
                                        fill="#e3d4bf"
                                        strokeWidth={6}
                                        strokeLinecap="round"
                                        d="M0 0v-168.69h18.672V0z"
                                    />
                                </svg>
                                <svg
                                    x="236.318"
                                    y="264.313"
                                    width="100%"
                                    overflow="visible"
                                >
                                    <motion.path
                                        initial={{
                                            pathLength: 0,
                                        }}
                                        animate={{
                                            pathLength: 2,
                                        }}
                                        transition={transition}
                                        stroke="#e3d5c0"
                                        fill="#e3d4bf"
                                        strokeWidth={6}
                                        strokeLinecap="round"
                                        d="M58.922 0c-6.148 0-12.293-.563-18.438-1.688-6.148-1.125-11.996-2.96-17.547-5.515-3.594-1.645-7.305-3.852-11.125-6.625-3.824-2.781-7.012-6.04-9.563-9.781-2.55-3.75-3.828-7.801-3.828-12.156 0-4.946 1.649-9.11 4.953-12.484 3.301-3.375 8.098-5.063 14.391-5.063-2.398 7.055-2.886 13.695-1.468 19.922 1.425 6.219 4.238 11.578 8.437 16.078 4.801 5.094 10.875 8.766 18.22 11.016 7.35 2.25 15.077 3.188 23.171 2.813s15.773-1.91 23.047-4.61c7.281-2.695 13.242-6.297 17.891-10.797 4.945-4.945 7.985-10.117 9.11-15.516 1.125-5.406.671-10.656-1.36-15.75-2.023-5.101-5.32-9.675-9.89-13.719-4.575-4.05-10.008-7.203-16.297-9.453-6.157-2.25-12.95-4.008-20.375-5.281a609.103 609.103 0 0 1-22.375-4.266c-7.493-1.582-14.5-3.832-21.031-6.75-6.524-2.925-12.027-7.086-16.516-12.484-4.657-5.695-7.36-12.219-8.11-19.562-.75-7.351.524-14.18 3.828-20.484 2.696-5.394 6.485-9.816 11.36-13.266 4.874-3.445 10.27-6.144 16.187-8.093a94.59 94.59 0 0 1 18.22-4.047c6.226-.75 12.038-1.125 17.437-1.125 6.145 0 12.29.562 18.438 1.687 6.157 1.125 12.004 2.961 17.547 5.5 3.602 1.656 7.317 3.914 11.141 6.766 3.82 2.844 7.004 6.105 9.547 9.781 2.551 3.668 3.828 7.68 3.828 12.031 0 5.094-1.652 9.328-4.953 12.703-3.293 3.375-8.09 4.984-14.39 4.828 2.25-6.289 2.882-12.285 1.905-17.984-.968-5.695-3.18-10.723-6.625-15.078-3.75-5.094-8.851-8.988-15.297-11.688-6.449-2.695-13.387-4.305-20.812-4.828-7.418-.531-14.574.027-21.469 1.672-5.093 1.055-10.078 2.89-14.953 5.516s-9 5.964-12.375 10.016c-3.375 4.043-5.359 8.914-5.953 14.609-.605 6.304.739 11.516 4.032 15.64 3.3 4.118 7.687 7.415 13.156 9.891a104.68 104.68 0 0 0 16.766 5.953c7.05 1.656 14.625 3.125 22.719 4.407 8.093 1.273 16 3.03 23.719 5.28 7.726 2.243 14.44 5.688 20.14 10.345 5.551 4.492 9.75 9.773 12.595 15.844 2.851 6.074 4.203 12.375 4.046 18.906-.148 6.523-1.796 12.78-4.953 18.78-3.148 5.993-7.867 11.087-14.156 15.282-7.355 4.96-15.793 8.34-25.313 10.14C76.058-.892 67.175.002 58.925.002z"
                                    />
                                </svg>
                            </motion.g>
                        </g>
                    </svg>
                </div>
            </div>
            <style jsx>{`
                #logo-container {
                    position: fixed;
                    height: 100vh;
                    width: 100vw;
                    background-color: var(--beige);
                    z-index: 10000000;
                }

                #logo-loader {
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background-color: var(--beige);
                }

                @media (max-width: 480px){
                    #logo-svg {
                        transform: scale(0.5);
                    }
                }

                @media (max-width: 768px) and (min-width: 481px) {
                    #logo-svg {
                        transform: scale(0.6);
                    }
                }

                @media (max-width: 1024px) and (min-width: 769px) {
                    #logo-svg {
                        transform: scale(0.75);
                    }
                }
            `}</style>
        </>
    );
};

const Message = () => {
    const { error, setError } = useError();
    const { success, setSuccess } = useSuccess();
    const { info, setInfo } = useInfo();

    return (
        <>
            <Snackbar
                open={!!success}
                onClose={() => setSuccess("")}
                autoHideDuration={6000}
            >
                <MuiAlert elevation={6} variant="filled" severity="success">
                    {success}
                </MuiAlert>
            </Snackbar>
            <Snackbar
                open={!!error}
                onClose={() => setError("")}
                autoHideDuration={6000}
            >
                <MuiAlert elevation={6} variant="filled" severity="error">
                    {error}
                </MuiAlert>
            </Snackbar>
            <Snackbar
                open={!!info}
                onClose={() => setInfo("")}
                autoHideDuration={6000}
                message={info}
            />
        </>
    );
};

function App({ Component, pageProps }: AppProps) {
    const dispatch = useAppDispatch();
    const [loaderHidden, setLoaderHidden] = useState(false);
    const large = useAppSelector((state) => state.large.large);
    const swRegistered = useRef(false);

    useEffect(() => {
        setTimeout(() => {
            setLoaderHidden(true);
        }, 2000);

        if ("serviceWorker" in navigator && !swRegistered.current) {
            const wb = new Workbox("/sw.js");
            wb.register()
                .then(() => {
                    swRegistered.current = true;
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, []);

    const resizeHandler = useCallback(() => {
        if (window.innerWidth <= 1024) {
            if (large) {
                dispatch(largeSlice.actions.set({ large: false }));
            }
        } else {
            if (!large) {
                dispatch(largeSlice.actions.set({ large: true }));
            }
        }
    }, [dispatch, large]);

    useEffect(() => {
        resizeHandler();

        window.addEventListener("resize", resizeHandler);

        return () => window.removeEventListener("resize", resizeHandler);
    }, [resizeHandler]);

    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
                />
            </Head>
            <NextNProgress
                color="#03363d"
                startPosition={0.1}
                stopDelayMs={200}
                height={3}
                showOnShallow={true}
            />
            <ThemeProvider theme={createTheme(themeOptions)}>
                <LogoLoading hidden={loaderHidden} />
                <Component {...pageProps} />
                <Message />
            </ThemeProvider>
        </>
    );
}

export default wrapper.withRedux(App);
