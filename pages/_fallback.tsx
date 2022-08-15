import Link from "next/link";

const Fallback = () => {
    return (
        <>
            <div className="container h-screen bg-beige/95 max-h-screen max-w-3xl md:max-w-4xl mg:max-w-5xl overflow-hidden">
                <div>
                    <h1 className="text-4xl font-semibold my-8">Offline :(</h1>
                    <Link href="/">
                        <a>take me to /</a>
                    </Link>
                </div>
            </div>
            <style jsx>{`
                h1 {
                    text-align: center;
                    color: var(--blue);
                }

                div {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            `}</style>
        </>
    );
};

export default Fallback;
