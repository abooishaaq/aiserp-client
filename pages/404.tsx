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

            <div className="h-screen  flex justify-center items-center">
                <div className="bg-beige/95 py-4 px-8 rounded-lg">
                    <h1 className="text-4xl font-semibold my-8">404</h1>
                    <p>
                        You just hit a route that doesn&apos;t exists... and the
                        sadness
                    </p>
                    <div className="flex justify-center items-center w-full my-4">
                    <a onClick={back} className="underline">take me back</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Four0Four;
