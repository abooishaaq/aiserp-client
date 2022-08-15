import { useFetch, post } from "../../../lib/fetch";
import { useEffect, useState } from "react";
import Copyable from "../../../components/Copyable";
import { useRouter } from "next/router";
import Link from "next/link";
import Button from "@mui/material/Button";
import SelectSubject from "../../../components/select/SelectSubject";
import SelectClass from "../../../components/select/SelectClass";
import Space from "../../../components/Space";
import { useError, useSuccess } from "../../../lib/message";
import Loader from "../../../components/Loader";
import AdminDashContainer from "../../../components/dash/AdminDash";
import Head from "next/head";
import { AnimatePresence } from "framer-motion";

interface IViewEditClassSubjectProps {
    classSubjectId: string;
    classId: string;
    subjectName: string;
    teacherId: string;
}

const ViewEditClassSubject = (props: IViewEditClassSubjectProps) => {
    const [selectedSubject, setSelectedSubject] = useState<string>(
        props.subjectName
    );
    const [selectedClass, setSelectedClass] = useState<string>(props.classId);
    return (
        <>
            <SelectSubject
                selectSubject={setSelectedSubject}
                selectedSubject={selectedSubject}
            />
            <SelectClass
                selectClass={setSelectedClass}
                selectedClass={selectedClass}
            />
        </>
    );
};

interface iAddClassSubjectProps {
    teacherId: string;
}

const AddClassSubject = ({ teacherId }: iAddClassSubjectProps) => {
    const [selectedSubject, setSelectedSubject] = useState<string>("");
    const [selectedClass, setSelectedClass] = useState<any>({});
    const { setSuccess } = useSuccess();
    const { setError } = useError();

    const assign = () => {
        const data = {
            teacherId,
            classId: selectedClass.id,
            subject: selectedSubject,
        };

        post("/api/add/class-subject", data).then((res) => {
            if (res.ok) {
                setSuccess("class and subject assigned successfully");
            } else {
                res.json().then((err) => {
                    setError(err.message);
                });
            }
        });
    };

    return (
        <>
            <div className="box-shadow-xl">
                <div className="row-grid">
                    <SelectSubject
                        selectSubject={setSelectedSubject}
                        selectedSubject={selectedSubject}
                    />

                    <SelectClass
                        selectClass={setSelectedClass}
                        selectedClass={selectedClass}
                    />
                    <Button onClick={assign}>ASSIGN</Button>
                </div>
            </div>
            <style jsx>{`
                .row-grid {
                    padding: 32px;
                    display: grid;
                    grid-template-rows: 1fr 1fr 1fr;
                    grid-grap: 1em;
                    width: 100%;
                }
            `}</style>
        </>
    );
};

interface IAssignClassSubjectsProps {
    teacherId: string;
    classSubjects: any[];
}

const AssignClassSubjects = ({ teacherId }: IAssignClassSubjectsProps) => {
    return (
        <>
            <h2 className="text-3xl my-6">Assign Classes and Subjects</h2>
            <div>
                <AddClassSubject teacherId={teacherId} />
                <Space size={2} />
            </div>
            <style jsx>{`
                div {
                    width: 100%;
                }

                div > * {
                    width: 100%;
                }
            `}</style>
        </>
    );
};

const Teacher = () => {
    const router = useRouter();
    const { id } = router.query;
    const [teacher, setTeacher] = useState<any>({});
    const [classes, setClasses] = useState<any>({});
    const [title, setTitle] = useState<string>("Teacher");
    const { data, status, loading } = useFetch(`/api/get/teacher/${id}`);

    useEffect(() => {
        if (data?.teacher) {
            setTitle(`Teacher | ${data.teacher.user.name}`);
            setTeacher(data.teacher);
            const _classes: { [key: string]: any } = {};
            for (const classSubject of data.teacher.classSubjects) {
                if (typeof _classes[classSubject.class.id] === "object") {
                    _classes[classSubject.class.id].subjects.push(
                        classSubject.subject.name
                    );
                } else {
                    _classes[classSubject.class.id] = {
                        grade: classSubject.class.grade,
                        section: classSubject.class.section,
                        subjects: [classSubject.subject.name],
                    };
                }
            }
            setClasses(_classes);
        }
    }, [data]);

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <AdminDashContainer>
                <div className="container max-h-screen bg-beige/95 min-h-full max-w-3xl md:max-w-4xl mg:max-w-5xl">
                    <AnimatePresence>
                        {teacher.id ? (
                            <div className="max-h-screen min-h-full ">
                                <h1 className="text-4xl font-semibold my-8">
                                    {teacher.user.name}
                                </h1>
                                <Copyable>
                                    <p>{teacher.user.email}</p>
                                </Copyable>
                                <Copyable>
                                    <p>id: {teacher.id}</p>
                                </Copyable>
                                <p>
                                    user: &nbsp;
                                    <Link
                                        href={{
                                            pathname: "/admin/users/[id]",
                                            query: { id: teacher.userId },
                                        }}
                                    >
                                        <a>{teacher.userId}</a>
                                    </Link>
                                </p>
                                <p>
                                    class:&nbsp;
                                    {teacher.class ? (
                                        <Link
                                            href={{
                                                pathname: "/admin/classes/[id]",
                                                query: { id: teacher.class.id },
                                            }}
                                        >
                                            <a>
                                                {teacher.class.grade}-
                                                {teacher.class.section}
                                            </a>
                                        </Link>
                                    ) : (
                                        "None"
                                    )}
                                </p>
                                <div>
                                    teaches in classes: &nbsp;
                                    {Object.keys(classes).length ? (
                                        Object.keys(classes).map((classId) => (
                                            <div key={classId}>
                                                <h3 className="text-2xl my-4">
                                                    <Link
                                                        href={{
                                                            pathname:
                                                                "/admin/classes/[id]",
                                                            query: {
                                                                id: classId,
                                                            },
                                                        }}
                                                    >
                                                        <a>
                                                            {
                                                                classes[classId]
                                                                    .grade
                                                            }
                                                            -
                                                            {
                                                                classes[classId]
                                                                    .section
                                                            }
                                                        </a>
                                                    </Link>
                                                </h3>
                                                <div>
                                                    {classes[
                                                        classId
                                                    ].subjects.map(
                                                        (subject: any) => (
                                                            <p key={subject}>
                                                                {subject}
                                                            </p>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <span>none</span>
                                    )}
                                </div>
                                <Space size={1} />
                                <hr />
                                <Space size={1} />
                                <AssignClassSubjects
                                    teacherId={teacher.id}
                                    classSubjects={teacher.classSubjects}
                                />
                            </div>
                        ) : loading ? (
                            <Loader />
                        ) : (
                            <div className="max-h-screen min-h-full ">
                                <p>Teacher not found</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </AdminDashContainer>
        </>
    );
};

export default Teacher;
