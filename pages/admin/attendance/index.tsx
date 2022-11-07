import { Button } from "../../../components/neumorphic";
import Head from "next/head";
import { useState } from "react";
import AdminDashContainer from "../../../components/dash/AdminDash";
import SelectClass from "../../../components/select/SelectClass";
import { useRouter } from "next/router";

const Attendance = () => {
    const router = useRouter();
    const [selectedClass, selectClass] = useState<any>();

    const markAttendance = () => {
        if (selectedClass?.id) {
            router.push("/admin/attendance/" + selectedClass.id);
        }
    };

    return (
        <>
            <Head>
                <title>Attendance</title>
            </Head>
            <div className="container h-screen bg-beige/95 max-h-screen max-w-3xl md:max-w-4xl mg:max-w-5xl overflow-hidden">
                <h2 className="text-4xl font-semibold my-8">Attendance</h2>
                <div className="flex flex-col justify-center items-center">
                    <SelectClass
                        selectClass={selectClass}
                        selectedClass={selectedClass}
                    />
                    <Button onClick={markAttendance}>Mark Attendance</Button>
                </div>
            </div>
        </>
    );
};

Attendance.getLayout = (page: any) => (
    <AdminDashContainer>{page}</AdminDashContainer>
);

export default Attendance;
