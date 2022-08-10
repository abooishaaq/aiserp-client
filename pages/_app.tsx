import "../styles/globals.css";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import MuiAlert from "@mui/material/Alert";
import {
    createTheme,
    Modal,
    Snackbar,
    ThemeProvider,
    Paper,
} from "@mui/material";
import { wrapper } from "../lib/redux/store";
import { useError, useSuccess, useInfo } from "../lib/message";
import Head from "next/head";
import { useCallback, useEffect, useRef, useState } from "react";
import { Workbox } from "workbox-window";
import { useAppDispatch, useAppSelector } from "../lib/redux/hooks";
import { largeSlice } from "../lib/redux/reducers/large";
import { getMessaging, getToken } from "firebase/messaging";
import firebase from "../firebase";

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

const messaging = getMessaging(firebase);

function App({ Component, pageProps }: AppProps) {
    const large = useAppSelector((state) => state.large.large);
    const dispatch = useAppDispatch();
    const swRegistered = useRef(false);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        getToken(messaging, { vapidKey: "<YOUR_PUBLIC_VAPID_KEY_HERE>" })
            .then((currentToken) => {
                if (currentToken) {
                    // Send the token to your server and update the UI if necessary
                    // ...
                } else {
                    // Show permission request UI
                    console.log(
                        "No registration token available. Request permission to generate one."
                    );
                    // ...
                }
            })
            .catch((err) => {
                console.log("An error occurred while retrieving token. ", err);
                // ...
            });

        if ("serviceWorker" in navigator && !swRegistered.current) {
            const wb = new Workbox("/sw.js");
            wb.register()
                .then(() => {
                    swRegistered.current = true;
                })
                .catch((err) => {
                    console.log(err);
                });

            window.addEventListener("beforeinstallprompt", (e) => {
                // @ts-ignore
                e.userChoice.then((choice) => {
                    if (choice.outcome === "dismissed") {
                        setModalOpen(true);
                    }
                });
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
                <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                    <Paper elevation={4}>
                        <p>
                            You broke my heart and made it a shattered glass...
                            but you can fix that by manually adding me to home
                            screen
                        </p>
                    </Paper>
                </Modal>
                <Component {...pageProps} />
                <Message />
            </ThemeProvider>
        </>
    );
}

export default wrapper.withRedux(App);
