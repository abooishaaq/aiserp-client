import Link from "next/link";
import { FixedSizeList as List } from "react-window";
import { Fragment, useEffect, useState } from "react";
import {Input} from "../ui";
import { useFetch } from "../../lib/fetch";
import { simplifyGrade } from "../../lib/grade";

const ViewStudents = () => {
    const [search, setSearch] = useState<string[]>([]);
    const [students, setStudents] = useState<any[]>([]);
    const { data, refresh } = useFetch("/api/get/curr-students");
    const [shownStudents, setShownStudents] = useState<any>([]);

    useEffect(() => {
        if (data?.students) {
            setStudents(data.students);
        }
    }, [data]);

    useEffect(() => {
        setShownStudents(
            students.filter((student) => {
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

                        const [grade, section] = student.class.split("-");

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
                            s === student.class.section || s === simplifiedGrade
                        );
                    })
                    .reduce((a, b) => a && b, true);
            })
        );
    }, [search, students]);

    const Student = ({ index, style }: { index: number; style: any }) => {
        const student = shownStudents[index];
        return (
            <div key={student.id} style={style}>
                <div className="px-4 py-2 bg-beige bg-burlywood my-2 rounded">
                    <h3 className="text-2xl my-4">{student.profile.name}</h3>
                    <p>
                        <b>users:</b>
                        {student.profile.users.map((user: any) => {
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
                        })}
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
                                {student.class.grade}-{student.class.section}
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
                <hr />
            </div>
        );
    };

    return (
        <div>
            <h2 className="text-3xl my-6">View Students</h2>
            <Input
                label="search"
                value={search.join(" ")}
                onChange={(e) => setSearch(e.target.value.split(/\s+/))}
            />
            <div className="left-align">
                <a onClick={refresh}>refresh</a>
            </div>
            <div className="long-list rounded px-4 py-2 overflow-scroll bg-burlywood">
                <List
                    height={700}
                    itemCount={shownStudents.length}
                    itemSize={30}
                    width="100%"
                >
                    {Student}
                </List>
            </div>
        </div>
    );
};

export default ViewStudents;
