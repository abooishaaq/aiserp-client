import Link from "next/link";
import { Divider } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { Input } from "../neumorphic";
import { useFetch } from "../../lib/fetch";
import { simplifyGrade } from "../../lib/grade";

const ViewStudents = () => {
    const [search, setSearch] = useState<string[]>([]);
    const [students, setStudents] = useState<any[]>([]);
    const { data, refresh } = useFetch("/api/get/curr-students");

    useEffect(() => {
        if (data?.students) {
            setStudents(data.students);
        }
    }, [data]);

    return (
        <div>
            <h2>View Students</h2>
            <Input
                placeholder="Saif saif@gmail.com 1-A"
                value={search.join(" ")}
                onChange={(e) => setSearch(e.target.value.split(/\s+/))}
            />
            <div className="left-align">
                <a onClick={refresh}>refresh</a>
            </div>
            <div className="long-list">
                {students
                    .filter((student) => {
                        return search
                            .map((s) => {
                                if (
                                    student.profile.name
                                        .toLowerCase()
                                        .includes(s.toLowerCase())
                                ) {
                                    return true;
                                }

                                if (
                                    student.profile.users.filter(
                                        ({ email }: { email: string }) =>
                                            email.includes(s.toLowerCase())
                                    ).length > 0
                                ) {
                                    return true;
                                }

                                const [grade, section] =
                                    student.class.split("-");

                                const simplifiedGrade = simplifyGrade(
                                    student.class.grade
                                );

                                if (grade && section) {
                                    return (
                                        (student.class.grade === grade ||
                                            simplifiedGrade === grade) &&
                                        student.class.section === section
                                    );
                                }

                                if (grade) {
                                    return (
                                        student.class.grade === grade ||
                                        simplifiedGrade === grade
                                    );
                                }

                                if (section) {
                                    return student.class.section === section;
                                }

                                return (
                                    s === student.class.section ||
                                    s === simplifiedGrade
                                );
                            })
                            .reduce((a, b) => a && b, true);
                    })
                    .map((student) => {
                        return (
                            <Fragment key={student.id}>
                                <div className="container">
                                    <h3>{student.profile.name}</h3>
                                    <p>
                                        <b>users:</b>
                                        {student.profile.users.map(
                                            (user: any) => {
                                                return (
                                                    <Link
                                                        key={user.id}
                                                        href={{
                                                            pathname: `/admin/users/[id]`,
                                                            query: {
                                                                id: user.id,
                                                            },
                                                        }}
                                                    >
                                                        <a>
                                                            <p>{user.email}</p>
                                                            <p>{user.phone}</p>
                                                        </a>
                                                    </Link>
                                                );
                                            }
                                        )}
                                    </p>
                                    <p>
                                        <b>rollNo: </b>
                                        {student.rollNo}
                                    </p>
                                    <p>
                                        <b>class: </b>
                                        <Link
                                            href={{
                                                pathname: "/admin/classes/[id]",
                                                query: {
                                                    id: student.class.id,
                                                },
                                            }}
                                        >
                                            <a>
                                                {student.class.grade}-
                                                {student.class.section}
                                            </a>
                                        </Link>
                                    </p>
                                    <Link
                                        href={{
                                            pathname: "/admin/students/[id]",
                                            query: { id: student.id },
                                        }}
                                    >
                                        <a>View</a>
                                    </Link>
                                </div>
                                <Divider />
                                <style jsx>{`
                                    .container {
                                        padding: 32px;
                                        background-color: var(--dark-beige);
                                        border-radius: 1rem;
                                        border: 1px solid var(--blue);
                                    }
                                `}</style>
                            </Fragment>
                        );
                    })}
            </div>
        </div>
    );
};

export default ViewStudents;
