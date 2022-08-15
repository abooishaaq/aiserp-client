import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

const Four0Four: NextPage = () => {
    const router = useRouter();

    const back = () => {
        router.back();
    };

    return (
        <div>
            <Head>
                <title>404</title>
            </Head>

            <div className="max max-h-screen bg-beige/95 flex justify-center items-center">
                <div className="content-404">
                    <h1 className="text-4xl font-semibold my-8">404</h1>
                    <p>
                        You just hit a route that doesn&apos;t exists... and the
                        sadness
                    </p>
                    <a onClick={back}>take me back</a>
                </div>
            </div>
        </div>
    );
};

export default Four0Four;
