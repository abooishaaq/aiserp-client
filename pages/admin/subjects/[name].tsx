
import { useRouter } from "next/router";
import { useState } from "react";
import { useFetch } from "../../../lib/fetch";
import { useEffect } from "react";
import Link from "next/link";
import AdminDashContainer from "../../../components/dash/AdminDash";
import Head from "next/head";

const Subject = () => {
    const router = useRouter();
    let { name } = router.query;
    const { data, status } = useFetch(
        `/api/get/subject-teachers/${
            typeof name === "string" ? name.toUpperCase() : ""
        }`
    );
    const [teachers, setTeachers] = useState<any[]>([]);

    useEffect(() => {
        if (data?.teachers) {
            setTeachers(data.teachers);
        }
    }, [data]);

    if (status === 400) {
        return (
            <AdminDashContainer>
                <div className="container h-screen bg-beige/95 max-h-screen max-w-3xl md:max-w-4xl mg:max-w-5xl overflow-hidden">
                    <p>nonexistent subject</p>
                </div>
            </AdminDashContainer>
        );
    }

    let title = `Subject | ${name}`;

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <AdminDashContainer>
                <div className="container h-screen bg-beige/95 max-h-screen max-w-3xl md:max-w-4xl mg:max-w-5xl overflow-hidden">
                    <h1 className="text-4xl font-semibold my-8">{name}</h1>
                    <h2 className="text-3xl my-6">Teachers</h2>
                    <ul>
                        {teachers.map((teacher) => (
                            <li key={teacher.id}>
                                <Link
                                    href={{
                                        pathname: "/admin/teachers/[id]",
                                        query: { id: teacher.id },
                                    }}
                                >
                                    <a>{teacher.user.name}</a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </AdminDashContainer>
        </>
    );
};

export default Subject;
