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

            <div className="container-404">
                <div className="content-404">
                    <h1>404</h1>
                    <p>
                        You just hit a route that doesn&apos;t exists... and the
                        sadness
                    </p>
                    <a onClick={back}>take me back</a>
                </div>
            </div>
            <style jsx>{`
                .container-404 {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    width: 100vw;
                }

                .content-404 {
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    width: 50%;
                }
                
                h1 {
                    font-size: 2.5rem;
                    border-radius: 5px;
                    background-color: var(--blue);
                    color: var(--beige);
                    padding: 2rem;
                }

                p, a {
                    font-size: 1.5rem;
                    background-color: var(--beige);
                    padding: 1rem;
                }
            `}</style>
        </div>
    );
};

export default Four0Four;
