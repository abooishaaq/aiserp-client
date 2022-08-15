import { useAppSelector } from "../../lib/redux/hooks";
import AuthTeacher from "../../components/auth/AuthTeacher";
import Head from "next/head";

const Teacher = () => {
    const user = useAppSelector((state) => state.auth.user);

    return (
        <>
            <Head>
                <title>Teacher Dashboard</title>
            </Head>
            <AuthTeacher>
                <div className="container h-screen bg-beige/95 max-h-screen max-w-3xl md:max-w-4xl mg:max-w-5xl overflow-hidden">
                    <h1 className="text-4xl font-semibold my-8">
                        Welcome {user.name}
                    </h1>
                </div>
            </AuthTeacher>
        </>
    );
};

export default Teacher;
