import { useState, useEffect } from "react";
import Link from "next/link";
import { fetcher, useFetch } from "../../lib/fetch";

const ViewSubjects = () => {
    const [subjects, setSubjects] = useState<any[]>([]);
    const [map, setMap] = useState<any>({});
    const { data, refresh } = useFetch("/api/get/subjects");

    useEffect(() => {
        if (data?.subjects) {
            setSubjects(data.subjects);

            const map: { [key: string]: any[] } = {};
            (async () => {
                for (const subject of data?.subjects) {
                    const data = await fetcher(
                        `/api/get/subject-teacher/${subject.name}`
                    );
                    if (data?.teachers) {
                        map[subject.name] = data.teachers;
                    }
                }
                setMap(map);
            })();
        }
    }, [data]);

    return (
        <>
            <h1 className="text-4xl font-semibold my-8">View Subjects</h1>
            <div className="left-align">
                <a onClick={refresh}>refresh</a>
            </div>
            <div className="container backdrop-blur-lg max-h-screen">
                {subjects.map((subject) => (
                    <div key={subject.id}>
                        <h2 className="text-3xl my-6">{subject.name}</h2>
                        {map[subject.name]?.length && <h3 className="text-2xl my-4">Teachers</h3>}
                        <ul>
                            {map[subject.name]?.map((teacher: any) => (
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
                ))}
            </div>
            <style jsx>{`
                .container{
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: start;
                    justify-content: center;
                }
            `}</style>
        </>
    );
};

export default ViewSubjects;
