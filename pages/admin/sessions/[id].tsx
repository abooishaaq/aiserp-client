
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { monthNames } from "../../../lib/constants";
import { useFetch } from "../../../lib/fetch";
import { gradeToRoman } from "../../../lib/grade";
import AdminDashContainer from "../../../components/dash/AdminDash";
import Head from "next/head";

const Session = () => {
    const router = useRouter();
    const { id } = router.query;
    const { data } = useFetch(
        typeof id === "string" ? `/api/get/session-classes/${id}` : ""
    );
    const [session, setSession] = useState<{
        id: string;
        start: Date;
        end: Date;
    }>();
    const [classes, setClasses] = useState<any[]>([]);
    const [title, setTitle] = useState<string>("Session");

    useEffect(() => {
        if (data?.session) {
            const start = new Date(data.session.start);
            const end = new Date(data.session.end);
            setSession({
                id: data.session.id,
                start,
                end,
            });
            setTitle(
                `${monthNames[start.getMonth()]} ${start.getFullYear()} - ${
                    monthNames[end.getMonth()]
                } ${end.getFullYear()}`
            );
            setClasses(data.classes);
        }
    }, [data]);

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <AdminDashContainer>
                <div className="container backdrop-blur-lg overflow-y-auto max-h-screen max-w-3xl md:max-w-4xl mg:max-w-5xl">
                    {session?.id && (
                        <>
                            <h1 className="text-4xl font-semibold my-8">{title}</h1>
                            <div>
                                <ul>
                                    {classes.map((class_) => (
                                        <li key={class_.id}>
                                            {gradeToRoman(class_.grade)}-
                                            {class_.section}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </>
                    )}
                </div>
            </AdminDashContainer>
        </>
    );
};

export default Session;
