import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AdminDashContainer from "../../../components/dash/AdminDash";
import { Button } from "../../../components/ui";
import { useFetch } from "../../../lib/fetch";

const ClassAttendance = () => {
    const router = useRouter();
    const { class: class_ } = router.query;
    const [absent, setAbsent] = useState(new Set());

    const {
        data: { students },
    } = useFetch(
        typeof class_ === "string" ? `/api/get/students-class/${class_}` : ""
    );

    const markAbsent = (id: string) => {
        const newAbsent = new Set(absent);
        if (newAbsent.has(id)) {
            newAbsent.delete(id);
        } else {
            newAbsent.add(id);
        }
        setAbsent(newAbsent);
    };

    const uploadAttendance = () => {
        fetch("/api/post/attendance", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                class: class_,
                absent: Array.from(absent),
            }),
        });
    };

    return (
        <>
            <Head>
                <title>Class Attendance</title>
            </Head>
            <div className="container h-screen bg-beige/95 max-h-screen max-w-3xl md:max-w-4xl mg:max-w-5xl overflow-hidden">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="font-semibold text-3xl my-8">Attendance</h1>
                    <h2 className="text-xl">
                        click on a student to mark him/her absent
                    </h2>
                    <div className="flex flex-col justify-center items-center mx-12">
                        {students
                            ?.sort((a: any, b: any) => {
                                if (absent.has(a.id)) return -1;
                                if (absent.has(b.id)) return 1;
                            })
                            .map((student: any) => (
                                <p
                                    className={`flex flex-row justify-between items-center w-full ${
                                        absent.has(student.id)
                                            ? "bg-red-200"
                                            : ""
                                    }`}
                                    onClick={() => markAbsent(student.id)}
                                    key={student.id}
                                >
                                    {student.profile.name}
                                </p>
                            ))}
                    </div>
                    <Button onClick={uploadAttendance}>
                        Upload Attendance
                    </Button>
                </div>
            </div>
        </>
    );
};

ClassAttendance.getLayout = (page: any) => (
    <AdminDashContainer>{page}</AdminDashContainer>
);

export default ClassAttendance;
